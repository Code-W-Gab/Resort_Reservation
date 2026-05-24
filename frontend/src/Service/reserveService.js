import api from "../Api/axios";

export const reserveCottage = (CottageName, Capacity, DayTourDate, CheckInDate, CheckOutDate, FullName, Email, Phone, Total) => api.post('/reserve/add', {CottageName, Capacity, DayTourDate, CheckInDate, CheckOutDate, FullName, Email, Phone, Total})

export const getReserveCottage = () => api.get('/reserve/get')
export const updateReserveCottage = (id) => api.put(`/reserve/update/${id}`)