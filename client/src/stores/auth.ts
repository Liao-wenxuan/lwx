import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 用户类型（暂时简单定义，阶段 6 接入后端时扩展）
export interface User {
  id: string
  nickname: string
  avatar: string | null
}

export const useAuthStore = defineStore('auth', () => {
  // ===== state =====
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // ===== getters =====
  const isLoggedIn = computed(() => !!token.value)

  // ===== actions =====
  function login(userData: User, authToken: string) {
    user.value = userData
    token.value = authToken
  }

  function logout() {
    user.value = null
    token.value = null
  }

  // 必须 return 出去，外面才能用
  return { user, token, isLoggedIn, login, logout }
})