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
            <h3 class="title">
              {{ $t('front.register') }}
            </h3>
            <h5 class="sub-title">
              {{ $t('front.have_account') }}
              <nuxt-link class="active" :to="{ name: 'login' }">
                {{ $t('front.login') }}
              </nuxt-link>
            </h5>
          </div>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="form.name"
                  v-validate="{ required: true, max: 150 }"
                  icon="account"
                  :label="$t('front.name')"
                  name="name"
                  :class="{ 'is-invalid': errors.has('name') }"
                />
                <span v-show="errors.has('name')" class="text-error text-sm">
                  {{ errors.first("name") }}
                </span>
              </v-col>

              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="form.email"
                  v-validate="{ required: true, max: 150, email: true }"
                  icon="email"
                  type="email"
                  :label="$t('front.email')"
                  name="email"
                  :class="{ 'is-invalid': errors.has('email') }"
                />
                <span v-show="errors.has('email')" class="text-error text-sm">
                  {{ errors.first("email") }}
                </span>
              </v-col>

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
                <v-text-field
                  v-model="form.password_confirmation"
                  v-validate="'required|confirmed:password'"
                  type="password"
                  :label="$t('front.confirm_password')"
                  name="password_confirmation"
                  :class="{ 'is-invalid': errors.has('password_confirmation') }"
                  password-reveal
                />
                <span v-show="errors.has('password_confirmation')" class="text-error text-sm">
                  {{ errors.first("password_confirmation") }}
                </span>
              </v-col>
              <v-col
                cols="12"
                :label="$t('front.gender')"
                class="has-check"
              >
                <b-field :label="$t('front.gender')" horizontal>
                  <b-radio
                    v-for="(option, key) in gender"
                    :key="`rad_${key}`"
                    v-model="form.gender"
                    v-validate="{ required: true }"
                    :native-value="option.key"
                    type="radio"
                    name="gender"
                    :class="{ 'is-invalid': errors.has('gender') }"
                  >
                    {{ option[currentLocale].name }}
                  </b-radio>
                </b-field>
                <span v-show="errors.has('gender')" class="text-error text-sm">
                  {{ errors.first('gender') }}
                </span>
              </v-col>
              <v-col
                cols="12"
              >
                <div class="form-group">
                  <label class="form-check-label">
                    <input v-model="form.accept" v-validate="{ required: true }" type="checkbox" name="accept_condition">
                    <span />
                    {{ $t('front.accept_condition') }}
                  </label>
                  <span v-show="errors.has('accept_condition')" class="text-error text-sm">
                    {{ errors.first('accept_condition') }}
                  </span>
                </div>
              </v-col>
              <v-col
                cols="12"
              >
                <div class="form-group mt-5">
                  <button type="submit" class="btn defualt">
                    {{ $t('front.register') }}
                  </button>
                </div>
              </v-col>
            </v-row>
          </v-form>
          <activation-code />
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./register.js"></script>
