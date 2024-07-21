console.log('router/index.js')
import { createRouter, createWebHashHistory, Route } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import DefaultLayoutStandAlone from '@/standalone/layouts/DefaultLayoutStandAlone'
/*define const other in here*/

console.log(process.env.VUE_APP_STANDALONE_SINGLE_SPA)
const routes = [
  {
    path: '/',
    name: 'Home',
    component:
      process.env.VUE_APP_STANDALONE_SINGLE_SPA === 'true'
        ? DefaultLayoutStandAlone
        : DefaultLayout,
    redirect:  ( process.env.VUE_APP_STANDALONE_SINGLE_SPA!=='true' && (!localStorage.id_token || localStorage.id_token == '' )) ?
      () => {
        window.location.href = process.env.dc+'/#/sc/login'
        // return '/redirectingToLogin' // not important since redirecting
      }: '/app/dashboard',
    children: [
      {
        path: '/app/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/app/RMIMonitoring',
        name: 'RMIMonitoring',
        component: () => import('@/views/pages/RMIMonitoring.vue'),
      },
      {
        path: '/app/CheckIngot',
        name: 'Check Ingot',
        component: () => import('@/views/pages/RMIIngot.vue'),
      },
      {
        path: '/app/CheckSand',
        name: 'Check Sand',
        component: () => import('@/views/pages/RMISand.vue'),
      },
      {
        path: '/app/RMIMaster/RMIMasterIngot',
        name: 'RMIMasterIngot',
        component: () => import('@/views/pages/RMIMasterIngot.vue'),
      },
      {
        path: '/app/RMIMaster/RMIMasterSand',
        name: 'RMIMasterSand',
        component: () => import('@/views/pages/RMIMasterSand.vue'),
      },


      // URL
      // {
      //   path: '/qdc/quality-operational',
      //   name: 'Quality Operational',
      //   component: () => import('@/views/qdc/QualityOperational.vue'),
      // },

/*define other in here*/
    ],
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/pages/Page404'),
  },
  {
    path: '/500',
    name: 'Page500',
    component: () => import('@/views/pages/Page500'),
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
