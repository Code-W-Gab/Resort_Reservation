import Header from "../../Components/Admin/Header";
import Status from "../../Components/Admin/Status";

export default function ReservationPage() {
  return(
    <main>
      <Header/>
      <div className="bg-gray-100 min-h-screen">
        <Status/>
      </div>
    </main>
  )
}