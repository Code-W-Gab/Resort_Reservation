import { Link } from 'react-router-dom'
import ProfileBtnMenu from '../../Layout/ProfileBtnMenu'
import { useAuth } from '../../Context/AuthContext'
export default function Header() {
  const { user } = useAuth()
  const nav = [
    { name: 'Calendar', path: '/calendar' },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Cottages', path: '/cottage' },
  ]
  return(
    <main className=" flex flex-col gap-2 py-4 px-20">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <h1 className='font-semibold text-lg text-gray-700'>Welcome, {user?.name || 'Admin'}!</h1>
          <ProfileBtnMenu/>
        </div>
      </header>
      <div className="flex items-center gap-4">
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
    </main>
  )
}