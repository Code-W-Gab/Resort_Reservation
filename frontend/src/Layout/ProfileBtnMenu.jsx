import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { logout } from '../Service/authService'

export default function ProfileBtnMenu() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
      .then(() => {
        setUser(null)
        navigate('/auth/login')
      })
      .catch(err => console.log(err))
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center focus:outline-none border-2 border-gray-300 rounded-full p-1 bg-gray-100 hover:bg-gray-200 transition-colors">
        <User size={25} className="text-gray-500 hover:text-gray-700"/>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="z-50 w-52 origin-top-right bg-gray-600 rounded-md shadow-lg mt-2 focus:outline-none"
      >
        <MenuItem className="p-3 text-white border-b border-gray-400">
          <h1 className='text-md text-center font-semibold'>
            {user?.name || 'User'}
          </h1>
        </MenuItem>

        <MenuItem>
          {({ focus }) => (
            <button 
              className={`w-full flex items-center gap-2 px-4 py-3 ${
                focus ? 'bg-gray-500 text-white' : 'text-white'
              } transition-colors`}
            >
              <User size={20}/>
              <span className='font-semibold'>Profile</span>
            </button>
          )}
        </MenuItem>

        <div className='p-1.5'>
          <MenuItem>
            {({ focus }) => (
              <button 
                onClick={handleLogout}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-sm ${
                  focus ? 'bg-red-600' : 'bg-red-500'
                } text-white transition-colors`}
              >
                <LogOut size={20}/>
                <span>Logout</span>
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}