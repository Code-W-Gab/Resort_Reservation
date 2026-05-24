export default function cancelModal({ onClose, onConfirm }) {
  return(
    <main className="bg-white p-5 w-100 rounded-md">
      <h1 className="text-xl font-semibold mb-4">Cancel Reservation</h1>
      <p className="text-lg">Are you sure you want to cancel this reservation?</p>
      <div className="flex items-center justify-end gap-3 mt-6">
        <button onClick={onClose} className="bg-gray-300 px-4 py-1.5 rounded-md">Cancel</button>
        <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-1.5 rounded-md">Confirm</button>
      </div>
    </main>
  )
}