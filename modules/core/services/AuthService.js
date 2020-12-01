import ApplicationService from '@/services/ApplicationService'

export default class AuthService extends ApplicationService {
  // https://dev.to/ihavecoke/use-service-object-in-nuxt-js-iig
  // https://blog.lichter.io/posts/nuxt-api-call-organization-and-decoupling/
  // resource = '/'

  //* **************************************************** *//
  async adminLogin (data) {
    // return await this.axios.post('admin/auth/login', data)
    return await this.post('admin/auth/login', data)
  }
  //* **************************************************** *//
}
