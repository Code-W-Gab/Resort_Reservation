import { Link } from 'react-router-dom'
import { CircleUserRound, Menu, X } from "lucide-react";
import ProfileBtnMenu from '../../Layout/ProfileBtnMenu'
import { useAuth } from '../../Context/AuthContext'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()
  const nav = [
    { name: 'Calendar', path: '/calendar' },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Cottages', path: '/cottage' },
  ]
  return(
    <main className=" flex flex-col gap-2 py-4 px-6 sm:px-10 xl:px-20">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-lg sm:text-xl font-bold">Admin Dashboard</h1>
        <div className="hidden lg:flex items-center gap-4">
          <h1 className=' font-semiboldtext-lg text-gray-700'>Welcome, {user?.name || 'Admin'}!</h1>
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
      </header>
      <div className="hidden lg:flex items-center gap-4">
        {nav.map((item) => {
          const isActive = location.pathname === item.path
          return(   
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg text-sm 
              ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`
            }
          >
            {item.name}
          </Link>
          )
        })}
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
    </main>
  )
}