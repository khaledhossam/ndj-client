import statistics from '~/modules/admin/statistics.vue'
import tables from '~/modules/admin/tables.vue'
import forms from '~/modules/admin/forms.vue'
import profile from '~/modules/admin/profile.vue'
import client from '~/modules/admin/client/_id.vue'
// import adminCategoryIndex from '~/modules/admin/categories/index.vue'
// import adminCategoryRoutes from '~/modules/admin/categories/category.routes'
//* admin routes of each store *//
import admins from '~/modules/admin/admins/components/list-admins/admins.vue'
import createAdmin from '~/modules/admin/admins/modals/create-admin/create.vue'
// import updateAdmin from '~/modules/admin/admins/modals/create-admin/create.vue'

import roles from '~/modules/admin/roles/components/list-roles/roles.vue'
import createRole from '~/modules/admin/roles/modals/create-role/create.vue'
// import updateRole from '~/modules/admin/roles/modals/create-role/create.vue'

import properties from '~/modules/admin/properties/components/list-properties/properties.vue'
import createProperty from '~/modules/admin/properties/modals/create-property/create.vue'

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
    path: 'admins/:id',
    component: createAdmin,
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
    path: 'roles/:id',
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
    path: 'properties/:id',
    component: createProperty,
    props: true
  }
  // {
  //   path: 'categories',
  //   component: adminCategoryIndex,
  //   children: adminCategoryRoutes
  // }
]
