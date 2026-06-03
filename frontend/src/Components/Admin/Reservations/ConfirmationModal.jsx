export default function ConfirmationModal({ onClose, onConfirm, title, type, bgColor }) {
  return(
    <main className="bg-white p-5 w-80 sm:w-100 rounded-md">
      <h1 className="text-xl font-semibold mb-4">{title}</h1>
      <p className="text-lg">Are you sure you want to {type} this reservation?</p>
      <div className="flex items-center justify-end gap-3 mt-6">
        <button onClick={onClose} className="bg-gray-300 px-4 py-1.5 rounded-md">Cancel</button>
        <button onClick={onConfirm} className={`${bgColor} text-white px-4 py-1.5 rounded-md`}>Confirm</button>
      </div>
    </main>
  )
}

