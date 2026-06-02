export default function Explore({ onExploreClick }) {
  return(
    <main 
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop')`
      }}
    >
      {/* Blue Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-blue-700 opacity-50"></div>
      
      {/* Content */}
      <div className="text-center px-6 relative z-10">
        <h1 className="text-5xl lg:text-6xl font-semibold text-white">Your Perfect Escape Awaits</h1>
        <p className="text-md lg:text-2xl my-8 text-white">Discover tranquility in our luxury cottages and cabins nestled in paradise</p>
        <button 
          onClick={onExploreClick}
          className="bg-gray-200 px-10 py-4 rounded-4xl text-md lg:text-xl font-semibold text-blue-500 hover:bg-white transition"
        >
          Explore Accommodations
        </button>
      </div>
    </main>
  )
}