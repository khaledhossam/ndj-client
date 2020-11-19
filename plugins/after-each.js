export default async ({ app }) => {
  await app.router.afterEach(() => {
    app.store.commit('admin/asideMobileStateToggle', false)
  })
}
