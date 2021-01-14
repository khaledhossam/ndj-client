import mapValues from 'lodash/mapValues'
import TitleBar from './node_modules/@/components/admin/TitleBar'
import CardComponent from './node_modules/@/components/admin/CardComponent'
import FilePicker from './node_modules/@/components/admin/FilePicker'
import { mapState } from 'vuex'

export default {
  validate ({ params, query, store }) {
    if (params.id) {
      return !isNaN(params.id)
    }
    return true
  },
  name: 'Aboutus',
  components: {
    FilePicker,
    CardComponent,
    TitleBar
  },
  async asyncData (context) {
    const aboutus = await context.$AppContentService.aboutus()
    return { aboutus }
  },
  // fetchOnServer: false,
  data () {
    return {
      titlePage: this.$t('admin.appcontent'),
      orders: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      form: {
        en: {
          title: '',
          body: ''
        },
        ar: {
          title: '',
          body: ''
        }
      },
      enableSubmit: true,
      customEvents: []
    }
  },
  computed: {
    titleBar () {
      return this.$t('admin.about_us')
    },
    titleStack () {
      return [this.$t('admin.app_content'), this.$t('admin.about_us')]
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
    this.aboutUsDetails()
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    aboutUsDetails () {
      this.reAssignForm(this.aboutus)
    },
    reAssignForm (data) {
      const obj = {
        en: {
          title: data?.title,
          body: data?.body
        },
        ar: {
          title: data?.title,
          body: data?.body
        }
      }
      // override of form data
      this.form = { ...data, ...obj }
    },
    handleUploadFile (file) {
      this.enableSubmit = false

      if (this.form.image) {
        this.handleDeleteFile(this.form.image, this.uploaderFolder)
      }
      this.$UploadService.uploadSingleFile({
        file,
        path: this.uploaderFolder
      })
        .then((response) => {
          this.form.image = response.file
          this.enableSubmit = true
          this.buefyBar('File Uploaded Successfully')
        })
    },
    async submit () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        if (this.param_id) {
          this.updateAdvertisement()
        } else {
          this.createAdvertisement()
        }
      }
    },
    createAdvertisement () {
      this.$AdvertisementService.createAdvertisement(this.form)
        .then(() => {
          this.$router.push({ name: 'admin.advertisements' })
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },
    updateAdvertisement () {
      this.$AdvertisementService.updateAdvertisement(this.form, this.param_id)
        .then(() => {
          this.$router.push({ name: 'admin.advertisements' })
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
