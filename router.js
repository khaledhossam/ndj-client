import Vue from 'vue'
import Router from 'vue-router'
//* * basic routes */
import custom from '~/modules/blog.vue'
import home from '~/modules/index.vue'

//* ** module website routes** */
import blogIndex from '~/modules/blog/index.vue'
import blogRoutes from '~/modules/blog/blog.routes'

//* ** module admin routes** */
// import adminCategoryIndex from '~/modules/admin/categories/index.vue'
// import adminCategoryRoutes from '~/modules/admin/categories/category.routes'

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
      component: home
    },
    {
      name: 'custom',
      path: '/custom',
      component: custom
    },
    {
      path: '/categories',
      component: blogIndex,
      children: blogRoutes
    }
    // {
    //   path: '/admin',
    //   component: adminCategoryIndex,
    //   children: adminCategoryRoutes
    // }
  ]
})

// global navigation guard to validate authentication on any route
// router.beforeEach((to, from, next) => {
//   console.log('from router:', from)
//   next()
// })

export function createRouter () {
  return router
}
