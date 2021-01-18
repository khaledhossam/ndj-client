import ApplicationService from '@/services/ApplicationService'

export default class ContactUsService extends ApplicationService {
  resource = '/admin/contact-us'

  //* **************************************************** *//
  async getAllMessages (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async createAdvertisement (data) {
    return await this.post(`${this.resource}`, data)
  }

  async updateAdvertisement (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async reply (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async show (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteMsg (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
