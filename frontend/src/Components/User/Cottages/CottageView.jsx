import AccommodationList from "../Home/AccommodationList";
import { useState, useEffect } from "react";
import { GetCottage } from "../../../Service/cottageService";

export default function CottageView() {
  const [cottages, setCottages] = useState([])
  
  const fetchCottage = () => {
    GetCottage()
      .then((res) => {
        setCottages(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchCottage()
  }, [])

  return(
    <main>
      <div className="flex items-center justify-center h-90 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop')`
      }}>
        {/* Blue Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-blue-700 opacity-50"></div>
        
        {/* Content */}
        <div className="text-center relative z-10">
          <h1 className="text-5xl font-bold text-white">Our Accommodations</h1>
          <p className="text-xl mt-2 text-white">Find your perfect retreat</p>
        </div>
      </div>

      {/* Search and filter options here */}
      <div className="px-20 py-6">
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-4">
          <input 
            type="text"  
            placeholder="Search cottages..."
            className="border border-gray-300 rounded-md px-3 py-2 w-full" 
          />
          <select name="cars" id="cars" className="border border-gray-300 rounded-md px-3 py-2 w-full">
            <option value="All Types" selected>All Types</option>
            <option value="Cottages">Cottages</option>
            <option value="Cabin">Cabin</option>
          </select>
        </div>

        <div className="mt-10">
          <p className="text-gray-500 mb-4">Showing {cottages.length} of {cottages.length} accommodations</p>
          <AccommodationList cottages={cottages} />
        </div>
      </div>
    </main>
  )
}