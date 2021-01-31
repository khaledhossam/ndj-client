import ApplicationService from '@/services/ApplicationService'

export default class CartService extends ApplicationService {

  //* **************************************************** *//
  async getCarts (queryParam = {}) {
    return await this.get(`/cart${queryParam}`)
  }

  async addToCart (data) {
    return await this.post(`/cart`, data)
  }

  async deleteItem (data) {
    return await this.delete(`/cart`, data)
  }

  async updateItem (data) {
    return await this.put(`/cart`, data)
  }

  async checkCoupon (data) {
    return await this.post(`/check-coupon`, data)
  }
  //* **************************************************** *//
}
