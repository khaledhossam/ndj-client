import posts from '~/modules/blog/pages/categories.vue'
import post from '~/modules/blog/pages/_id.vue'

export default [
  {
    name: 'categories_old',
    path: '/categories',
    component: posts
  },
  {
    name: 'category_old',
    path: '/categories/:id',
    component: post,
    props: true
  }
]
