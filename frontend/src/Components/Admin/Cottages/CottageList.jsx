import { useState } from 'react'
import AddCottage from './AddCottage'
import cabin from '/cabin.jpg'
import { SquarePen, Trash2 } from 'lucide-react'
import DeleteModal from '../DeleteModal'
import { truncateString } from '../../../Utils/truncate'
import { DeleteCottage } from '../../../Service/cottageService'
import toast from 'react-hot-toast'
import UpdateCottageModal from './UpdateCottageModel'

const API_URL = import.meta.env.VITE_API_URL 

const getImageUrl = (imagePath) => {
  if (!imagePath) return cabin
  if (imagePath.startsWith('http')) return imagePath
  
  const fullUrl = `${API_URL}${imagePath}`
  return fullUrl
}
export default function CottageList({ cottages, fetchCottage }) {
  const [isDeleteCottageModalOpen, setIsDeleteCottageModalOpen] = useState(false)
  const [isUpdateCottageModalOpen, setIsUpdateCottageModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  function handleDeleteCottage() {
    DeleteCottage(selectedId)
      .then(res => {
        toast.success("Deleted Successfully!")
        setIsDeleteCottageModalOpen(false)
        fetchCottage()
      })
      .catch(err => console.log(err))
  }

  return(
    <main className='p-4 sm:p-6 mb-5 bg-white mx-6 sm:mx-10 xl:mx-20 rounded-lg shadow-md'>
      <div className='pb-8 pt-2'>
        <AddCottage fetchCottage={fetchCottage}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {cottages.map((cottage) => {
          const imageUrl = cottage.Images && cottage.Images.length > 0 
            ? getImageUrl(cottage.Images[0]) 
            : cabin
          
          return(
            <div key={cottage._id} className='border border-gray-300 rounded-lg bg-white shadow-lg hover:shadow-xl'>
              <div>
                <img 
                  src={imageUrl}
                  alt={cottage.CottageName}
                  className='h-70 w-full object-cover rounded-tl-md rounded-tr-md'
                />
              </div>
              <div className='p-4'>
                <h1 className='text-xl font-semibold'>{cottage.CottageName}</h1>
                <p className='text-gray-500 text-md py-2'>{truncateString(cottage.Descriptions, 87)}</p>
                <div className='flex items-center justify-between mt-3'>
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
                  <button onClick={() => {
                    setIsUpdateCottageModalOpen(true)
                    setSelectedId(cottage._id)
                  }} className='flex items-center justify-center gap-2 bg-blue-600 text-white w-full rounded-sm py-2'>
                    <SquarePen size={20}/>
                    <span>Edit</span>
                  </button>
                  <button onClick={() => {
                    setIsDeleteCottageModalOpen(true)
                    setSelectedId(cottage._id)
                  }} className='flex items-center justify-center border border-red-600 text-white w-15 rounded-sm py-2'>
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
            <DeleteModal onClose={() => setIsDeleteCottageModalOpen(false)} onDelete={() => handleDeleteCottage()}/>
          </div>
        </div>
      )}

      {isUpdateCottageModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <UpdateCottageModal id={selectedId} onClose={() => setIsUpdateCottageModalOpen(false)} fetchCottage={fetchCottage}/>
          </div>
        </div>
      )}
    </main>
  )
}