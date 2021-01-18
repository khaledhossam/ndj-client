import { mapState } from 'vuex'
import CardComponent from '@/components/admin/CardComponent'
import TitleBar from '@/components/admin/TitleBar'
import ModalBox from '@/components/admin/ModalBox'
import QuickSearch from '@/modules/admin/global/search/quick-search.vue'

export default {
  name: 'Contactus',
  components: {
    TitleBar,
    CardComponent,
    ModalBox,
    QuickSearch
  },
  filters: {
    /**
    * Filter to truncate string, accepts a length parameter
    */
    truncate(value, length) {
      return value.length > length
        ? value.substr(0, length) + '...'
        : value
    }
  },


  async asyncData(context) {
    if (context.params.id) {
      const message = await context.$ContactUsService.show(context.params.id)
      return { message }
    }
  },
  data() {
    return {
      form: {
        body: ''
      },
      enableSubmit: true,
      titlePage: this.$t('admin.advertisements'),
      collection: [],
      isPaginated: true,
      searchValue: '',
      total: 0,
      loading: false,
      sortField: 'id',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
      page: 1,
      perPage: 0,
      queryParam: '',
      customEvents: [
        // { eventName: 'handle-quick-search', callback: this.handleSearch },
        { eventName: 'event-delete-msg', callback: this.handleDelete }
      ]
    }
  },
  created() {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$on(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  computed: {
    titleStack() {
      return [this.$t('admin.contactus')]
    },
    ...mapState({
      currentLocale: state => state.localization.currentLocale
    })
  },
  mounted() {
    this.$EventBus.$emit('enable-quick-search', true)

  },
  beforeDestroy() {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    replyBtn() {
      this.$modal.show('reply-msg')
    },

    type(value) {
      if (value === true) {
        return 'alert-success'
      } else {
        return 'alert-danger'
      }
    },

    async submit () {
      const validData = await this.$validator.validateAll()

      if (validData) {
          this.replyMessage()
      }
    },
    replyMessage () {
 this.enableSubmit = false
      this.$ContactUsService.reply(this.form, this.$route.params.id)
        .then((res) => {
       
          this.message = res
          this.form.body = ""
          // this.$router.push({ name: 'admin.contactus.view', params: { id: this.$route.params.id } })
          this.$modal.hide('reply-msg')
          this.enableSubmit = true
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },

    handleDelete(id) {
      this.$ContactUsService.deleteMsg(id)
        .then(() => {
          //* update list to remove this row *//
          this.collection = this.collection.filter((obj) => {
            return obj.id !== id
          })
        })
    },
  },
  head() {
    return {
      title: this.titlePage
    }
  }
}
