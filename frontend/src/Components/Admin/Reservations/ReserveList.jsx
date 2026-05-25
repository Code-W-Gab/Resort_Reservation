import { CircleCheckBig, CircleX, Trash2 } from 'lucide-react'
import { formatDate } from '../../../Utils/formatDate';
import { useState } from 'react';
import { cancelReservation, confirmReservation, deleteReservation } from '../../../Service/reserveService';
import toast from 'react-hot-toast';
import ConfirmationModal from './ConfirmationModal';

export default function ReserveList({ reserve, fetchReserve }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  function handleConfirmStatus() {
    confirmReservation(selectedId)
      .then(res => {
        setIsConfirmModalOpen(false)
        fetchReserve()
        toast.success("Reservation Updated")
      }).catch(err => console.log(err))
  }

  function handleCancelStatus() {
    cancelReservation(selectedId)
      .then(res => {
        setIsCancelModalOpen(false)
        fetchReserve()
        toast.success("Reservation Updated")
      }).catch(err => console.log(err))
  }

  function handleDeleteReservation() {
    deleteReservation(selectedId)
      .then(res => {
        setIsDeleteModalOpen(false)
        fetchReserve()
        toast.success("Reservation Updated")
      }).catch(err => console.log(err))
  }

  return(
    <main className="px-20">
      <h1 className="text-2xl font-semibold">Manage Reservations</h1>
      <div className="grid grid-cols-[1.5fr_repeat(3,1fr)_repeat(4,120px)] items-center mt-6 bg-blue-500 text-white font-semibold px-3 py-3 rounded-tl-md rounded-tr-md">
        <p>GUEST</p>
        <p>COTTAGE</p>
        <p>DATES</p>
        <p>TYPES</p>
        <p>GUESTS</p>
        <p>TOTAL</p>
        <p>STATUS</p>
        <p>ACTIONS</p>
      </div>
      
      {reserve.length === 0
      ? <div className='py-5 px-2 text-xl'>No reservation</div>
      : reserve.map((r) => {
        return(
          <div key={r._id} className="grid grid-cols-[1.5fr_repeat(3,1fr)_repeat(4,120px)] items-center p-3 border border-t-0 border-gray-300">
            <div className="pr-5 break-all">
              <p>{r.FullName}</p>
              <p className='text-gray-500'>{r.Email}</p>
            </div>
            <div className="pr-5 break-all">
              <p>{r.CottageName}</p>
            </div>
            <div className="pr-5 break-all">
              {r.DayTourDate === null 
                ? <p>{`${formatDate(r.CheckInDate)} - ${formatDate(r.CheckOutDate)}`}</p>
                : <p>{formatDate(r.DayTourDate)}</p>
              }
            </div>
            <div className="pr-5 break-all">
              {r.DayTourDate === null 
                ? <p>Overnight</p>
                : <p>Day Tour</p>
              }
            </div>
            
            <div className="pr-5 break-all">
              <p>{r.Capacity}</p>
            </div>
            <div className="pr-5 break-all">
              <p>₱{r.Total}</p>
            </div>
            <div className="pr-5 break-all">
              {r.Status === "Confirmed"
                ? <p className="bg-green-200 text-green-800 px-3 py-1.5 text-xs text-center rounded-2xl w-20">{r.Status}</p>
                : r.Status === "Pending" 
                ? <p className="bg-orange-200 text-orange-800 px-3 py-1.5 text-xs text-center rounded-2xl w-20">{r.Status}</p>
                : <p className="bg-red-200 text-red-800 px-3 py-1.5 text-xs text-center rounded-2xl w-20">{r.Status}</p>
              }
            </div>
            <div>
              {r.Status === "Confirmed"
                ? <div className="flex items-center gap-4 pr-5 break-all">
                    <button onClick={() => {
                      setIsCancelModalOpen(true)
                      setSelectedId(r._id)
                    }}>
                      <CircleX size={25} className='text-red-600'/>
                    </button>
                    <button onClick={() => {
                      setIsDeleteModalOpen(true)
                      setSelectedId(r._id)
                    }}>
                      <Trash2 size={25} className='text-gray-500'/>
                    </button>
                  </div>
                : r.Status === "Pending"
                ? <div className="flex items-center gap-4 pr-5 break-all">
                    <button onClick={() => {
                      setIsConfirmModalOpen(true)
                      setSelectedId(r._id)
                    }}>
                      <CircleCheckBig size={25} className='text-green-600'/>
                    </button>
                    <button onClick={() => {
                      setIsCancelModalOpen(true)
                      setSelectedId(r._id)
                    }}>
                      <CircleX size={25} className='text-red-600'/>
                    </button>
                    <button onClick={() => {
                      setIsDeleteModalOpen(true)
                      setSelectedId(r._id)
                    }}>
                      <Trash2 size={25} className='text-gray-500'/>
                    </button>
                  </div>
                : <div>
                    <button onClick={() => {
                      setIsDeleteModalOpen(true)
                      setSelectedId(r._id)
                    }}>
                      <Trash2 size={25} className='text-gray-500'/>
                    </button>
                  </div>
              }
            </div>
          </div>
        )
      })}

      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <ConfirmationModal 
              onClose={() => setIsConfirmModalOpen(false)} 
              onConfirm={() => handleConfirmStatus()}
              title={"Confirm Reservation"}
              type={"confirm"}
              bgColor={"bg-blue-500"}
            />
          </div>
        </div>
      )}

      {isCancelModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <ConfirmationModal 
              onClose={() => setIsCancelModalOpen(false)} 
              onConfirm={() => handleCancelStatus()}
              title={"Cancel Reservation"}
              type={"cancel"}
              bgColor={"bg-red-500"}
            />
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <ConfirmationModal 
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={() => handleDeleteReservation()}
              title={"Delete Reservation"}
              type={"delete"}
              bgColor={"bg-red-500"}
            />
          </div>
        </div>
      )}
    </main>
  )
}