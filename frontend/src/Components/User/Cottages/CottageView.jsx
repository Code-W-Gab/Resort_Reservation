import AccommodationList from "../Home/AccommodationList";
import { useState, useEffect } from "react";
import { GetCottage } from "../../../Service/cottageService";

export default function CottageView() {
  const [cottages, setCottages] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  
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

  // Filter logic
  const filteredCottages = cottages.filter(cottage => {
    // Filter by type
    const matchesType = selectedType === "All Types" || cottage.Type === selectedType
    
    // Filter by search input (search in cottage name and descriptions)
    const matchesSearch = cottage.CottageName.toLowerCase().includes(searchInput.toLowerCase()) ||
                          cottage.Descriptions.toLowerCase().includes(searchInput.toLowerCase())
    
    return matchesType && matchesSearch
  })

  return(
    <main>
      <div className="flex items-center justify-center h-90 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop')`
      }}>
        {/* Blue Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-blue-700 opacity-50"></div>
        
        {/* Content */}
        <div className="text-center relative z-10 px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Our Accommodations</h1>
          <p className="text-lg sm:text-xl mt-2 text-white">Find your perfect retreat</p>
        </div>
      </div>

      {/* Search and filter options here */}
      <div className="px-6 lg:px-10 xl:20 py-6">
        <div className="bg-white p-4 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <input 
            type="text"  
            placeholder="Search cottages..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full" 
          />
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="All Types">All Types</option>
            <option value="Cottage">Cottages</option>
            <option value="Cabin">Cabins</option>
          </select>
        </div>

        <div className="mt-10">
          <p className="text-gray-500 mb-4">
            Showing {filteredCottages.length} of {cottages.length} accommodations
          </p>
          <AccommodationList cottages={filteredCottages} />
        </div>
      </div>
    </main>
  )
}