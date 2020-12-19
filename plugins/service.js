
import AuthService from '@/modules/core/services/AuthService'
import AdminService from '@/modules/admin/admins/services/AdminService'

import RoleService from '@/modules/admin/roles/services/RoleService'
import UploadService from '@/modules/admin/uploaders/services/UploadService'
import PropertyService from '@/modules/admin/properties/services/PropertyService'

import ProductService from '@/modules/admin/products/services/ProductService'

export default (ctx, inject) => {
  inject('AuthService', new AuthService(ctx))
  inject('AdminService', new AdminService(ctx))
  inject('RoleService', new RoleService(ctx))
  inject('UploadService', new UploadService(ctx))
  inject('PropertyService', new PropertyService(ctx))
  inject('ProductService', new ProductService(ctx))
}

// we can call AuthService
// this.$AuthService.users()
// this.$AuthService.user(1)
