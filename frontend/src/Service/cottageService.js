import api from '../Api/axios'

export const AddCottage = (CottageName, Type, Descriptions, Capacity, DayTourPrice, OvernightPrice, Amenities) => api.post('/cottage/add', {CottageName, Type, Descriptions, Capacity, DayTourPrice, OvernightPrice, Amenities})
export const GetCottage = () => api.get('/cottage/get')
export const GetCottageById = (id) => api.get(`/cottage/get/${id}`)
export const DeleteCottage = (id) => api.delete(`/cottage/delete/${id}`)
export const UpdateCottage = (id) => api.put(`/cottage/update/${id}`)