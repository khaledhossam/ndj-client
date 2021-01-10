import mapValues from 'lodash/mapValues'
import TitleBar from '@/components/admin/TitleBar'
import CardComponent from '@/components/admin/CardComponent'
import FilePicker from '@/components/admin/FilePicker'
import { mapState } from 'vuex'
import passwordUpdateForm from '@/modules/admin/profile/modals/update-password/update-password.vue'

export default {
  name: 'Profile',
  components: {
    FilePicker,
    CardComponent,
    TitleBar,
    passwordUpdateForm
  },
  data () {
    return {
      titlePage: this.$t('admin.profile'),
      form: {
        name: null,
        email: null,
        phone: null,
        avatar: null
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
      return this.$t('admin.profile')
    },
    titleStack () {
      return [this.$t('admin.profile')]
    },
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      authUser: state => state.auth.admin.authUser
    })
  },
  created () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$on(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
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
        this.updateProfileAdmin()
      }
    },
    updateProfileAdmin () {
      this.$AdminProfileService.updateProfileAdmin(this.form)
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
