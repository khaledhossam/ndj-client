import ApplicationService from '@/services/ApplicationService'

export default class ProductService extends ApplicationService {
  resource = '/admin/products'

  //* **************************************************** *//
  async getProducts (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async createProduct (data) {
    return await this.post(`${this.resource}`, data)
  }

  async updateProduct (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async productDetails (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteProduct (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
