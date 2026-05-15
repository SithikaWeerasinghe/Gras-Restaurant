import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Menu from '../pages/Menu.vue'
import Gallery from '../pages/Gallery.vue'
import Contact from '../pages/Contact.vue'
import Reservation from '../pages/Reservation.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/menu', component: Menu },
  { path: '/gallery', component: Gallery },
  { path: '/contact', component: Contact },
  { path: '/reservation', component: Reservation },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
