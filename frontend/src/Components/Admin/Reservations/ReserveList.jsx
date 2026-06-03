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
    <main className="px-6 sm:px-10 xl:px-20 pb-10">
      <h1 className="text-2xl font-semibold mb-6">Manage Reservations</h1>
        
      {/* Scrollable Container */}
      <div className="overflow-x-auto rounded-tl-md rounded-tr-md border border-gray-300">
        
        {/* Table Structure */}
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="bg-blue-500 text-white font-semibold">
              <th className="border border-gray-300 px-3 py-3 text-left w-64">GUEST</th>
              <th className="border border-gray-300 px-3 py-3 text-left w-40">COTTAGE</th>
              <th className="border border-gray-300 px-3 py-3 text-left w-40">DATES</th>
              <th className="border border-gray-300 px-3 py-3 text-left w-32">TYPES</th>
              <th className="border border-gray-300 px-3 py-3 text-center w-24">GUESTS</th>
              <th className="border border-gray-300 px-3 py-3 text-center w-24">TOTAL</th>
              <th className="border border-gray-300 px-3 py-3 text-center w-24">STATUS</th>
              <th className="border border-gray-300 px-3 py-3 text-center w-28">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reserve.length === 0
            ? <tr>
                <td colSpan="8" className="py-5 px-2 text-xl text-center border border-gray-300">No reservation</td>
              </tr>
            : reserve.map((r) => {
              return(
                <tr key={r._id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-3 w-64">
                    <p className="font-medium">{r.FullName}</p>
                    <p className='text-gray-500 text-sm'>{r.Email}</p>
                  </td>
                  <td className="border border-gray-300 px-3 py-3 w-40">
                    <p>{r.CottageName}</p>
                  </td>
                  <td className="border border-gray-300 px-3 py-3 w-40">
                    {r.DayTourDate === null 
                      ? <p>{`${formatDate(r.CheckInDate)} - ${formatDate(r.CheckOutDate)}`}</p>
                      : <p>{formatDate(r.DayTourDate)}</p>
                    }
                  </td>
                  <td className="border border-gray-300 px-3 py-3 w-32">
                    {r.DayTourDate === null 
                      ? <p>Overnight</p>
                      : <p>Day Tour</p>
                    }
                  </td>
                  <td className="border border-gray-300 px-3 py-3 w-24 text-center">
                    <p>{r.Capacity}</p>
                  </td>
                  <td className="border border-gray-300 px-3 py-3 w-24 text-center">
                    <p>₱{r.Total}</p>
                  </td>
                  <td className="border border-gray-300 px-3 py-3 w-24 text-center">
                    {r.Status === "Confirmed"
                      ? <p className="bg-green-200 text-green-800 px-3 py-1.5 text-xs text-center rounded-2xl inline-block">{r.Status}</p>
                      : r.Status === "Pending" 
                      ? <p className="bg-orange-200 text-orange-800 px-3 py-1.5 text-xs text-center rounded-2xl inline-block">{r.Status}</p>
                      : <p className="bg-red-200 text-red-800 px-3 py-1.5 text-xs text-center rounded-2xl inline-block">{r.Status}</p>
                    }
                  </td>
                  <td className="border border-gray-300 px-3 py-3 w-28">
                    <div className="flex items-center justify-center gap-3">
                      {r.Status === "Confirmed"
                        ? <>
                            <button onClick={() => {
                              setIsCancelModalOpen(true)
                              setSelectedId(r._id)
                            }}>
                              <CircleX size={22} className='text-red-600 hover:text-red-800'/>
                            </button>
                            <button onClick={() => {
                              setIsDeleteModalOpen(true)
                              setSelectedId(r._id)
                            }}>
                              <Trash2 size={22} className='text-gray-500 hover:text-gray-700'/>
                            </button>
                          </>
                        : r.Status === "Pending"
                        ? <>
                            <button onClick={() => {
                              setIsConfirmModalOpen(true)
                              setSelectedId(r._id)
                            }}>
                              <CircleCheckBig size={22} className='text-green-600 hover:text-green-800'/>
                            </button>
                            <button onClick={() => {
                              setIsCancelModalOpen(true)
                              setSelectedId(r._id)
                            }}>
                              <CircleX size={22} className='text-red-600 hover:text-red-800'/>
                            </button>
                            <button onClick={() => {
                              setIsDeleteModalOpen(true)
                              setSelectedId(r._id)
                            }}>
                              <Trash2 size={22} className='text-gray-500 hover:text-gray-700'/>
                            </button>
                          </>
                        : <button onClick={() => {
                            setIsDeleteModalOpen(true)
                            setSelectedId(r._id)
                          }}>
                            <Trash2 size={22} className='text-gray-500 hover:text-gray-700'/>
                          </button>
                      }
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modals */}
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