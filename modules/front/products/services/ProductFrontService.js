import ApplicationService from '@/services/ApplicationService'

export default class ProductFrontService extends ApplicationService {

  //* **************************************************** *//
  async getFilterProducts (queryParam = {}) {
    return await this.get(`/products${queryParam}`)
  }

  //* **************************************************** *//
}
