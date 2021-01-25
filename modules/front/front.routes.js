
import home from '~/modules/front/home/home.vue'
import products from '~/modules/front/products/index/products.vue'
import singleProduct from '~/modules/front/products/single/single.vue'

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
  },
  {
    name: 'subcategory.products',
    path: '/subcategories/:id/products',
    component: products,
    props: true,
    meta: {
      noAuthentication: true
    }
  },
  {
    name: 'products.single',
    path: 'products/:id',
    component: singleProduct,
    props: true,
    meta: {
      noAuthentication: true
    }
  }
]
