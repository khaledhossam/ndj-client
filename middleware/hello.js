export default (context) => {
  if (process.browser) {
    console.log('router middleware!', window.location)
  }
}
