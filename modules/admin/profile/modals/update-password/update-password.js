import CardComponent from '@/components/admin/CardComponent'
import mapValues from 'lodash/mapValues'

export default {
  name: 'Profile',
  components: {
    CardComponent
  },
  data () {
    return {
      titlePage: this.$t('admin.profile'),
      form: {
        old_password: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    async updatePassword () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        this.updateAdminPassword()
      }
    },
    updateAdminPassword () {
      this.$AdminProfileService.updateAdminPassword(this.form)
        .then(() => {
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
