import ApplicationService from '@/services/ApplicationService'

export default class AdminService extends ApplicationService {
  resource = '/admin/admins'

  //* **************************************************** *//
  async getAdmins (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async createAdmin (data) {
    return await this.post(`${this.resource}`, data)
  }

  async updateAdmin (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async adminDetails (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteAdmin (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
