import { useState } from 'react'
import AddCottage from './AddCottage'
import cabin from '/cabin.jpg'
import { SquarePen, Trash2 } from 'lucide-react'
import DeleteModal from '../DeleteModal'

export default function CottageList({ cottages, fetchCottage }) {
  const [isDeleteCottageModalOpen, setIsDeleteCottageModalOpen] = useState(false)

  return(
    <main className='p-6 mb-5 bg-white mx-20 rounded-lg shadow-md'>
      <div className='pb-8 pt-2'>
        <AddCottage fetchCottage={fetchCottage}/>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        {cottages.map((cottage) => {
          return(
            <div key={cottage._id} className='border border-gray-300 rounded-lg bg-white hover:shadow-xl'>
              <div>
                <img src={cabin} alt='cabin' className='h-50 w-full object-cover rounded-tl-md rounded-tr-md'/>
              </div>
              <div className='p-4'>
                <h1 className='text-xl font-semibold'>{cottage.CottageName}</h1>
                <p className='text-gray-500 text-md py-2'>{cottage.Descriptions}</p>
                <div className='flex items-center justify-between mt-2'>
                  <p>Day Tour:</p>
                  <p>₱{cottage.DayTourPrice}</p>
                </div>
                <div className='flex items-center justify-between my-2'>
                  <p>Overnight:</p>
                  <p>₱{cottage.OvernightPrice}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>Capacity:</p>
                  <p>{cottage.Capacity} guests</p>
                </div>
                <div className='mt-4 flex items-center gap-3'>
                  <button className='flex items-center justify-center gap-2 bg-blue-600 text-white w-full rounded-sm py-2'>
                    <SquarePen size={20}/>
                    <span>Edit</span>
                  </button>
                  <button onClick={() => setIsDeleteCottageModalOpen(true)} className='flex items-center justify-center border border-red-600 text-white w-15 rounded-sm py-2'>
                    <Trash2 size={20} className='text-red-600'/>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {isDeleteCottageModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <DeleteModal onClose={() => setIsDeleteCottageModalOpen(false)}/>
          </div>
        </div>
      )}
    </main>
  )
}