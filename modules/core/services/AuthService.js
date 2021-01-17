import ApplicationService from '@/services/ApplicationService'

export default class AuthService extends ApplicationService {
  // https://dev.to/ihavecoke/use-service-object-in-nuxt-js-iig
  // https://blog.lichter.io/posts/nuxt-api-call-organization-and-decoupling/
  resource = '/auth'

  //* **************************************************** *//
  async adminLogin (data) {
    // return await this.axios.post('admin/auth/login', data)
    return await this.post(`/admin${this.resource}/login`, data)
  }

  async frontLogin (data) {
    return await this.post(`${this.resource}/login`, data)
  }

  async frontRegister (data) {
    return await this.post(`${this.resource}/registration`, data)
  }

  async forgetPassword (data) {
    return await this.post(`${this.resource}/forget-password`, data)
  }

  async resetPassword (data) {
    return await this.post(`${this.resource}/reset-password`, data)
  }

  async verifyPasswordCode (data) {
    return await this.post(`${this.resource}/verify-token`, data)
  }

  async activateRegisterCode (data) {
    return await this.post(`${this.resource}/verify-account`, data)
  }

  //* **************************************************** *//
}
