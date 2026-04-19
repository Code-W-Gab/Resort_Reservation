import AddCottage from './AddCottage'
import cabin from '/cabin.jpg'
import { SquarePen, Trash2 } from 'lucide-react'

export default function CottageList() {
  return(
    <main className='p-6 mb-5 bg-white mx-20 rounded-lg shadow-md'>
      <div className='pb-8 pt-2'>
        <AddCottage/>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <div className='border border-gray-300 rounded-lg bg-white hover:shadow-xl'>
          <div>
            <img src={cabin} alt='cabin' className='h-50 w-full object-cover rounded-tl-md rounded-tr-md'/>
          </div>
          <div className='p-4'>
            <h1 className='text-xl font-semibold'>A-Frame Cabin</h1>
            <p className='text-gray-500 text-md py-2'>Experience tropical luxury in this beachfront cottage with direct access to pristine white sand beaches.</p>
            <div className='flex items-center justify-between mt-2'>
              <p>Day Tour:</p>
              <p>75</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>Overnight:</p>
              <p>250</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Capacity:</p>
              <p>4 guests</p>
            </div>
            <div className='mt-4 flex items-center gap-3'>
              <button className='flex items-center justify-center gap-2 bg-blue-600 text-white w-full rounded-sm py-2'>
                <SquarePen size={20}/>
                <span>Edit</span>
              </button>
              <button className='flex items-center justify-center border border-red-600 text-white w-15 rounded-sm py-2'>
                <Trash2 size={20} className='text-red-600'/>
              </button>
            </div>
          </div>
        </div>

        <div className='border border-gray-300 rounded-lg bg-white'>
          <div>
            <img src={cabin} alt='cabin' className='h-50 w-full object-cover rounded-tl-md rounded-tr-md'/>
          </div>
          <div className='p-4'>
            <h1 className='text-xl font-semibold'>A-Frame Cabin</h1>
            <p className='text-gray-500 text-md py-2'>Experience tropical luxury in this beachfront cottage with direct access to pristine white sand beaches.</p>
            <div className='flex items-center justify-between mt-2'>
              <p>Day Tour:</p>
              <p>75</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>Overnight:</p>
              <p>250</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Capacity:</p>
              <p>4 guests</p>
            </div>
            <div className='mt-4 flex items-center gap-3'>
              <button className='flex items-center justify-center gap-2 bg-blue-600 text-white w-full rounded-sm py-2'>
                <SquarePen size={20}/>
                <span>Edit</span>
              </button>
              <button className='flex items-center justify-center border border-red-600 text-white w-15 rounded-sm py-2'>
                <Trash2 size={20} className='text-red-600'/>
              </button>
            </div>
            
          </div>
        </div>

        <div className='border border-gray-300 rounded-lg bg-white'>
        <div>
          <img src={cabin} alt='cabin' className='h-50 w-full object-cover rounded-tl-md rounded-tr-md'/>
        </div>
        <div className='p-4'>
          <h1 className='text-xl font-semibold'>A-Frame Cabin</h1>
          <p className='text-gray-500 text-md py-2'>Experience tropical luxury in this beachfront cottage with direct access to pristine white sand beaches.</p>
          <div className='flex items-center justify-between mt-2'>
            <p>Day Tour:</p>
            <p>75</p>
          </div>
          <div className='flex items-center justify-between my-2'>
            <p>Overnight:</p>
            <p>250</p>
          </div>
          <div className='flex items-center justify-between'>
            <p>Capacity:</p>
            <p>4 guests</p>
          </div>
          <div className='mt-4 flex items-center gap-3'>
            <button className='flex items-center justify-center gap-2 bg-blue-600 text-white w-full rounded-sm py-2'>
              <SquarePen size={20}/>
              <span>Edit</span>
            </button>
            <button className='flex items-center justify-center border border-red-600 text-white w-15 rounded-sm py-2'>
              <Trash2 size={20} className='text-red-600'/>
            </button>
          </div>
          
        </div>
      </div>

      </div>
    </main>
  )
}