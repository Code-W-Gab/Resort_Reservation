import api from "../Api/axios";

export const login = (Email, Password) => api.post('/auth/login', {Email, Password})
export const me = () => api.get('/auth/me')
export const logout = () => api.post('/auth/logout')