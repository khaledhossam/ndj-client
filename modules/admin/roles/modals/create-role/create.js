import mapValues from 'lodash/mapValues'
import TitleBar from '@/components/admin/TitleBar'
import CardComponent from '@/components/admin/CardComponent'
import FilePicker from '@/components/admin/FilePicker'
import { mapState } from 'vuex'

export default {
  validate ({ params, query, store }) {
    if (params.id) {
      return !isNaN(params.id)
    }
    return true
  },
  name: 'Roles',
  components: {
    FilePicker,
    CardComponent,
    TitleBar
  },
  async asyncData (context) {
    // https://nuxtjs.org/blog/understanding-how-fetch-works-in-nuxt-2-12/
    const groups = await context.$RoleService.getPermissions('?is_paginated=false')

    if (context.params.id) {
      const roleDetail = await context.$RoleService.roleDetails(context.params.id)
      return { groups, roleDetail }
    }
    return { groups }
  },
  // fetchOnServer: false,
  data () {
    return {
      titlePage: this.$t('admin.roles'),
      form: {
        en: {
          display_name: ''
        },
        ar: {
          display_name: ''
        },
        permissions: [],
        is_active: true
      },
      param_id: this.$route.params.id,
      customEvents: []
    }
  },
  computed: {
    titleBar () {
      return this.form.id ? this.$t('admin.edit') : this.$t('admin.create')
    },
    titleStack () {
      return [this.$t('admin.roles'), this.$t('admin.create')]
    },
    ...mapState({
      currentLocale: state => state.localization.currentLocale
    })
  },
  created () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$on(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  mounted () {
    this.roleDetails()
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    roleDetails () {
      if (this.param_id) {
        this.reAssignForm(this.roleDetail)
      }
    },
    reAssignForm (data) {
      const obj = {
        en: {
          display_name: data.en.display_name
        },
        ar: {
          display_name: data.ar.display_name
        },
        permissions: data.permissions.map(permission => permission.id)
      }
      // overrite of form data
      this.form = { ...this.form, ...obj }
    },
    async submit () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        if (this.param_id) {
          this.updateAdmin()
        } else {
          this.createAdmin()
        }
      }
    },
    createAdmin () {
      this.$RoleService.createRole(this.form)
        .then(() => {
          this.$router.push({ name: 'roles' })
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },
    updateAdmin () {
      this.$RoleService.updateRole(this.form, this.param_id)
        .then(() => {
          this.$router.push({ name: 'roles' })
          this.buefyBar(this.$t('admin.updated_successfully'))
        })
    },
    handleReset () {
      this.form = mapValues(this.form, (item) => {
        if (item && (typeof item === 'object' || Array.isArray(item))) {
          return []
        }
        return null
      })
      this.buefyBar(this.$t('admin.reset_successfully'))
    }
  },
  head () {
    return {
      title: this.titlePage
    }
  }
}
