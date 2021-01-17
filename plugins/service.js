
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
import AdvertisementService from '@/modules/admin/advertisements/services/AdvertisementService'
import AppContentService from '@/modules/admin/appcontent/services/AppContentService'
import ContactUsService from  '@/modules/admin/contactus/services/ContactUsService';
import ClientService from  '@/modules/admin/clients/services/ClientService';


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
  inject('AdvertisementService', new AdvertisementService(ctx))
  inject('AppContentService', new AppContentService(ctx))
  inject('ContactUsService', new ContactUsService(ctx))
  inject('ClientService', new ClientService(ctx))
}

// we can call AuthService
// this.$AuthService.users()
// this.$AuthService.user(1)
