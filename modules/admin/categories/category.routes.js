import Categories from '~/modules/admin/categories/pages/Categories.vue'
import Category from '~/modules/admin/categories/pages/edit.vue'

export default [
  {
    name: 'categories',
    path: '/',
    component: Categories
    // props: true
  },
  {
    name: 'edit_category',
    path: 'edit-category',
    component: Category,
    props: true
  }
]
