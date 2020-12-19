
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
      this.$store.commit('localization/setCurrentLocale', lang)

      this.$buefy.snackbar.open({
        message: `changed successfully to ${lang}`,
        queue: false
      })
      // console.log('route', this.$router.currentRoute)
      // window.location.reload(`/${this.$router.currentRoute.path}`)
      // this.$router.push({ name: `${this.$router.currentRoute.name}` })
      // this.$router.app.refresh()
      // window.location.reload(true)
      // this.$nuxt.refresh()
      // this.$router.go(0)
      this.$mount()
      // this.$forceUpdate()
      // this.$router.push({ replace: true, name: `${this.$router.currentRoute.name}` }).catch(() => {})
    },
    buefyBar (message) {
      this.$buefy.snackbar.open({
        message,
        queue: false
      })
    }
  }
}
