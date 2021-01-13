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
  name: 'TermsAndConditions',
  components: {
    FilePicker,
    CardComponent,
    TitleBar
  },
  async asyncData (context) {
    const termsAndConditions = await context.$AppContentService.termsAndConditions()
    return { termsAndConditions }
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
      return this.$t('admin.terms_and_conditions')
    },
    titleStack () {
      return [this.$t('admin.app_content'), this.$t('admin.terms_and_conditions')]
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
    this.termsAndConditionsDetails()
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    termsAndConditionsDetails () {
      this.reAssignForm(this.termsAndConditions)
    },
    reAssignForm (data) {
      const obj = {
        en: {
          title: data?.en?.title,
          body: data?.en?.body
        },
        ar: {
          title: data?.ar?.title,
          body: data?.ar?.body
        }
      }
      // override of form data
      this.form = { ...data, ...obj }
    },
    async submit () {
      const validData = await this.$validator.validateAll()
      if (validData) {
          this.updateTermsAndConditions()
      }
    },
    updateTermsAndConditions () {
      this.$AppContentService.updateTermsAndConditions(this.form)
        .then(() => {
          this.$router.push({ name: 'admin.appcontent.termsandconditions' })
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
