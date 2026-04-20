import { X } from 'lucide-react'

export default function AddCottageModal() {
  return(
    <main className='bg-white w-200 rounded-xl'>
      <header className='h-20 flex items-center justify-between text-white bg-blue-500 px-6 rounded-tr-lg rounded-tl-lg w-full'>
        <h1 className='text-xl font-semibold'>Add New Cottage</h1>
        <X />
      </header>
      <div className='px-6 py-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Cottage Name:</label>
            <input className='border border-gray-400 rounded-md p-2' type="text" placeholder='e.g., A-Frame Cabin'/>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Type:</label>
            <div className='grid grid-cols-2 gap-3 items-center'>
              <button className='border-3 border-blue-500 bg-blue-100 w-full py-2 rounded-md text-blue-500 font-semibold'>Cottage</button>
              <button className='border-3 border-gray-500 w-full py-2 rounded-md text-gray-500 font-semibold'>Cabin</button>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-6'>
          <label className='font-semibold'>Descriptions:</label>
          <textarea 
            className='border border-gray-400 rounded-md p-2 h-25' 
            placeholder="Describe the cottage, its features, and what make it special"
          ></textarea>
        </div>

        <div className='grid grid-cols-3 gap-3 mt-6'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Capacity (Guests):</label>
            <input 
              className='border border-gray-400 rounded-md p-2' 
              type="number"/>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Day Tour Price (₱):</label>
            <input 
              className='border border-gray-400 rounded-md p-2' 
              type="number"/>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Overnight Price (₱):</label>
            <input 
              className='border border-gray-400 rounded-md p-2' 
              type="number"/>
          </div>
        </div>

        <div>
          <div className='flex flex-col gap-2 mt-6'>
            <label className='font-semibold'>Amenities:</label>
            <input 
              className='border border-gray-400 rounded-md p-2' 
              type="text" 
              placeholder='e.g., Wifi, Pool Access, Park'/>
            <p className='text-xs text-gray-500 px-1'>Add amenities one at a time (e.g., Wifi, Kitchen, Pool Access)</p>
          </div>
        </div>
      </div>
    </main>
  )
}