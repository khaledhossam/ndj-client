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
  name: 'Admins',
  components: {
    FilePicker,
    CardComponent,
    TitleBar
  },
  async asyncData (context) {
    const roles = await context.$RoleService.getRoles('?is_paginated=false')

    if (context.params.id) {
      const adminDetail = await context.$AdminService.adminDetails(context.params.id)
      return { roles, adminDetail }
    }
    return { roles }
  },
  data () {
    return {
      titlePage: this.$t('admin.admins'),
      form: {
        name: null,
        email: null,
        phone: null,
        roles: [],
        is_active: true,
        avatar: null,
        password: null,
        password_confirmation: null
      },
      profile_image: [],
      enableSubmit: true,
      uploader: {
        path: 'admin/avatar',
        file: null
      },
      param_id: this.$route.params.id,
      customEvents: [
        { eventName: 'handle-uploader', callback: this.handleUploadFile }
      ]
    }
  },
  computed: {
    titleBar () {
      return this.form.id ? this.$t('admin.edit') : this.$t('admin.create')
    },
    titleStack () {
      return [this.$t('admin.admins'), this.$t('admin.create')]
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
    this.adminDetails()
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
    adminDetails () {
      if (this.adminDetail) {
        this.reAssignForm(this.adminDetail)
      }
    },
    reAssignForm (data) {
      const obj = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        is_active: data.is_active,
        roles: data.roles.map(role => role.id),
        avatar: data.avatar
      }
      // overrite of form data
      this.form = { ...this.form, ...obj }
    },
    handleUploadFile (file) {
      this.enableSubmit = false

      if (this.form.avater) {
        this.handleDeleteFile(this.form.avatar, this.uploader.path)
      }
      this.uploader.file = file
      this.$UploadService.uploadSingleFile(this.uploader)
        .then((response) => {
          this.form.avatar = response.file
          this.enableSubmit = true
          this.buefyBar('File Uploaded Successfully')
        })
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
      this.$AdminService.createAdmin(this.form)
        .then(() => {
          this.$router.push({ name: 'admins' })
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },
    updateAdmin () {
      this.$AdminService.updateAdmin(this.form, this.param_id)
        .then(() => {
          this.$router.push({ name: 'admins' })
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
