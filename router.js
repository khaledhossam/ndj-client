import Vue from 'vue'
import Router from 'vue-router'
//* * basic routes */
import custom from '~/modules/blog.vue'
import home from '~/modules/index.vue'

//* ** module routes** */
import blogIndex from '~/modules/blog/index.vue'
import blogRoutes from '~/modules/blog/blog.routes'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior () {
      return { x: 0, y: 0 }
    },
    routes: [
      {
        name: 'home',
        path: '/',
        component: home
      },
      {
        name: 'custom',
        path: '/custom',
        component: custom
      },
      {
        path: '/posts',
        component: blogIndex,
        children: blogRoutes
      }
    ]
  })
}
