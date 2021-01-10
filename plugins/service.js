
import AuthService from '@/modules/core/services/AuthService'
import AdminService from '@/modules/admin/admins/services/AdminService'
import AdminProfileService from '@/modules/admin/profile/services/AdminProfileService'

import RoleService from '@/modules/admin/roles/services/RoleService'
import UploadService from '@/modules/admin/uploaders/services/UploadService'
import PropertyService from '@/modules/admin/properties/services/PropertyService'

import CategoryService from '@/modules/admin/categories/services/CategoryService'
import SubcategoryService from '@/modules/admin/subcategories/services/SubcategoryService'
import BrandService from '@/modules/admin/brands/services/BrandService'

import ProductService from '@/modules/admin/products/services/ProductService'
import OfferService from '@/modules/admin/offers/services/OfferService'

export default (ctx, inject) => {
  inject('AuthService', new AuthService(ctx))
  inject('AdminService', new AdminService(ctx))
  inject('AdminProfileService', new AdminProfileService(ctx))
  inject('RoleService', new RoleService(ctx))
  inject('UploadService', new UploadService(ctx))
  inject('PropertyService', new PropertyService(ctx))
  inject('ProductService', new ProductService(ctx))
  inject('CategoryService', new CategoryService(ctx))
  inject('SubcategoryService', new SubcategoryService(ctx))
  inject('BrandService', new BrandService(ctx))
  inject('OfferService', new OfferService(ctx))
}

// we can call AuthService
// this.$AuthService.users()
// this.$AuthService.user(1)
