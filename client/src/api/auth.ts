import request from './request'

// ===== 类型定义 =====

export interface LoginParams {
  email: string
  password: string
}

export interface RegisterParams {
  email: string
  password: string
  nickname: string
}

export interface UserInfo {
  id: string
  email: string
  nickname: string
  avatar: string | null
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  userInfo: UserInfo
}

// ===== API 函数 =====

export const authApi = {
  // 登录
  login: (data: LoginParams) =>
    request.post<LoginResponse, LoginResponse>('/auth/login', data),

  // 注册
  register: (data: RegisterParams) =>
    request.post<LoginResponse, LoginResponse>('/auth/register', data),

  // 退出
  logout: () => request.post<void, void>('/auth/logout'),

  // 拿当前用户
  getCurrentUser: () => request.get<UserInfo, UserInfo>('/auth/me'),
}