import { useState } from "react"
import { login } from "../../Service/authService"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function handleLogin() {
    login(email, password)
      .then(res => {
        try {
          if (res.data.role === "admin"){
            navigate('/calendar')
            toast.success("Login successfully")
          } else if (res.data.role === 'user'){
            navigate('/home')
            toast.success("Login successfully")
          } else {
            navigate('/')
            toast.error("Invalid Credentials")
          }
        } catch (error) {
          console.log(error)
          toast.error("Login Failed")
        }
      })
  }

  return(
    <main className="flex items-center justify-center min-h-screen bg-red-200">
      <div>
        <div className="text-center text-white bg-blue-600 w-120 p-7 rounded-tl-xl rounded-tr-xl">
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
            <button onClick={handleLogin} className="py-2.5 bg-blue-600 text-white text-xl rounded-lg w-full">Login</button>
          </div>
        </div>
        
      </div>

    </main>
  )
}