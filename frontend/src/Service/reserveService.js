import api from "../Api/axios";

export const reserveCottage = (CottageName, Capacity, DayTourDate, CheckInDate, CheckOutDate, FullName, Email, Phone, Total) => api.post('/reserve/add', {CottageName, Capacity, DayTourDate, CheckInDate, CheckOutDate, FullName, Email, Phone, Total})
export const getReserveCottage = () => api.get('/reserve/get')
export const confirmReservation = (id) => api.put(`/reserve/${id}`, { Status: "Confirmed" })
export const cancelReservation = (id) => api.put(`/reserve/${id}`, { Status: "Cancelled" })
export const deleteReservation = (id) => api.delete(`/reserve/${id}`)