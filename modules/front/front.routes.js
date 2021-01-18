
import home from '~/modules/front/home/home.vue'
import test from '~/modules/front/test.vue'

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
    name: 'test',
    path: '/',
    component: test,
    meta: {
      noAuthentication: true
    }
  }
]
