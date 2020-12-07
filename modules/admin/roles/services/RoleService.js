import ApplicationService from '@/services/ApplicationService'

export default class roleService extends ApplicationService {
  resource = '/admin'

  //* **************************************************** *//
  async getRoles (queryParam = {}) {
    return await this.get(`${this.resource}/roles${queryParam}`)
  }

  //* **************************************************** *//
}
