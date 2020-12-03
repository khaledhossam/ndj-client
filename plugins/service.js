
import AuthService from '@/modules/core/services/AuthService'

export default (ctx, inject) => {
  ctx.AuthService = new AuthService(ctx)
  inject('AuthService', ctx.AuthService)
}

// we can call AuthService
// this.$AuthService.users()
// this.$AuthService.user(1)
