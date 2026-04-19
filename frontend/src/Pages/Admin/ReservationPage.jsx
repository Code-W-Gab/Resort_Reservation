import Header from "../../Components/Admin/Header";
import ReserveList from "../../Components/Admin/Reservations/ReserveList";
import Status from "../../Components/Admin/Status";

export default function ReservationPage() {
  return(
    <main>
      <Header/>
      <div className="bg-gray-100 min-h-screen">
        <Status/>
        <ReserveList/>
      </div>
    </main>
  )
}