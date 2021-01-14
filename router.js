import Vue from 'vue'
import Router from 'vue-router'

//* ** module website routes** */
import frontIndex from '~/modules/front/index.vue'
import frontRoutes from '~/modules/front/front.routes.js'

//* ** module admin routes** */
import adminIndex from '~/modules/admin/index.vue'
import adminRoutes from '~/modules/admin/admin.routes.js'

//* ** auth routes** */
import adminLogin from '~/modules/core/admin/login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/admin',
      component: adminIndex,
      children: adminRoutes
    },
    {
      name: 'admin-login',
      path: '/admin/login',
      component: adminLogin,
      meta: {
        noAuthentication: true
      }
    },
    {
      path: '/',
      component: frontIndex,
      children: frontRoutes
    }
  ]
})

export function createRouter () {
  return router
}
