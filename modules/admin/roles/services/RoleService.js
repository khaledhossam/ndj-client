import ApplicationService from '@/services/ApplicationService'

export default class roleService extends ApplicationService {
  resource = '/admin/roles'

  //* **************************************************** *//
  async getRoles (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async getPermissions (queryParam = {}) {
    return await this.get(`/admin/permissions${queryParam}`)
  }

  async createRole (data) {
    return await this.post(`${this.resource}`, data)
  }

  async updateRole (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async roleDetails (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteRole (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
