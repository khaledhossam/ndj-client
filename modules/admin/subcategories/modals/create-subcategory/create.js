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
    const categories = await context.$CategoryService.getCategories(context.params.id)
    if (context.params.id) {
      const subcategoryDetail = await context.$SubcategoryService.subcategoryDetails(context.params.id)
      return { categories, subcategoryDetail }
    }
    return { categories }
  },
  // fetchOnServer: false,
  data () {
    return {
      titlePage: this.$t('admin.subcategories'),
      image: null,
      uploaderFolder: 'subcategories',
      enableSubmit: true,
      form: {
        en: {
          name: ''
        },
        ar: {
          name: ''
        },
        category_id: null,
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
      return [this.$t('admin.subcategories'), this.$t('admin.create')]
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
    this.subcategoryDetails()
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    subcategoryDetails () {
      if (this.subcategoryDetail) {
        this.reAssignForm(this.subcategoryDetail)
      }
    },
    reAssignForm (data) {
      const obj = {
        en: {
          name: data.en.name
        },
        ar: {
          name: data.ar.name
        },
        category_id: data.category.id,
        is_active: data.is_active
      }
      // override of form data
      this.form = obj
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
          this.updateSubcategory()
        } else {
          this.createSubcategory()
        }
      }
    },
    createSubcategory () {
      this.$SubcategoryService.createSubcategory(this.form)
        .then(() => {
          this.$router.push({ name: 'admin.subcategories' })
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },
    updateSubcategory () {
      this.$SubcategoryService.updateSubcategory(this.form, this.param_id)
        .then(() => {
          this.$router.push({ name: 'admin.subcategories' })
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
