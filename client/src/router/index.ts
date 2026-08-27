import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/post/:id',
      name: 'post-detail',
      component: () => import('@/views/PostDetailView.vue')
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/PublishView.vue')
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue')
    }
  ]
})

export default router