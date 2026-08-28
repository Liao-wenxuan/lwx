<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const nickname = ref('')

function handleMockLogin() {
  // 不接后端，直接 mock 一个用户
  auth.login(
    {
      id: 'mock-001',
      nickname: nickname.value || '测试用户',
      avatar: null
    },
    'mock-token-abc123'
  )
  console.log('登录成功！user:', auth.user, 'token:', auth.token)
  // 登录后跳首页
  router.push('/')
}
</script>

<template>
  <div class="page">
    <h1>登录</h1>
    <input v-model="nickname" placeholder="输入昵称（随便填）" class="input" />
    <button @click="handleMockLogin" class="btn">Mock 登录</button>
  </div>
</template>

<style scoped>
.page { padding: 20px; }
.input {
  display: block;
  width: 100%;
  max-width: 300px;
  padding: 8px;
  margin: 12px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  padding: 8px 20px;
  background: #ff2442;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover { background: #d41e35; }
</style>