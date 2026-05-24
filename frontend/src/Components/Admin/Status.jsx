export default function Status({ count, reserve }) {
  const pendingCount = reserve.filter(r => r.Status === "Pending").length
  const confirmedCount = reserve.filter(r => r.Status === "Confirm").length
  const totalReservationCount = count
  const revenueByMonth = reserve.reduce((acc, r) => {
    const date = new Date(r.createdAt)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!acc[monthKey]) {
      acc[monthKey] = 0
    }
    acc[monthKey] += r.Total
    
    return acc
  }, {})

  const currentMonthRevenue = revenueByMonth[
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
  ] || 0

  const status = [
    {"name": "Total Reservation", "count": totalReservationCount, "color": "text-black"},
    {"name": "Confirmed", "count": confirmedCount, "color": "text-green-500"},
    {"name": "Pending", "count": pendingCount, "color": "text-orange-500"},
    {"name": "Revenue (Month)", "count": currentMonthRevenue, "color": "text-blue-500"},
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