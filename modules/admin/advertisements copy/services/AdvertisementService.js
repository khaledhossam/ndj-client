import ApplicationService from './node_modules/@/services/ApplicationService'

export default class AdvertisementService extends ApplicationService {
  resource = '/admin/ads'

  //* **************************************************** *//
  async getAdvertisements (queryParam = {}) {
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

  async advertisementDetails (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteAdvertisement (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
