import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// ===== 请求拦截器：自动加 token =====
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ===== 响应拦截器：统一错误处理 =====
request.interceptors.response.use(
  (response) => response.data,  // 直接返回 data，调用方少一层 .data
  (error: AxiosError) => {
    console.error('[API Error]', error.response?.status, error.message)
    
    // 401 = token 失效，清掉
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // TODO 阶段 8：这里跳登录页
    }
    
    return Promise.reject(error)
  }
)

export default request