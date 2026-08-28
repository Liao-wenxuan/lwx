<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

function handleLogout() {
  auth.logout()
}
</script>

<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/">首页</router-link>

      <!-- 关键：v-if/v-else 切换登录态显示 -->
      <router-link v-if="!auth.isLoggedIn" to="/login">登录</router-link>
      <template v-else>
        <span class="user">已登录：{{ auth.user?.nickname }}</span>
        <button @click="handleLogout" class="logout-btn">退出</button>
      </template>

      <router-link to="/publish">发布</router-link>
      <router-link to="/profile/me">我的</router-link>
    </nav>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.nav a {
  text-decoration: none;
  color: #666;
  font-size: 14px;
}
.nav a.router-link-active {
  color: #ff2442;
  font-weight: 600;
}
.user {
  color: #ff2442;
  font-weight: 600;
}
.logout-btn {
  padding: 4px 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.logout-btn:hover {
  background: #f5f5f5;
}
.main { padding: 20px; }
</style>