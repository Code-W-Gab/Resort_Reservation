import api from "../Api/axios";

export const login = (Email, Password) => api.post('/auth/login', {Email, Password})
export const register = (FullName, Email, Password) => api.post('/auth/register', {FullName, Email, Password})
export const verifyEmail = (Email, otp) => api.post('/auth/verify-email', {Email, otp})
export const resendOTP = (Email) => api.post('/auth/resend-otp', {Email})
export const me = () => api.get('/auth/me')
export const logout = () => api.post('/auth/logout')
export const sendContactMessage = (name, email, message) => api.post('/auth/contact', {name, email, message})