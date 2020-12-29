import ApplicationService from '@/services/ApplicationService'

export default class SubcategoryService extends ApplicationService {
  resource = '/admin/subcategories'

  //* **************************************************** *//
  async getSubcategories (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async createSubcategory (data) {
    return await this.post(`${this.resource}`, data)
  }

  async updateSubcategory (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async subcategoryDetails (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteSubcategory (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
