import mapValues from 'lodash/mapValues'
import TitleBar from '@/components/admin/TitleBar'
import CardComponent from '@/components/admin/CardComponent'
import FilePicker from '@/components/admin/FilePicker'
import { mapState } from 'vuex'

export default {
  validate ({ params }) {
    if (params.id) {
      return !isNaN(params.id)
    }
    return true
  },
  name: 'Properties',
  components: {
    FilePicker,
    CardComponent,
    TitleBar
  },
  async asyncData (context) {
    const [categories, propertyTypes] = await Promise.all([

      context.$PropertyService.getCategories('?is_paginated=0'),

      context.$PropertyService.getPropertyTypes('?is_paginated=false')
    ])
    if (context.params.id) {
      const propertyDetail = await context.$PropertyService.propertyDetails(context.params.id)

      return { categories, propertyTypes, propertyDetail }
    } else {
      return { categories, propertyTypes }
    }
  },
  data () {
    return {
      titlePage: this.$t('admin.properties'),
      form: {
        en: {
          name: ''
        },
        ar: {
          name: ''
        },
        is_required: true,
        is_active: true,
        has_options: false,
        categories: [],
        options: [
          {
            en: {
              name: ''
            },
            ar: {
              name: ''
            }
          },
          {
            en: {
              name: ''
            },
            ar: {
              name: ''
            }
          }
        ]
      },
      param_id: this.$route.params.id,
      icon: 'mdi-checkbox-blank-outline',
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
    removeSelect (arr, item) {
      const index = arr.indexOf(item.id)
      arr.splice(index, 1)
    },
    toggle () {
      this.$nextTick(() => {
        if (this.form.categories.length) {
          this.icon = 'mdi-minus-box'
          this.form.categories = []
        } else {
          this.icon = 'mdi-close-box'
          this.form.categories = this.categories.map(category => category.id)
        }
      })
    },
    roleDetails () {
      if (this.roleDetail) {
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
