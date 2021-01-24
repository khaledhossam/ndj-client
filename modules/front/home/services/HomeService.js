import ApplicationService from '@/services/ApplicationService'

export default class HomeService extends ApplicationService {

  //* **************************************************** *//
  async getAllCategories () {
    return await this.get(`/categories/all`)
  }

  async getAllSubCategories (id) {
    return await this.get(`/categories/${id}/sub-categories/all`)
  }

  async getBrands (queryParam = {}) {
    return await this.get(`/brands${queryParam}`)
  }

  async getAds (queryParam = {}) {
    return await this.get(`/ads${queryParam}`)
  }

  async getOffers (queryParam = {}) {
    return await this.get(`/offers${queryParam}`)
  }

  async getProductSuggestions(queryParam = {}) {
    return await this.get(`/products/suggestions${queryParam}`)
  }

  async getMostSellerProducts(queryParam = {}) {
    return await this.get(`/products/most-selling${queryParam}`)
  }

  async getCategoryProducts(queryParam = {}) {
    return await this.get(`/products${queryParam}`)
  }
  //* **************************************************** *//
}
