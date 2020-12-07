import ApplicationService from '@/services/ApplicationService'

export default class UploadService extends ApplicationService {
  resource = '/admin'

  //* **************************************************** *//
  async uploadSingleFile (data) {
    const formData = new FormData()
    formData.append('path', data.path)
    formData.append('image', data.file_url)

    return await this.post(`${this.resource}/uploader`, formData)
  }

  //* **************************************************** *//
}
