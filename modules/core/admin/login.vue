<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="card">
        <h4 class="card-header text-center">
          {{ $t('admin.login') }}
        </h4>
        <div class="card-body">
          <!-- <div class="alert alert-danger" role="alert">
            Usuario y/o Contraseña incorrecta.
          </div> -->
          <b-form class @submit.prevent="handleSubmit()" @reset="handleReset()">
            <div class="row">
              <div class="col-md-12">
                <label>
                  {{ $t('admin.email') }}
                </label>
                <b-input
                  v-model="form.email"
                  icon="email"
                  type="email"
                  :placeholder="$t('admin.email')"
                  name="email"
                  rules="'required|email'"
                />
                <!-- <span>{{ errors[0] }}</span> -->
                <!-- <ValidationObserver>
                  <ValidationProvider tag="div" :rules="{ required: true }" name="email" v-slot="{ errors }">
                    <b-input
                      v-model="form.email"
                      icon="email"
                      type="email"
                      :placeholder="$t('admin.email')"
                      name="email"
                      :class="{ 'is-invalid': submitted && errors.has('email') }"
                    />
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </ValidationObserver> -->

              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label>
                  {{ $t('admin.password') }}
                </label>
                <b-input
                  v-model="form.password"
                  icon="eye"
                  type="password"
                  :placeholder="$t('admin.password')"
                  name="password"
                  password-reveal
                />
              </div>
            </div>
            <div class="row">
              <b-checkbox v-model="form.remember">
                {{ $t('admin.remember') }}
              </b-checkbox>
            </div>
            <div class="row buttons mt-3">
              <b-button type="is-primary" expanded @click="handleSubmit()">
                {{ $t('admin.login') }}
              </b-button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./login.scss"></style>
<script src="./login.js"></script>
