import cabin from '/cabin.jpg'
import { truncateString } from '../../Utils/truncate'
import { Users } from 'lucide-react'

export default function AccommodationList({ cottages }) {
  return(
    <main className='px-20 py-10'>
      <div className='grid grid-cols-3 gap-6'>
        {
          cottages.map((cottage) => {
            return(
              <div key={cottage._id} className='border border-gray-300 rounded-lg bg-white shadow-lg'>
                <div className='relative'>
                  <img src={cabin} alt='cabin' className=' h-64 w-full object-cover rounded-tl-md rounded-tr-md'/>
                  <span className='absolute top-3 right-3 bg-blue-500 text-white px-5 py-1 rounded-2xl'>{cottage.Type}</span>
                </div>
                <div className='p-5'>
                  <h1 className='text-2xl font-semibold'>{cottage.CottageName}</h1>
                  <p className='text-gray-700 text-lg py-2 h-16'>{truncateString(cottage.Descriptions || 'No description available', 87)}</p>

                  <div className='flex items-center gap-2 text-gray-700 mt-5'>
                    <Users size={18}/>
                    <span className='text-md'>Up to {cottage.Capacity} guests</span>
                  </div>

                  <div className='mt-5 flex flex-wrap gap-2 items-center'>
                    {cottage.Amenities.slice(0, 3).map((amenity, index) => {
                      return(
                        <span key={`${cottage._id}-${index}`} className='bg-blue-100 px-2 py-1 rounded-sm text-sm text-blue-700'>
                          {amenity}
                        </span>
                      )
                    })}
                    {cottage.Amenities.length > 3 && (
                      <span className='bg-gray-200 px-2 py-1 rounded-sm text-sm text-gray-700 font-semibold'>
                        +{cottage.Amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className='border-b my-5 border-gray-300'></div>

                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col '>
                      <span className='text-lg text-gray-700'>Starting from</span>
                      <span className='text-2xl text-blue-500'>₱{cottage.DayTourPrice}</span>
                    </div>
                    <button className='bg-blue-500 text-white px-6 py-2 rounded-md'>Book Now</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </main>
  )
}
