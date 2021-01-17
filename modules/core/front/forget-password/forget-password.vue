<template>
  <section class="signin">
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
                <div class="form-group mt-5">
                  <button type="submit" class="btn defualt">
                    {{ $t('front.send') }}
                  </button>
                </div>
              </v-col>
            </v-row>
          </v-form>
          <activation-code />
          <nuxt-link :to="{ name: 'login' }">
            {{ $t('front.back') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./forget-password.js"></script>
