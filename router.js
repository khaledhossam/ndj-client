import Vue from 'vue'
import Router from 'vue-router'

//* ** module website routes** */
import frontIndex from '~/modules/front/index.vue'
import frontRoutes from '~/modules/front/front.routes.js'

//* ** module admin routes** */
import adminIndex from '~/modules/admin/index.vue'
import adminRoutes from '~/modules/admin/admin.routes.js'

//* ** auth admin routes** */
import adminLogin from '~/modules/core/admin/login.vue'

//* auth front module */
import frontLogin from '~/modules/core/front/login/login.vue'
import frontRegister from '~/modules/core/front/register/register.vue'
import forgetPassword from '~/modules/core/front/forget-password/forget-password.vue'
import updatePassword from '~/modules/core/front/update-password/update-password.vue'

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
      name: 'login',
      path: '/login',
      component: frontLogin,
      meta: {
        noAuthentication: true
      }
    },
    {
      name: 'register',
      path: '/register',
      component: frontRegister,
      meta: {
        noAuthentication: true
      }
    },
    {
      name: 'password.reset',
      path: '/password/reset',
      component: forgetPassword,
      meta: {
        noAuthentication: true
      }
    },
    {
      name: 'password.update',
      path: '/password/update',
      component: updatePassword,
      props: true,
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
