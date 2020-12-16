import ApplicationService from '@/services/ApplicationService'

export default class PropertyService extends ApplicationService {
  resource = '/admin/properties'

  //* **************************************************** *//
  async getProperties (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  async getPropertyTypes (queryParam = {}) {
    return await this.get(`/admin/property-types${queryParam}`)
  }

  async getCategories (queryParam = {}) {
    return await this.get(`/admin/categories${queryParam}`)
  }

  async createProperty (data) {
    return await this.post(`${this.resource}`, data)
  }

  async updateProperty (data, id) {
    return await this.put(`${this.resource}/${id}`, data)
  }

  async toggleStatus (id, data = {}) {
    return await this.put(`${this.resource}/${id}/toggle-status`, data)
  }

  async propertyDetails (id) {
    return await this.get(`${this.resource}/${id}`)
  }

  async deleteProperty (id) {
    return await this.delete(`${this.resource}/${id}`)
  }
  //* **************************************************** *//
}
