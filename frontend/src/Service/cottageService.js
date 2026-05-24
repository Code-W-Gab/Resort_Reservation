import api from '../Api/axios'

export const AddCottage = (CottageName, Type, Descriptions, Capacity, DayTourPrice, OvernightPrice, Amenities, imageFiles) => {
  const formData = new FormData()
  formData.append('CottageName', CottageName)
  formData.append('Type', Type)
  formData.append('Descriptions', Descriptions)
  formData.append('Capacity', Capacity)
  formData.append('DayTourPrice', DayTourPrice)
  formData.append('OvernightPrice', OvernightPrice)
  formData.append('Amenities', Amenities)
  
  // Add image files
  if (imageFiles && imageFiles.length > 0) {
    imageFiles.forEach(file => {
      formData.append('images', file)
    })
  }
  
  return api.post('/cottage/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const UpdateCottage = (id, CottageName, Type, Descriptions, Capacity, DayTourPrice, OvernightPrice, Amenities, imageFiles) => {
  const formData = new FormData()
  formData.append('CottageName', CottageName)
  formData.append('Type', Type)
  formData.append('Descriptions', Descriptions)
  formData.append('Capacity', Capacity)
  formData.append('DayTourPrice', DayTourPrice)
  formData.append('OvernightPrice', OvernightPrice)
  formData.append('Amenities', Amenities)
  
  if (imageFiles && imageFiles.length > 0) {
    imageFiles.forEach(file => {
      formData.append('images', file)
    })
  }
  
  return api.put(`/cottage/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const GetCottage = () => api.get('/cottage/get')
export const GetCottageById = (id) => api.get(`/cottage/get/${id}`)
export const DeleteCottage = (id) => api.delete(`/cottage/delete/${id}`)