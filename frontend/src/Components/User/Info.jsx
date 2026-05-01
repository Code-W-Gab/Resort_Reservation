import {MapPin, Users, Calendar} from 'lucide-react'

export default function Info() {
  const content = [
    {"title": "Prime Locations", "desc": "Stunning beachfront, lakeside, and forest settings", "logo": <MapPin size={30}/>},
    {"title": "Flexible Booking", "desc": "Choose from day tours or overnight stays", "logo": <Calendar size={30}/>}, 
    {"title": "Perfect for Groups", "desc": "Accommodations for couples to large families", "logo": <Users size={30}/>},
  ]
  return(
    <main className='bg-white grid grid-cols-3 py-20 items-center justify-center'>
      {content.map((c) => {
        return(
          <div key={c.title} className='flex flex-col gap-3 items-center'>
            <div className='bg-blue-100 p-4 rounded-full text-blue-500'>
              {c.logo}
            </div>
            <h1 className='font-semibold text-2xl'>{c.title}</h1>
            <p className='text-xl w-80 text-center text-gray-700'>{c.desc}</p>
          </div>
        )
      })}
    </main>
  )
}