import statistics from '~/modules/admin/statistics.vue'
import tables from '~/modules/admin/tables.vue'
import forms from '~/modules/admin/forms.vue'
import profile from '~/modules/admin/profile.vue'
import client from '~/modules/admin/client/_id.vue'

//* admin routes of each store *//
import admins from '~/modules/admin/admins/components/list-admins/admins.vue'
import createAdmin from '~/modules/admin/admins/modals/create-admin/create.vue'

import categories from '~/modules/admin/categories/components/list-categories/categories.vue'
import createCategory from '~/modules/admin/categories/modals/create-category/create.vue'

import subcategories from '~/modules/admin/subcategories/components/list-subcategories/subcategories.vue'
import createSubcategory from '~/modules/admin/subcategories/modals/create-subcategory/create.vue'

import roles from '~/modules/admin/roles/components/list-roles/roles.vue'
import createRole from '~/modules/admin/roles/modals/create-role/create.vue'

import properties from '~/modules/admin/properties/components/list-properties/properties.vue'
import createProperty from '~/modules/admin/properties/modals/create-property/create.vue'

import products from '~/modules/admin/products/components/list-products/products.vue'
import createProduct from '~/modules/admin/products/modals/create-product/create.vue'

export default [
  {
    name: 'statistics',
    path: 'statistics',
    component: statistics
  },
  {
    name: 'tables',
    path: 'tables',
    component: tables,
    props: true
  },
  {
    name: 'forms',
    path: 'forms',
    component: forms,
    props: true
  },
  {
    name: 'profile',
    path: 'profile',
    component: profile,
    props: true
  },
  {
    name: 'clients',
    path: 'clients',
    component: client,
    props: true
  },
  {
    name: 'admins',
    path: 'admins',
    component: admins,
    props: true
  },
  {
    name: 'createAdmin',
    path: 'admins/create',
    component: createAdmin,
    props: true
  },
  {
    name: 'updateAdmin',
    path: 'admins/:id/edit',
    component: createAdmin,
    props: true
  },
  {
    name: 'admin.categories',
    path: 'categories',
    component: categories,
    props: true
  },
  {
    name: 'createCategory',
    path: 'categories/create',
    component: createCategory,
    props: true
  },
  {
    name: 'updateCategory',
    path: 'categories/:id/edit',
    component: createCategory,
    props: true
  },
  {
    name: 'admin.subcategories',
    path: 'subcategories',
    component: subcategories,
    props: true
  },
  {
    name: 'createSubcategory',
    path: 'subcategories/create',
    component: createSubcategory,
    props: true
  },
  {
    name: 'updateSubcategory',
    path: 'subcategories/:id/edit',
    component: createSubcategory,
    props: true
  },
  {
    name: 'roles',
    path: 'roles',
    component: roles,
    props: true
  },
  {
    name: 'createRole',
    path: 'roles/create',
    component: createRole,
    props: true
  },
  {
    name: 'updateRole',
    path: 'roles/:id/edit',
    component: createRole,
    props: true
  },
  {
    name: 'properties',
    path: 'properties',
    component: properties,
    props: true
  },
  {
    name: 'createProperty',
    path: 'properties/create',
    component: createProperty,
    props: true
  },
  {
    name: 'updateProperty',
    path: 'properties/:id/edit',
    component: createProperty,
    props: true
  },
  {
    name: 'admin.products',
    path: 'products',
    component: products,
    props: true
  },
  {
    name: 'createProduct',
    path: 'products/create',
    component: createProduct,
    props: true
  },
  {
    name: 'updateProduct',
    path: 'products/:id/edit',
    component: createProduct,
    props: true
  }
]
