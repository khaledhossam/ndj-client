import ApplicationService from '@/services/ApplicationService'

export default class ClientService extends ApplicationService {
  resource = '/admin/clients'

  //* **************************************************** *//
  async getClients (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async create (data) {
    return await this.post(`${this.resource}`, data)
  }

  async update (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async show (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteClient (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
