import api from '../Api/axios'

export const AddCottage = (CottageName, Type, Descriptions, Capacity, DayTourPrice, OvernightPrice, Amenities) => api.post('/cottage/add', {CottageName, Type, Descriptions, Capacity, DayTourPrice, OvernightPrice, Amenities})
export const GetCottage = () => api.get('/cottage/get')
export const DeleteCottage = (id) => api.delete(`/cottage/delete/${id}`)