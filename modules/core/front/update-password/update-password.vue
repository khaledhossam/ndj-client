<template>
  <section class="full-height signin">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-lg-6">
          <h1>
            <nuxt-link class="logo" :to="{ name: 'home' }">
              <img src="~/assets/front/images/logo2.png" alt="نفائس الألماس">
            </nuxt-link>
          </h1>
          <div class="sec-title">
            <h5 class="sub-title">
              {{ $t('front.qs_forget_password') }}
            </h5>
            <h5 class="sub-title">
              {{ $t('front.hint_forget_password') }}
            </h5>
          </div>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="form.password"
                  v-validate="{ required: true }"
                  icon="eye"
                  type="password"
                  :label="$t('admin.password')"
                  name="password"
                  password-reveal
                  :class="{ 'is-invalid': errors.has('password') }"
                />
                <span v-show="errors.has('password')" class="text-error text-sm">
                  {{ errors.first("password") }}
                </span>
              </v-col>

              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="form.password_confirmation"
                  v-validate="{ required: true }"
                  icon="eye"
                  type="password"
                  :label="$t('admin.password_confirmation')"
                  name="password_confirmation"
                  password-reveal
                  :class="{ 'is-invalid': errors.has('password_confirmation') }"
                />
                <span v-show="errors.has('password_confirmation')" class="text-error text-sm">
                  {{ errors.first("password_confirmation") }}
                </span>
              </v-col>

              <v-col
                cols="12"
              >
                <div class="form-group mt-5">
                  <button type="submit" class="btn defualt">
                    {{ $t('front.send') }}
                  </button>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./update-password.js"></script>
