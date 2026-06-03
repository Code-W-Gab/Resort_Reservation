import { CircleUserRound, Menu, X } from "lucide-react";
import ProfileBtnMenu from "./ProfileBtnMenu";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const nav = [
    { name: 'Home', path: '/home' },
    { name: 'Cottages', path: '/cottages' },
    { name: 'About', path: '/about' },
  ]
  return(
    <header className="bg-white shadow-md flex items-center justify-between px-10 h-18">
      <h1 className="text-xl sm:text-2xl font-semibold text-blue-500">Serenity Resort</h1>
      <div className="hidden lg:flex items-center gap-6">
          {nav.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path} className={`text-lg font-semibold hover:text-blue-500 cursor-pointer ${isActive ? 'text-blue-500 underline' : ''}`}>
                {item.name}
              </Link>
            )
          })}
        <ProfileBtnMenu/>
      </div>
      <div className="flex items-center gap-4 lg:hidden">
        {isMenuOpen ? <ProfileBtnMenu/> : ""}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none tracking-normal">
          {isMenuOpen 
          ? <div className="bg-red-100 text-red-600 p-1.5 rounded-md">
              <X size={24} />
            </div>
          : <div className="bg-gray-100 text-gray-700 p-1.5 rounded-md"><Menu size={24} /> </div>
          }
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-19 right-10 bg-white shadow-lg rounded-md py-4 w-70 z-49">
          {nav.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path} className={`block px-4 py-2 text-md hover:bg-gray-100 ${isActive ? 'text-blue-500 font-semibold bg-blue-100 mx-2' : 'text-gray-700 mx-2'}`}>
                {item.name}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}