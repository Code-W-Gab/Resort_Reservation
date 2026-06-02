import {MapPin, Users, Calendar} from 'lucide-react'

export default function Info() {
  const content = [
    {"title": "Prime Locations", "desc": "Stunning beachfront, lakeside, and forest settings", "logo": <MapPin className='size-6 lg:size-8'/>},
    {"title": "Flexible Booking", "desc": "Choose from day tours or overnight stays", "logo": <Calendar className='size-6 lg:size-8'/>}, 
    {"title": "Perfect for Groups", "desc": "Accommodations for couples to large families", "logo": <Users className='size-6 lg:size-8'/>},
  ]
  return(
    <main className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 py-20 px-20 items-center justify-center'>
      {content.map((c) => {
        return(
          <div key={c.title} className='flex flex-col gap-3 items-center'>
            <div className='bg-blue-100 p-4 rounded-full text-blue-500'>
              {c.logo}
            </div>
            <h1 className='font-semibold text-xl lg:text-2xl'>{c.title}</h1>
            <p className='text-md lg:text-xl w-60 lg:w-80 text-center text-gray-700'>{c.desc}</p>
          </div>
        )
      })}
    </main>
  )
}