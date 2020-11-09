export default (request, response, next) => {
  // console.log('server middleware!', request.headers.host)
  next()
}
