
import home from '~/modules/front/home/home.vue'
import products from '~/modules/front/products/index/products.vue'

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
    name: 'products',
    path: '/products',
    component: products,
    props: true,
    meta: {
      noAuthentication: true
    }
  },
  {
    name: 'category.products',
    path: '/categories/:id/products',
    component: products,
    props: true,
    meta: {
      noAuthentication: true
    }
  },
  {
    name: 'brand.products',
    path: '/brands/:id/products',
    component: products,
    props: true,
    meta: {
      noAuthentication: true
    }
  }
]
