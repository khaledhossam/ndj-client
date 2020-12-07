export default {
  data () {
    return {
      isModalActive: false,
      trashObjectId: null
    }
  },
  methods: {
    uniqueID () {
      return '_' + Math.random().toString(36).substr(2, 9)
    },
    cloneItem (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    trashModal (trashObjectId) {
      this.trashObjectId = trashObjectId
      this.isModalActive = true
    },
    trashConfirm (event) {
      // call api to delete
      this.$EventBus.$emit(event, this.trashObjectId)

      this.isModalActive = false
      this.buefyBar('deleted successfully')
    },
    trashCancel () {
      this.isModalActive = false
    },
    onLangChange (lang) {
      // this.$i18n.locale = event
      this.$store.commit('localization/setCurrentLocale', lang)

      this.$buefy.snackbar.open({
        message: `changed successfully to ${lang}`,
        queue: false
      })
    },
    buefyBar (message) {
      this.$buefy.snackbar.open({
        message,
        queue: false
      })
    }
  }
}
