<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Profile
      <nuxt-link slot="right" to="/" class="button">
        Dashboard
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component title="Edit Profile" icon="account-circle">
          <form @submit.prevent="submit">
            <v-row>
              <v-col
                cols="12"
                md="9"
              >
                <v-text-field
                  v-model="form.name"
                  v-validate="{ required: true }"
                  icon="user"
                  type="text"
                  :label="$t('admin.name')"
                  name="name"
                  :class="{ 'is-invalid': errors.has('name') }"
                />
                <span v-show="errors.has('name')" class="text-error text-sm">
                  {{ errors.first("name") }}
                </span>
              </v-col>
              <v-col
                cols="12"
                md="9"
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
              <v-col
                cols="12"
                md="9"
              >
                <v-text-field
                  v-model="form.phone"
                  v-validate="{ required: true, numeric: true }"
                  icon="phone"
                  type="text"
                  :label="$t('admin.phone')"
                  name="phone"
                  :class="{ 'is-invalid': errors.has('phone') }"
                />
                <span v-show="errors.has('phone')" class="text-error text-sm">
                  {{ errors.first("phone") }}
                </span>
              </v-col>
            </v-row>

            <b-field horizontal>
              <div class="control">
                <button
                  type="submit"
                  class="button is-primary"
                >
                  {{ $t('admin.submit') }}
                </button>
              </div>
            </b-field>
          </form>
        </card-component>
        <card-component title="Profile" icon="account" class="tile is-child">
          <user-avatar class="image has-max-width is-aligned-center" />
          <hr>
          <b-field :label="$t('admin.name')">
            <b-input :value="authUser.name" custom-class="is-static" readonly />
          </b-field>
          <hr>
          <b-field :label="$t('admin.email')">
            <b-input :value="authUser.email" custom-class="is-static" readonly />
          </b-field>
        </card-component>
      </tiles>
      <password-update-form />
    </section>
  </div>
</template>

<style lang="scss" scoped src="./profile.scss"></style>
<script src="./profile.js"></script>
