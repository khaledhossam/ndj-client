import extend from 'lodash/extend'
// import { compact } from 'lodash'

class ApplicationService {
  constructor (ctx) {
    this.cache = ctx.cache
    this.logger = ctx.app.$logger
    this.axios = ctx.$axios
  }

  get (path, params = {}, extraConf = {}) {
    return this.request(path, 'GET', params, extraConf)
  }

  post (path, data, extraConfig = {}) {
    return this.request(path, 'POST', data, extraConfig)
  }

  put (path, data, extraConf = {}) {
    return this.request(path, 'PUT', data, extraConf)
  }

  delete (path, data = {}, extraConf = {}) {
    return this.request(path, 'DELETE', data, extraConf)
  }

  extraResp (response) {
    const data = (response && response.data) || {}
    return (data && data.data) || { err: true, code: data.code, message: data.message }
  }

  async request (path, method = 'GET', paramsData = {}, extraConfig = {}) {
    const { axios } = this
    const config = extend({ method, url: path, responseType: 'json', data: paramsData }, extraConfig)

    const response = await axios(config)
    return response
    // .then((res) => {
    //   console.log('result>', res)
    // })
    // .catch(err => console.log('error>', err))
    // return this.extraResp(response)
    // try {
    //   const response = await axios(config)
    //   return this.extraResp(response)
    // } catch (err) {
    //   console.warn('application Service', err)
    //   return { err: true }
    //   // return err.response.data
    // }
  }
}

export default ApplicationService
