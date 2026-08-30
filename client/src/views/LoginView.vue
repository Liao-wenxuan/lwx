<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { authApi } from '@/api/auth'

const router = useRouter()
const auth = useAuthStore()

// 表单状态
const email = ref('')
const password = ref('')
const nickname = ref('')        // 注册时用
const isRegister = ref(false)   // false=登录, true=注册
const loading = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  if (!email.value || !password.value) {
    errorMsg.value = '请输入邮箱和密码'
    return
  }
  if (isRegister.value && !nickname.value) {
    errorMsg.value = '请输入昵称'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    const res = isRegister.value
      ? await authApi.register({
          email: email.value,
          password: password.value,
          nickname: nickname.value
        })
      : await authApi.login({
          email: email.value,
          password: password.value
        })

    // ✅ 请求成功 → 更新 store
    auth.login(res.userInfo, res.accessToken)
    router.push('/')
  } catch (err: any) {
    // ❌ 请求失败（暂时没有后端，一定会失败）
    console.error('登录失败', err)
    errorMsg.value = err.message || '请求失败，请检查后端是否启动'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <h1>{{ isRegister ? '注册' : '登录' }}</h1>

    <input
      v-model="email"
      type="email"
      placeholder="邮箱"
      class="input"
    />
    <input
      v-model="password"
      type="password"
      placeholder="密码"
      class="input"
    />
    <input
      v-if="isRegister"
      v-model="nickname"
      placeholder="昵称"
      class="input"
    />

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

    <button
      @click="handleSubmit"
      :disabled="loading"
      class="btn"
    >
      {{ loading ? '处理中...' : (isRegister ? '注册' : '登录') }}
    </button>

    <button
      @click="isRegister = !isRegister"
      class="toggle-btn"
    >
      切换到{{ isRegister ? '登录' : '注册' }}
    </button>
  </div>
</template>

<style scoped>
.page { padding: 20px; max-width: 360px; margin: 0 auto; }
.input {
  display: block;
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.btn {
  width: 100%;
  padding: 10px;
  background: #ff2442;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 12px;
}
.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.toggle-btn {
  width: 100%;
  padding: 8px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 8px;
}
.error {
  color: #ff2442;
  font-size: 12px;
  margin: 8px 0;
}
</style>