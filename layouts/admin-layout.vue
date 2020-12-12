<template>
  <div>
    <nav-bar />
    <aside-menu :menu="menu" />
    <Nuxt />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import NavBar from '@/components/admin/NavBar'
import AsideMenu from '@/components/admin/AsideMenu'
import FooterBar from '@/components/admin/FooterBar'
import mixins from '@/modules/admin/global/mixins'

Vue.mixin(mixins)

export default {
  // name: 'admin-default',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      return [
        'General',
        [
          {
            to: { name: 'statistics' },
            icon: 'desktop-mac',
            label: this.$t('admin.dashboard')
          },
          {
            to: { name: 'admins' },
            icon: 'account-circle',
            label: this.$t('admin.admins')
          }
        ],
        'Examples',
        [
          {
            to: { name: 'tables' },
            label: 'Tables',
            icon: 'table',
            updateMark: true
          },
          {
            to: { name: 'forms' },
            label: 'Forms',
            icon: 'square-edit-outline'
          },
          {
            to: { name: 'profile' },
            label: 'Profile',
            icon: 'account-circle'
          },
          {
            label: 'submenus',
            subLabel: 'Submenus Example',
            icon: 'view-list',
            menu: [
              {
                href: '#void',
                label: 'Sub-item One'
              },
              {
                href: '#void',
                label: 'Sub-item Two'
              }
            ]
          }
        ]
        // 'About',
        // [
        //   {
        //     href: 'https://admin-one-nuxt.justboil.me',
        //     label: 'Premium Demo',
        //     icon: 'credit-card'
        //   },
        //   {
        //     href: 'https://justboil.me/bulma-admin-template/one-nuxt',
        //     label: 'About',
        //     icon: 'help-circle'
        //   }
        // ]
      ]
    }
  },
  created () {
    this.$store.commit('admin/user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })
  },
  mounted () {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  }
}
</script>
<style scoped>
  .is-invalid{
    border: 1px solid #dc3545;
    border-radius: 5px;
  }
  p.text-danger{
    background: #ffe2e2;
    padding: 5px;
    border-radius: 5px;
  }
  .b-table .table-wrapper.has-sticky-header{
    height: 480px;
  }
</style>
