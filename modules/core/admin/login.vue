<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="card">
        <h4 class="card-header text-center">
          Login
        </h4>
        <div class="card-body">
          <div class="alert alert-danger" role="alert">
            Usuario y/o Contraseña incorrecta.
          </div>
          <form data-toggle="validator" role="form" method="post" action="#">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Email / Usuario</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa fa-envelope-open-o" aria-hidden="true" /></span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      name="login_email"
                      value="JossMP"
                      pattern=".{4,}"
                      title="Cuatro(4) o mas caracteres"
                      required=""
                    >
                  </div>
                  <div class="help-block with-errors text-danger" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Contraseña</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa fa-unlock" aria-hidden="true" /></span>
                    </div>
                    <input
                      type="password"
                      name="login_password"
                      class="form-control"
                      pattern=".{4,}"
                      title="Cuatro(4) o mas caracteres"
                      required=""
                    >
                  </div>
                  <div class="help-block with-errors text-danger" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="checkbox checkbox-primary">
                <input id="checkbox_remember" type="checkbox" name="remember">
                <label for="checkbox_remember"> remember me</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <input type="hidden" name="redirect" value="">
                <input type="submit" class="btn btn-primary btn-lg btn-block" value="Login" name="submit">
              </div>
            </div>
          </form>
          <div class="clear" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./login.scss"></style>

<script>
export default {
  layout: 'empty-layout'
}
</script>
