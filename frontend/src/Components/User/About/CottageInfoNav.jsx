import { Link } from "react-router-dom";

export default function CottageInfoNav() {
  return(
    <main className="rounded-2xl shadow-xl mx-6 lg:mx-10 xl:mx-20 py-6">
      <div className="bg-white text-center py-12 px-6 rounded-t-lg">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">Ready to Experience Serenity?</h1>
        <p className="text-sm sm:text-md text-gray-700 mb-6">Book your perfect cottage today and discover the escape you've been dreaming of.</p>
        <Link to="/cottages" className="text-xs sm:text-sm bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">View Our Cottages</Link>
      </div>
    </main>
  )
}