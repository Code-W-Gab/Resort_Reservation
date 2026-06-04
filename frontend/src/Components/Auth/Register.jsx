import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "../../Service/authService"
import toast from "react-hot-toast"

export default function Register() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleRegister() {
    if (!fullName || !email || !password) {
      toast.error("Please fill all fields")
      return
    }
  
    setLoading(true)
    register(fullName, email, password)
      .then(res => {
        const message = res.data?.message
        
        // Check if this is a re-registration (unverified user trying to register again)
        if (message?.includes('New OTP')) {
          toast.success("New OTP sent! Check your email.")
        } else {
          // New user registration
          toast.success("Registration successful! Check your email for OTP code")
        }
        
        // Navigate to OTP verification page (works for both cases)
        navigate('/auth/verify-otp', { state: { email } })
      })
      .catch(err => {
        console.log(err)
        const errorMessage = err.response?.data?.message
        
        // If user exists and is verified, don't navigate to verify page
        if (errorMessage?.includes('User already exist')) {
          toast.error("This email is already registered and verified. Please login instead.")
        } else {
          toast.error(errorMessage || "Registration Failed")
        }
      })
      .finally(() => setLoading(false))
  }

  return(
    <main 
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop')`
      }}
    >
      <div className="absolute inset-0 bg-blue-500 opacity-40"></div>
      
      <div className="relative z-10">
        <div className="text-center text-white bg-blue-600 w-80 sm:w-100 p-4 sm:p-5 rounded-tl-xl rounded-tr-xl">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Serenity Resort</h1>
          <p className="text-sm sm:text-md">Create an account! Please register to continue</p>
        </div>
        <div className="p-5 sm:p-7 bg-white flex flex-col gap-5 rounded-bl-xl rounded-br-xl">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm sm:text-md font-medium text-gray-700">Full Name</label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              className="border border-gray-500 px-4 py-2.5 rounded-lg text-sm sm:text-md"
              type="text" 
              placeholder="Juan Dela Cruz" 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm sm:text-md font-medium text-gray-700">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-gray-500 px-4 py-2.5 rounded-lg text-sm sm:text-md"
              type="email" 
              placeholder="example@gmail.com" 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm sm:text-md font-medium text-gray-700">Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-gray-500 px-4 py-2.5 rounded-lg text-sm sm:text-md"
              type="password" 
              placeholder="Enter your password" 
            />
          </div>
          <div className="mt-1">
            <button 
              onClick={handleRegister} 
              disabled={loading}
              className="py-2 bg-blue-600 text-white text-md sm:text-lg rounded-lg w-full hover:bg-blue-700 transition mb-3 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="text-center text-gray-700">Already have an account? <Link to="/auth/login" className="font-semibold text-blue-500 cursor-pointer hover:underline">Sign in.</Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}