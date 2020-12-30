import ApplicationService from '@/services/ApplicationService'

export default class OfferService extends ApplicationService {
  resource = '/admin/offers'

  //* **************************************************** *//
  async getOffers (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async createOffer (data) {
    return await this.post(`${this.resource}`, data)
  }

  async updateOffer (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async offerDetails (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteOffer (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
