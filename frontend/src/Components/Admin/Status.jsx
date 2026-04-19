export default function Status() {
  const status = [
    {"name": "Total Reservation", "count": 3, "color": "text-black"},
    {"name": "Confirmed", "count": 3, "color": "text-green-500"},
    {"name": "Pending", "count": 3, "color": "text-orange-500"},
    {"name": "Revenue (Month)", "count": 200, "color": "text-blue-500"},
  ]

  return(
    <main className="px-20 py-10 grid grid-cols-4 gap-6">
      {
        status.map((s, index) => {
          return <div key={index} className="bg-white inset-shadow-sm shadow-sm rounded-md p-6">
            <h3>{s.name}</h3>
            <h1 className={`text-4xl ${s.color}`}>
              {s.name === 'Revenue (Month)' ? `₱${s.count}` : s.count}
            </h1>
          </div>
        })
      }
      
    </main>
  )
}