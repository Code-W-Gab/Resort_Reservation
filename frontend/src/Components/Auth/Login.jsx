import { useState } from "react"
import { login } from "../../Service/authService"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../../Context/AuthContext"

export default function Login() {
  const { setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function handleLogin() {
    login(email, password)
      .then(res => {
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
        console.log(error)
        toast.error("Login Failed")
      })
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
        <div className="p-7 bg-white grid grid-rows-3 gap-5 rounded-bl-xl rounded-br-xl">
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
            <button onClick={handleLogin} className="py-2.5 bg-blue-600 text-white text-xl rounded-lg w-full hover:bg-blue-700 transition">Login</button>
          </div>
        </div>
      </div>
    </main>
  )
}