import { Check } from "lucide-react"
import { Link } from "react-router-dom"
export default function BookingConfirm() {
  return(
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-xl border border-gray-200 p-10 w-100">
        <div className="flex flex-col items-center justify-between gap-4 text-center">
          <div className="p-4 bg-green-100 rounded-full mb-2">
            <Check size={35} className="text-green-700"/>
          </div>
          <h1 className="text-2xl font-semibold">Booking Confirmed!</h1>
          <p className="text-sm text-gray-600">Thank you, Gab! Your reservation for Tropical Paradise Cottage has been received.</p>
        </div>
        <div className="bg-green-50 mt-6 p-4 text-xs flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="font-bold">Check-in: </p>
            <span className="text-gray-700">May 11, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Guests:</p>
            <span className="text-gray-700">2</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Type:</p>
            <span className="text-gray-700">Day Tour</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Total:</p>
            <span className="text-gray-700">$100</span>
          </div>
        </div>
        <Link to={'/home'}>
          <button className="bg-blue-600 text-white w-full mt-8 py-3 rounded-md">Back to Home </button>
        </Link>
      </div>
    </main>
  )
}