
import home from '~/modules/index.vue'
//* auth module */
import frontLogin from '~/modules/core/front/login/login.vue'
import frontRegister from '~/modules/core/front/register/register.vue'
import forgetPassword from '~/modules/core/front/forget-password/forget-password.vue'
import updatePassword from '~/modules/core/front/update-password/update-password.vue'

export default [
  {
    name: 'home',
    path: '/',
    component: home,
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
  }
]
