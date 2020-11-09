import posts from '~/modules/blog/pages/categories.vue'
import post from '~/modules/blog/pages/_id.vue'

export default [
  {
    name: 'categories',
    path: '/categories',
    component: posts
  },
  {
    name: 'category',
    path: '/categories/:id',
    component: post,
    props: true
  }
]
