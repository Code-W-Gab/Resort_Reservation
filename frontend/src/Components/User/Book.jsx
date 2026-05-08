import { useState } from 'react'
import cabin from '/cabin.jpg'
import { Users, Minus, Plus } from 'lucide-react'

export default function Book() {
  const [cottageType, setCottageType] = useState("")
  const [capacity, setCapacity] = useState(0)

  return(
    <main className='py-10 grid grid-cols-2 gap-4 px-20 items-start'>
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
              kitchen
            </span>
          </div>
        </div>
      </div>

      <div className='border border-gray-300 rounded-2xl bg-white shadow-lg p-6'>
        <h1 className='text-2xl font-semibold'>Book Your Stay</h1>
        <div className='mt-7'>
          <label className='font-semibold'>Booking Type</label>
          <div className='grid grid-cols-2 gap-4 mt-3'>
            <button 
              onClick={() => setCottageType("dayTour")}
              className={`border-3 p-4 rounded-xl ${
                cottageType === "dayTour"
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-300'
              }`}
            >
              <span className='text-md font-semibold text-gray-500'>Day Tour</span>
              <p className='text-blue-500 text-3xl'>₱100</p>
            </button>
            <button 
              onClick={() => setCottageType("overnight")}
              className={`border-3 p-4 rounded-xl ${
                cottageType === "overnight"
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-300'
              }`}
            >
              <span className='text-md font-semibold text-gray-500'>Overnight</span>
              <p className='text-blue-500 text-3xl'>₱300/night</p>
            </button>
          </div>
        </div>

        <div className='mt-8'>
          <label className='font-semibold'>Number of Guests</label>
          <div className='flex items-center gap-8 mt-4'>
            <button onClick={() => setCapacity(c => c > 0 ? c - 1 : 0)} className='border border-gray-400 rounded-full p-2'><Minus size={18}/></button>
            <span className='text-xl'>{capacity}</span>
            <button onClick={() => setCapacity(c => c < 6 ? c + 1 : 6)} className='border border-gray-400 rounded-full p-2'><Plus size={18}/></button>
            <p className='text-gray-500'>Max: 6</p>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-md text-gray-700 font-semibold'>Full Name *</label>
            <input type="text" placeholder='John Smith' className='border py-2.5 px-4 rounded-xl'/>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-md text-gray-700 font-semibold'>Email *</label>
            <input type="email" placeholder='john@example.com' className='border py-2.5 px-4 rounded-xl'/>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-md text-gray-700 font-semibold'>Phone</label>
            <input type="text" placeholder='+1234567890' className='border py-2.5 px-4 rounded-xl'/>
          </div>
        </div>

        <div className='border-b border-gray-300 my-10'></div>

        <div>
          <div className='flex items-center justify-between '>
            <p className='text-gray-500 text-xl'>Total</p>
            <h3 className='text-blue-500 text-4xl'>₱0</h3>
          </div>
          <button className='bg-blue-500 text-white w-full py-3 rounded-lg text-lg mt-6'>Confirm Booking</button>
        </div>
        
      </div>
    </main>
  )
}