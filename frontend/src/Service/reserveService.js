import api from "../Api/axios";

export const reserveCottage = (CottageName, Capacity, DayTourData, CheckInDate, CheckOutDate, FullName, Email, Phone, Total) => api.post('/reserve/add', {CottageName, Capacity, DayTourData, CheckInDate, CheckOutDate, FullName, Email, Phone, Total})