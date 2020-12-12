import posts from '~/modules/blog/pages/categories.vue'
import post from '~/modules/blog/pages/_id.vue'

export default [
  {
    name: 'posts',
    path: '/',
    component: posts
  },
  {
    name: 'post',
    path: '/:id',
    component: post,
    props: true
  }
]
