import { useState } from "react"
import AddCottageModal from "./AddCottageModal"

export default function AddCottage({ fetchCottage }) {
  const [isAddCottageOpenModal, setIsAddCottageOpenModal] = useState(false)
  
  return(
    <main>
      <main className="flex items-center gap-4 justify-between">
        <h1 className="text-lg sm:text-2xl font-semibold">Manage Cottages</h1>
        <button className="bg-blue-500 text-white px-3 sm:px-5 py-2.5 rounded-md text-xs sm:text-md" onClick={() => setIsAddCottageOpenModal(true)}>Add New Cottage</button>
      </main>

      {isAddCottageOpenModal && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <AddCottageModal onClose={() => setIsAddCottageOpenModal(false)} fetchCottage={fetchCottage}/>
          </div>
        </div>
      )}
    </main>
  )
}