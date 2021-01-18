<template>
  <div class="container">
    <section class="section is-main-section">
    <div class="row justify-content-center align-items-center">
      <div class="card">
        <h4 class="card-header text-center">
          {{ $t('admin.login') }}
        </h4>
        <div class="card-body">
          <v-form class @submit.prevent="handleSubmit()" @reset="handleReset()">
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="form.email"
                  v-validate="{ required: true, email: true }"
                  icon="email"
                  type="email"
                  :label="$t('admin.email')"
                  name="email"
                  :class="{ 'is-invalid': errors.has('email') }"
                />
                <span v-show="errors.has('email')" class="text-error text-sm">
                  {{ errors.first("email") }}
                </span>
              </v-col>
            </v-row>
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
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <b-checkbox v-model="form.remember">
                  {{ $t('admin.remember') }}
                </b-checkbox>
              </v-col>
              <v-col
                cols="12"
              >
                <b-button type="is-primary" class="text-center" expanded @click="handleSubmit()">
                  {{ $t('admin.login') }}
                </b-button>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </div>
    </div>
    </section>
  </div>
</template>

<style lang="scss" scoped src="./login.scss"></style>
<script src="./login.js"></script>
