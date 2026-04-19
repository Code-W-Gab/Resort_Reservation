import { Route, Routes, Navigate } from "react-router-dom"
import CalendarPage from "./Pages/Admin/CalendarPage"
import CottagePage from "./Pages/Admin/CottagePage"
import ReservationPage from "./Pages/Admin/ReservationPage"

export default function App() {
  return(
    <main>
      <Routes>
        <Route path="/" element={<Navigate to={'/calendar'}/>}/>
        <Route path="/calendar" element={<CalendarPage/>}/>
        <Route path="/cottage" element={<CottagePage/>}/>
        <Route path="/reservation" element={<ReservationPage/>}/>
      </Routes>
    </main>
  )
}