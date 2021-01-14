import ApplicationService from "@/services/ApplicationService";

export default class AppContentService extends ApplicationService {
  resource = "/admin/pages";

  //* **************************************************** *//

  async aboutus() {
    return await this.get(`${this.resource}/about-us`);
  }

  async termsAndConditions() {
    return await this.get(`${this.resource}/terms-conditions`);
  }

  async updateAboutus(data) {
    return await this.put(`${this.resource}/about-us`, data);
  }

  async updateTermsAndConditions(data) {
    return await this.put(`${this.resource}/terms-conditions`, data);
  }
  //* **************************************************** *//
}
