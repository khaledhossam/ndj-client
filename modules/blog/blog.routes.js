import posts from '~/modules/blog/pages/posts.vue'
import post from '~/modules/blog/pages/_id.vue'

export default [
  {
    name: 'posts',
    path: '/posts',
    component: posts
  },
  {
    name: 'post',
    path: '/posts/:id',
    component: post,
    props: true
  }
]
