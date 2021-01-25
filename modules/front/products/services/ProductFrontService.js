import ApplicationService from '@/services/ApplicationService'

export default class ProductFrontService extends ApplicationService {

  //* **************************************************** *//
  async getFilterProducts (queryParam = {}) {
    return await this.get(`/products${queryParam}`)
  }

  async getProductDetail (id) {
    return await this.get(`/products/${id}`)
  }

  async getProductRatings (id, queryParam = {}) {
    return await this.get(`/products/${id}/ratings${queryParam}`)
  }

  //* **************************************************** *//
}
