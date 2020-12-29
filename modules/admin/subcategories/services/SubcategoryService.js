import ApplicationService from '@/services/ApplicationService'

export default class SubcategoryService extends ApplicationService {
  resource = '/admin/subcategories'

  //* **************************************************** *//
  async getSubcategories (queryParam = {}) {
    return await this.get(`${this.resource}${queryParam}`)
  }

  //* **************************************************** *//
}
