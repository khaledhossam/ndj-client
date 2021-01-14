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
              {{ $t('front.welcome_back') }}
            </h5>
            <h3 class="title">
              {{ $t('front.login_to_account') }}
            </h3>
            <h5 class="sub-title">
              {{ $t('front.not_have_account') }}
              <nuxt-link class="active" :to="{ name: 'register' }">
                {{ $t('front.register') }}
              </nuxt-link>
            </h5>
          </div>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="form.phone"
                  v-validate="{ required: true, max: 15, numeric: true }"
                  icon="phone"
                  type="tel"
                  :label="$t('front.phone')"
                  name="phone"
                  expanded
                  :class="{ 'is-invalid': errors.has('phone') }"
                />
                <span v-show="errors.has('phone')" class="text-error text-sm">
                  {{ errors.first("phone") }}
                </span>
              </v-col>

              <v-col
                cols="12"
              >
                <v-text-field
                  ref="password"
                  v-model="form.password"
                  v-validate="{ required: true }"
                  type="password"
                  :label="$t('front.password')"
                  name="password"
                  :class="{ 'is-invalid': errors.has('password') }"
                  password-reveal
                />
                <span v-show="errors.has('password')" class="text-error text-sm">
                  {{ errors.first("password") }}
                </span>
              </v-col>

              <v-col
                cols="12"
              >
                <div class="form-group">
                  <nuxt-link class="active" :to="{ name: 'password.reset' }">
                    {{ $t('front.qs_forget_password') }}
                  </nuxt-link>
                </div>
              </v-col>
              <v-col
                cols="12"
              >
                <div class="form-group mt-5">
                  <button type="submit" class="btn defualt">
                    {{ $t('front.login') }}
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

<script src="./login.js"></script>
