import ApplicationService from '@/services/ApplicationService'

export default class BrandService extends ApplicationService {
  resource = '/admin/brands'

  //* **************************************************** *//
  async getBrands (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async createBrand (data) {
    return await this.post(`${this.resource}`, data)
  }

  async updateBrand (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async brandDetails (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteBrand (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
