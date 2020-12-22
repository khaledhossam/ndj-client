import ApplicationService from '@/services/ApplicationService'

export default class UploadService extends ApplicationService {
  resource = '/admin'

  //* **************************************************** *//
  async uploadSingleFile (data) {
    const formData = new FormData()
    formData.append('path', data.path)
    formData.append('file', data.file_url)

    return await this.post(`${this.resource}/uploader`, formData)
  }

  async uploadMultipleFiles (data) {
    const formData = new FormData()
    formData.append('path', data.path)
    formData.append('files', data.files)

    return await this.post(`${this.resource}/uploader/multiple-files`, formData)
  }

  //* **************************************************** *//
}
