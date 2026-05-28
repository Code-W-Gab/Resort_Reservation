import { logout } from "../Service/authService"
import { useNavigate } from "react-router-dom"

export default function Header({setUser}) {
  const navigate = useNavigate();

  function handleLogout() {
    logout()
      .then(() => {
        setUser(null)
        navigate('/')
      })
  }
  return(
    <header className="bg-white shadow-md flex items-center justify-between px-10 h-18">
      <h1 className="text-2xl font-semibold text-blue-500">Serenity Resort</h1>
      <div className="flex items-center gap-6">
        <p className="text-lg font-semibold hover:text-blue-500 cursor-pointer">Home</p>
        <p className="text-lg font-semibold hover:text-blue-500 cursor-pointer">Cottages</p>
        <p className="text-lg font-semibold hover:text-blue-500 cursor-pointer">About</p>
        <button onClick={handleLogout} className="bg-blue-600 text-white px-2 py-2">Logout</button>
      </div>
    </header>
  )
}