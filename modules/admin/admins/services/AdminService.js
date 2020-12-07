import ApplicationService from '@/services/ApplicationService'

export default class AdminService extends ApplicationService {
  resource = '/admin'

  //* **************************************************** *//
  async getAdmins (queryParam = {}) {
    return await this.get(`${this.resource}/admins${queryParam}`)
  }

  async createAdmin (data) {
    return await this.post(`${this.resource}/admins`, data)
  }

  async updateAdmin (data, id) {
    return await this.put(`${this.resource}/admins/${id}`, data)
  }

  async adminDetails (id) {
    return await this.get(`${this.resource}/admins/${id}`)
  }

  async deleteAdmin (id) {
    return await this.delete(`${this.resource}/admins/${id}`)
  }
  //* **************************************************** *//
}
