import { CircleCheckBig, CircleX, Trash2 } from 'lucide-react'

export default function ReserveList({ reserve }) {
  return(
    <main className="px-20">
      <h1 className="text-2xl font-semibold">Manage Reservations</h1>
      <div className="grid grid-cols-[1.5fr_repeat(3,1fr)_repeat(4,120px)] items-center mt-6 bg-blue-500 text-white font-semibold px-3 py-3 rounded-tl-md rounded-tr-md">
        <p>GUEST</p>
        <p>COTTAGE</p>
        <p>DATES</p>
        <p>TYPES</p>
        <p>GUESTS</p>
        <p>TOTAL</p>
        <p>STATUS</p>
        <p>ACTIONS</p>
      </div>
      
      {reserve.map((r) => {
        return(
          <div key={r._id} className="grid grid-cols-[1.5fr_repeat(3,1fr)_repeat(4,120px)] items-center p-3 border border-t-0 border-gray-300">
            <div className="pr-5 break-all">
              <p>{r.FullName}</p>
              <p>{r.Email}</p>
            </div>
            <div className="pr-5 break-all">
              <p>{r.CottageName}</p>
            </div>
            <div className="pr-5 break-all">
              {r.DayTourDate === null 
                ? <p>Apr 20 - Apr 22, 2026</p>
                : <p>Apr 20</p>
              }
            </div>
            <div className="pr-5 break-all">
              {r.DayTourDate === null 
                ? <p>Overnight</p>
                : <p>Day Tour</p>
              }
            </div>
            
            <div className="pr-5 break-all">
              <p>{r.Capacity}</p>
            </div>
            <div className="pr-5 break-all">
              <p>₱{r.Total}</p>
            </div>
            <div className="pr-5 break-all">
              {r.Status === "Confirm"
                ? <p className="bg-green-200 text-green-800 px-3 py-1.5 text-xs text-center rounded-2xl w-20">{r.Status}</p>
                : <p className="bg-orange-200 text-orange-800 px-3 py-1.5 text-xs text-center rounded-2xl w-20">{r.Status}</p>
              }
            </div>
            <div className="flex items-center gap-4 pr-5 break-all">
              <CircleCheckBig size={22} className='text-green-600'/>
              <CircleX size={22} className='text-red-600'/>
              <Trash2 size={22} className='text-gray-500'/>
            </div>
          </div>
        )
      })}
    </main>
  )
}