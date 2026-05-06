import cabin from '/cabin.jpg'
import { Users } from 'lucide-react'

export default function Book() {
  return(
    <main className='py-10 grid grid-cols-2 gap-4 px-20'>
      <div className='border border-gray-300 rounded-2xl bg-white shadow-lg'>
        <img src={cabin} alt='cabin' className=' h-100 w-full object-cover rounded-tl-xl rounded-tr-xl'/>
        <div className='p-8'>
          <h1 className='text-4xl font-semibold'>Lakeside Beach</h1>
          <p className='text-gray-700 text-lg py-2 my-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic enim in suscipit sed esse beatae temporibus nam unde distinctio vel repudiandae, consectetur omnis sapiente voluptatibus pariatur totam velit quos modi?</p>

          <div className='flex items-center gap-2 text-gray-700'>
            <Users size={20}/>
            <span className='text-lg'>Capacity: Up to 4 guests</span>
          </div>
          <div className='border-b my-5 border-gray-300'></div>
          <h1 className='text-xl font-semibold'>Amenities</h1>
          <div className='mt-5 flex flex-wrap gap-2 items-center'>
            <span className='bg-blue-100 px-2 py-1 rounded-sm text-sm text-blue-700'>
              ajsdjaskdsa
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}