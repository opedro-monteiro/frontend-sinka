import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // habilitar os cookies
})

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      'Erro desconhecido.'

    console.log('🚨 ERRO NA RESPOSTA', error.response?.status, message)
    console.log('🚨 ERRO NA REQUISIÇÃO', error.response?.data)

    return Promise.reject(new Error(message))
  },
)
