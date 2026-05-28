import { Route, Routes, Navigate } from "react-router-dom"
import CalendarPage from "./Pages/Admin/CalendarPage"
import CottagePage from "./Pages/Admin/CottagePage"
import ReservationPage from "./Pages/Admin/ReservationPage"
import HomePage from "./Pages/User/HomePage"
import ReservePage from "./Pages/User/ReservePage"
import LoginPage from "./Pages/Auth/LoginPage"
import { useState } from "react"
import { me } from "./Service/authService"
import { useEffect } from "react"
import UserProtectedRoute from "./Layout/UserProtectedRoute"
import AdminProtectedRoute from "./Layout/AdminProtectedRoute"

export default function App() {
  const [user, setUser] = useState(null)

  function fetchUser() {
    me()
      .then(res => {
        setUser(res.data)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  console.log(user)

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
          <UserProtectedRoute user={user}>
            <HomePage/>
          </UserProtectedRoute>
        }/>
        <Route path="/reserve/:id" element={
          <UserProtectedRoute user={user}>
            <ReservePage/>
          </UserProtectedRoute>
        }/>

        {/* Admin Page */}
        <Route path="/calendar" element={
          <AdminProtectedRoute user={user}>
            <CalendarPage/>
          </AdminProtectedRoute>
        }/>
        <Route path="/cottage" element={
          <AdminProtectedRoute user={user}>
            <CottagePage/>
          </AdminProtectedRoute>
        }/>
        <Route path="/reservation" element={
          <AdminProtectedRoute user={user}>
            <ReservationPage/>
          </AdminProtectedRoute>
        }/>
        {/* Auth Page */}
        <Route path="/auth/login" element={<LoginPage/>}/>
      </Routes>
    </main>
  )
}