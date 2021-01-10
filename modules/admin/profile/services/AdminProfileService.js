import ApplicationService from '@/services/ApplicationService'

export default class AdminProfileService extends ApplicationService {
  resource = '/admin/profile'

  //* **************************************************** *//

  async updateProfileAdmin (data) {
    return await this.put(`${this.resource}`, data)
  }

  async updateAdminPassword (data) {
    return await this.put(`${this.resource}/change-password`, data)
  }

  //* **************************************************** *//
}
