import { useEffect, useState } from "react";
import Header from "../../Components/Admin/Header";
import ReserveList from "../../Components/Admin/Reservations/ReserveList";
import Status from "../../Components/Admin/Status";
import { getReserveCottage } from "../../Service/reserveService";

export default function ReservationPage() {
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
        <Status />
        <ReserveList  reserve={reserve}/>
      </div>
    </main>
  )
}