import ApplicationService from '@/services/ApplicationService'

export default class CategoryService extends ApplicationService {
  resource = '/admin/categories'

  //* **************************************************** *//
  async getCategories (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async createCategory (data) {
    return await this.post(`${this.resource}`, data)
  }

  async updateCategory (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async categoryDetails (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteCategory (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
