
import AuthService from '@/modules/core/services/AuthService'
import AdminService from '@/modules/admin/admins/services/AdminService'

import RoleService from '@/modules/admin/roles/services/RoleService'
import UploadService from '@/modules/admin/uploaders/services/UploadService'

export default (ctx, inject) => {
  inject('AuthService', new AuthService(ctx))
  inject('AdminService', new AdminService(ctx))
  inject('RoleService', new RoleService(ctx))
  inject('UploadService', new UploadService(ctx))
}

// we can call AuthService
// this.$AuthService.users()
// this.$AuthService.user(1)
