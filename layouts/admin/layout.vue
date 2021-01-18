<template>
  <div>
    <nav-bar />
    <aside-menu :menu="menu" />
    <Nuxt />
    <footer-bar />
  </div>
</template>

<!--<style lang="scss" src="@/assets/admin/scss/main.scss"></style> -->

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
        this.$t('admin.general'),
        [
          {
            to: { name: 'statistics' },
            icon: 'desktop-mac',
            label: this.$t('admin.dashboard')
          },
          {
            to: { name: 'admin.categories' },
            icon: 'view-list',
            label: this.$t('admin.categories')
          },
          {
            to: { name: 'admin.subcategories' },
            icon: 'view-list',
            label: this.$t('admin.subcategories')
          },
          {
            to: { name: 'admin.brands' },
            icon: 'view-list',
            label: this.$t('admin.brands')
          },
          {
            to: { name: 'admin.advertisements' },
            icon: 'view-list',
            label: this.$t('admin.advertisements')
          }
        ],
        this.$t('admin.app_content'),
        [
          {
            label: this.$t('admin.app_content'),
            icon: 'view-list',
            menu: [
              {
                to: { name: 'admin.appcontent.aboutus' },
                icon: 'square-edit-outline',
                label: this.$t('admin.about_us')
              },
              {
                to: { name: 'admin.appcontent.termsandconditions' },
                icon: 'square-edit-outline',
                label: this.$t('admin.terms_and_conditions')
              }
            ]
          }
        ],
        this.$t('admin.admin_roles'),
        [
          {
            label: this.$t('admin.admin_roles'),
            subLabel: 'Submenus Example',
            icon: 'view-list',
            menu: [
              {
                to: { name: 'admins' },
                icon: 'account-circle',
                label: this.$t('admin.admins')
              },
              {
                to: { name: 'roles' },
                icon: 'square-edit-outline',
                label: this.$t('admin.roles')
              }
            ]
          }
        ],
        this.$t('admin.properties_products'),
        [
          {
            label: this.$t('admin.products'),
            subLabel: 'Submenus Example',
            icon: 'view-list',
            menu: [
              {
                to: { name: 'properties' },
                icon: 'square-edit-outline',
                label: this.$t('admin.properties')
              },
              {
                to: { name: 'admin.products' },
                icon: 'account-circle',
                label: this.$t('admin.products')
              },
              {
                to: { name: 'admin.offers' },
                icon: 'account-circle',
                label: this.$t('admin.offers')
              }
            ]
          }
        ]
        // 'Examples',
        // [
        //   {
        //     to: { name: 'tables' },
        //     label: 'Tables',
        //     icon: 'table',
        //     updateMark: true
        //   },
        //   {
        //     to: { name: 'forms' },
        //     label: 'Forms',
        //     icon: 'square-edit-outline'
        //   },
        //   {
        //     to: { name: 'profile' },
        //     label: 'Profile',
        //     icon: 'account-circle'
        //   },
        //   {
        //     label: 'submenus',
        //     subLabel: 'Submenus Example',
        //     icon: 'view-list',
        //     menu: [
        //       {
        //         href: '#void',
        //         label: 'Sub-item One'
        //       },
        //       {
        //         href: '#void',
        //         label: 'Sub-item Two'
        //       }
        //     ]
        //   }
        // ]
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
  },
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: require('~/assets/admin/scss/main.scss') }
      ]
    }
  }
}
</script>
<style scoped>
.is-invalid {
  border: 1px solid #dc3545;
  border-radius: 5px;
}
p.text-danger {
  background: #ffe2e2;
  padding: 5px;
  border-radius: 5px;
}
.b-table .table-wrapper.has-sticky-header {
  height: 480px;
}
</style>
