import statistics from '~/modules/admin/statistics.vue'
import tables from '~/modules/admin/tables.vue'
import forms from '~/modules/admin/forms.vue'
import profile from '~/modules/admin/profile.vue'
import client from '~/modules/admin/client/_id.vue'

export default [
  {
    name: 'statistics',
    path: '/',
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
  }
]
