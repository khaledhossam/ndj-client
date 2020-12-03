export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (to.meta.noAuthentication) {
      next()
    } else if (store.state.auth.admin.isAuthenticated) {
      next()
    } else {
      next({ name: 'admin-login' })
    }
  })
}
