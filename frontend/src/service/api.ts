import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    
    if (status === 403) {
      console.error('[API] Доступ запрещён')
    }
    
    if (status === 404) {
      console.error('[API] Ресурс не найден')
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('[API] Таймаут запроса')
    }
    
    if (error.message === 'Network Error') {
      console.error('[API] Нет соединения с сервером')
    }
    
    return Promise.reject(error)
  }
)

export default api