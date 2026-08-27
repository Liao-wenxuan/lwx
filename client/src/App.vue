<script setup lang="ts">
</script>

<template>
  <div id="app">
    <!-- 顶部导航 -->
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/login">登录</router-link>
      <router-link to="/publish">发布</router-link>
      <router-link to="/profile/me">我的</router-link>
    </nav>
<!---->
    <!-- 路由出口：URL 改变时，这里渲染对应页面 -->
    <main class="main">
      <router-view />
    </main>
  
</div>


</template>

<style scoped>
.nav {
  display: flex;
  gap: 16px;
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

.main {
  padding: 20px;
}
</style>