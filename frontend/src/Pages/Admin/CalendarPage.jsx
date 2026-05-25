import ReservationCalendar from "../../Components/Admin/Calendar/ReservationCalendar";
import Header from "../../Components/Admin/Header";
import Status from "../../Components/Admin/Status";
import { getReserveCottage } from "../../Service/reserveService";
import { useState, useEffect } from "react";

export default function CalendarPage() {
  const [reserve, setReserve] = useState([]);
  const [count, setCount] = useState(null)

  function fetchReserve() {
    getReserveCottage()
      .then(res => {
        setReserve(res.data.data)
        setCount(res.data.count)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchReserve()
  }, [])

  return(
    <main>
      <Header/>
      <div className="bg-gray-100 min-h-screen">
        <Status count={count} reserve={reserve}/>
        <ReservationCalendar reserve={reserve} fetchReserve={fetchReserve}/>
      </div>
    </main>
  )
}