import { X } from 'lucide-react';
import { formatDate } from '../../../Utils/formatDate';

export default function ReservationDetail({ reservation, onClose }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full min-w-100">
      <h2 className="text-xl font-semibold mb-5">Reservation Details</h2>

      <div className="space-y-3 text-sm">
        <div className='flex items-center gap-2'>
          <p className="text-gray-600 font-semibold">Guest Name:</p>
          <p>{reservation.FullName}</p>
        </div>

        <div className='flex items-center gap-2'>
          <p className="text-gray-600 font-semibold">Email:</p>
          <p className="text-blue-600">{reservation.Email}</p>
        </div>

        <div className='flex items-center gap-2'>
          <p className="text-gray-600 font-semibold">Cottage:</p>
          <p>{reservation.CottageName}</p>
        </div>

        <div className='flex items-center gap-2'>
          <p className="text-gray-600 font-semibold">
            {reservation.DayTourDate ? 'Day Tour Date:' : 'Dates:'}
          </p>
          <p>
            {reservation.DayTourDate
              ? formatDate(reservation.DayTourDate)
              : `${formatDate(reservation.CheckInDate)} - ${formatDate(reservation.CheckOutDate)}`}
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <p className="text-gray-600 font-semibold">Type:</p>
          <p>{reservation.DayTourDate ? 'Day Tour' : 'Overnight'}</p>
        </div>

        <div className='flex items-center gap-2'>
          <p className="text-gray-600 font-semibold">Guests:</p>
          <p>{reservation.Capacity}</p>
        </div>

        <div className='flex items-center gap-2'>
          <p className="text-gray-600 font-semibold">Total:</p>
          <p className="text-lg font-bold">₱{reservation.Total}</p>
        </div>

        <div className='flex items-center gap-3'>
          <p className="text-gray-600 font-semibold">Status:</p>
          <div>
            {reservation.Status === 'Confirmed' ? (
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                {reservation.Status}
              </span>
            ) : reservation.Status === 'Pending' ? (
              <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                {reservation.Status}
              </span>
            ) : (
              <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                {reservation.Status}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
      >
        Close
      </button>
    </div>
  );
}