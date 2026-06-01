import { CircleUserRound } from "lucide-react";
import ProfileBtnMenu from "./ProfileBtnMenu";

export default function Header() {
  const nav = [
    { name: 'Home', path: '/home' },
    { name: 'Cottages', path: '/cottages' },
    { name: 'About', path: '/about' },
  ]
  return(
    <header className="bg-white shadow-md flex items-center justify-between px-10 h-18">
      <h1 className="text-2xl font-semibold text-blue-500">Serenity Resort</h1>
      <div className="flex items-center gap-6">
          {nav.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <a key={item.path} href={item.path} className={`text-lg font-semibold hover:text-blue-500 cursor-pointer ${isActive ? 'text-blue-500 underline' : ''}`}>
                {item.name}
              </a>
            )
          })}
        <ProfileBtnMenu/>
      </div>
    </header>
  )
}