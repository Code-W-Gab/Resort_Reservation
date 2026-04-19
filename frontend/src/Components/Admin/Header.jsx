import { Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return(
    <main className="flex items-center justify-between py-4 px-20 border-b">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex gap-4">
        <Link to={'/calendar'} className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg text-white text-md">
          <Calendar />
          <span>Calendar</span>
        </Link>
        <Link to={'/reservation'} className="bg-blue-500 px-4 py-2 rounded-lg text-white text-md">Reservation</Link>
        <Link to={'/cottage'} className="bg-blue-500 px-4 py-2 rounded-lg text-white text-md">Cottages</Link>
      </div>
    </main>
  )
}