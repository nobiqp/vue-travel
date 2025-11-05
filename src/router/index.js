import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BookingsView from '@/views/BookingsView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import TripView from '@/views/TripView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView,
      meta: { guestOnly: true },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView,
      meta: { guestOnly: true },
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/trip/:id',
      name: 'trips',
      component: TripView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'home' },
    },
  ],
})

const isAuthenticated = () => !!localStorage.getItem('token')

router.beforeEach((to, from, next) => {
  const loggedIn = isAuthenticated()

  if (to.meta.requiresAuth && !loggedIn) {
    next({ name: 'sign-in' })
  } else if (to.meta.guestOnly && loggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
