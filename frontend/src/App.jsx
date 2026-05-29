import { Route, Routes, Navigate } from "react-router-dom"
import CalendarPage from "./Pages/Admin/CalendarPage"
import CottagePage from "./Pages/Admin/CottagePage"
import ReservationPage from "./Pages/Admin/ReservationPage"
import HomePage from "./Pages/User/HomePage"
import ReservePage from "./Pages/User/ReservePage"
import LoginPage from "./Pages/Auth/LoginPage"
import ProtectedRoute from "./Layout/ProtectedRoute"
import RegisterPage from "./Pages/Auth/RegisterPage"

export default function App() {

  // function handleLogout() {
  //   logout()
  //     .then(() => {
  //       setUser(null)
  //       navigate('/auth/login')
  //     })
  // }
  
  return(
    <main>
      <Routes>
        {/* User Page */}
        <Route path="/" element={<Navigate to={'/auth/login'}/>}/>
        <Route path="/home" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <HomePage/>
          </ProtectedRoute>
        }/>
        <Route path="/reserve/:id" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <ReservePage/>
          </ProtectedRoute>
        }/>

        {/* Admin Page */}
        <Route path="/calendar" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CalendarPage/>
          </ProtectedRoute>
        }/>
        <Route path="/cottage" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CottagePage/>
          </ProtectedRoute>
        }/>
        <Route path="/reservation" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ReservationPage/>
          </ProtectedRoute>
        }/>
        {/* Auth Page */}
        <Route path="/auth/login" element={<LoginPage/>}/>
        <Route path="/auth/register" element={<RegisterPage/>}/>
      </Routes>
    </main>
  )
}