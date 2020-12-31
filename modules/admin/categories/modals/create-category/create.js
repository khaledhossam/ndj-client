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
  name: 'Categories',
  components: {
    FilePicker,
    CardComponent,
    TitleBar
  },
  async asyncData (context) {
    if (context.params.id) {
      const categoryDetail = await context.$CategoryService.categoryDetails(context.params.id)
      return { categoryDetail }
    }
  },
  // fetchOnServer: false,
  data () {
    return {
      titlePage: this.$t('admin.categories'),
      image: null,
      uploaderFolder: 'categories',
      enableSubmit: true,
      form: {
        en: {
          name: ''
        },
        ar: {
          name: ''
        },
        image: null,
        order: 1,
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
      return [this.$t('admin.categories'), this.$t('admin.create')]
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
    this.categoryDetails()
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    categoryDetails () {
      if (this.categoryDetail) {
        this.reAssignForm(this.categoryDetail)
      }
    },
    reAssignForm (data) {
      // override of form data
      this.form = data
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
          this.updateCategory()
        } else {
          this.createCategory()
        }
      }
    },
    createCategory () {
      this.$CategoryService.createCategory(this.form)
        .then(() => {
          this.$router.push({ name: 'admin.categories' })
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },
    updateCategory () {
      this.$CategoryService.updateCategory(this.form, this.param_id)
        .then(() => {
          this.$router.push({ name: 'admin.categories' })
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
