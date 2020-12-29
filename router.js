import Vue from 'vue'
import Router from 'vue-router'

//* * basic routes */
import custom from '~/modules/blog.vue'
import home from '~/modules/index.vue'

//* ** module website routes** */
import blogIndex from '~/modules/blog/index.vue'
import blogRoutes from '~/modules/blog/blog.routes'

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
      name: 'home',
      path: '/',
      component: home,
      meta: {
        noAuthentication: true
      }
    },
    {
      name: 'custom',
      path: '/custom',
      component: custom
    },
    {
      path: '/categories',
      component: blogIndex,
      children: blogRoutes,
      meta: {
        noAuthentication: true
      }
    },
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
    }
  ]
})

export function createRouter () {
  return router
}
