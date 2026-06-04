import { useState } from "react"
import { login } from "../../Service/authService"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../../Context/AuthContext"

export default function Login() {
  const { setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleLogin() {
    setLoading(true)
    login(email, password)
      .then(res => {
        setLoading(false)
        setUser(res.data.user)
        if (res.data.user.role === "admin"){
          navigate('/calendar')
          toast.success("Login successfully")
        } else if (res.data.user.role === 'user'){
          navigate('/home')
          toast.success("Login successfully")
        } else {
          navigate('/')
          toast.error("Invalid Credentials")
        }
      })
      .catch (error => {
        setLoading(false)
        console.log(error)
        toast.error("Login Failed")
      })
  }

  function handleGoogleLogin() {
    // Redirect to the backend route that initiates Google OAuth
    window.location.href = "http://localhost:8080/auth/google"
  }

  return(
    <main 
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop')`
      }}
    >
      {/* Blue Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-blue-500 opacity-40"></div>
      
      {/* Login Form - with relative z-10 to appear above overlay */}
      <div className="relative z-10">
        <div className="text-center text-white bg-blue-600 w-110 p-7 rounded-tl-xl rounded-tr-xl">
          <h1 className="text-4xl font-semibold mb-2">Serenity Resort</h1>
          <p>Welcome back! Please login to continue</p>
        </div>
        <div className="p-7 bg-white flex flex-col gap-5 rounded-bl-xl rounded-br-xl">
          <div className="flex flex-col gap-1.5">
            <label>Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-gray-500 px-4 py-2.5 rounded-lg text-md"
              type="email" 
              placeholder="example@gmail.com" 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label>Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-gray-500 px-4 py-2.5 rounded-lg text-md"
              type="password" 
              placeholder="Enter your password" 
            />
          </div>
          <div className="mt-3">
            <button onClick={handleLogin} className="py-2.5 bg-blue-600 text-white text-xl rounded-lg w-full hover:bg-blue-700 transition mb-3">{loading ? "Logging in..." : "Login"}</button>
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 border-b border-gray-300"></div>
              <div className="text-gray-700 whitespace-nowrap">Or continue with</div>
              <div className="flex-1 border-b border-gray-300"></div>
            </div>
            <button onClick={handleGoogleLogin} className=" flex items-center justify-center border border-gray-300 py-2.5 bg-white text-lg font-medium rounded-lg w-full mb-3">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="inline-block size-6 mr-2"/>
              Login with Google
            </button>
            {/* Register */}
            <p className="text-center text-gray-700">Don't have an account? <Link to={'/auth/register'} className="font-semibold text-blue-500 cursor-pointer hover:underline">Register.</Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}