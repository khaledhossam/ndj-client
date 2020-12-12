export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    console.log('to>>>', to.fullPath.split('/')[1])
    const prefix = to.fullPath.split('/')[1]

    if (to.meta.noAuthentication) {
      next()
    } else if (prefix === 'admin') {
      if (store.state.auth.admin.isAuthenticated) {
        next()
      } else {
        next({ name: 'admin-login' })
      }
    } else {
      if (store.state.auth.client.isAuthenticated) {
        next()
      }
      next({ name: 'admin-login' })
    }
    // if (to.meta.noAuthentication) {
    //   next()
    // } else if (store.state.auth.admin.isAuthenticated) {
    //   next()
    // } else {
    //   next({ name: 'admin-login' })
    // }
  })
}
