<template>
  <div id="app" data-app>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component :title="titleBar" icon="ballot">
        <form @submit.prevent="submit" @reset="handleReset()">
          <b-field :label="$t('admin.name')" horizontal>
            <b-input
              v-model="form.name"
              v-validate="{ required: true, max: 150 }"
              icon="account"
              :placeholder="$t('admin.name')"
              name="name"
              :class="{ 'is-invalid': errors.has('name') }"
            />
            <p v-show="errors.has('name')" class="text-danger text-sm">
              {{ errors.first("name") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.email')" horizontal>
            <b-input
              v-model="form.email"
              v-validate="{ required: true, max: 150, email: true }"
              icon="email"
              type="email"
              :placeholder="$t('admin.email')"
              name="email"
              :class="{ 'is-invalid': errors.has('email') }"
            />
            <p v-show="errors.has('email')" class="text-danger text-sm">
              {{ errors.first("email") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.phone')" horizontal>
            <b-input
              v-model="form.phone"
              v-validate="{ required: true, max: 15, numeric: true }"
              icon="phone"
              type="tel"
              :placeholder="$t('admin.phone')"
              name="phone"
              expanded
              :class="{ 'is-invalid': errors.has('phone') }"
            />
            <p v-show="errors.has('phone')" class="text-danger text-sm">
              {{ errors.first("phone") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.roles')" horizontal>
            <v-autocomplete
              v-model="form.roles"
              v-validate="{ required: true }"
              :items="roles"
              :menu-props="{ maxHeight: '400' }"
              :label="$t('admin.select')"
              multiple
              item-text="display_name"
              :item-value="'id'"
              name="roles"
              persistent-hint
              chips
              small-chips
            />
            <p v-show="errors.has('roles')" class="text-danger text-sm">
              {{ errors.first("roles") }}
            </p>
          </b-field>
          <hr>
          <b-field :label="$t('admin.password')" horizontal>
            <b-input
              ref="password"
              v-model="form.password"
              v-validate="{ required: true }"
              type="password"
              :placeholder="$t('admin.password')"
              name="password"
              :class="{ 'is-invalid': errors.has('password') }"
              password-reveal
            />
            <p v-show="errors.has('password')" class="text-danger text-sm">
              {{ errors.first("password") }}
            </p>
          </b-field>
          <b-field :label="$t('admin.confirm_password')" horizontal>
            <b-input
              v-model="form.password_confirmation"
              v-validate="'required|confirmed:password'"
              type="password"
              :placeholder="$t('admin.confirm_password')"
              name="password_confirmation"
              :class="{ 'is-invalid': errors.has('password_confirmation') }"
              password-reveal
            />
            <p v-show="errors.has('password_confirmation')" class="text-danger text-sm">
              {{ errors.first("password_confirmation") }}
            </p>
          </b-field>
          <hr>
          <b-field :label="$t('admin.status')" horizontal>
            <b-switch v-model="form.is_active" />
          </b-field>
          <hr>
          <b-field v-if="form.avatar" :label="$t('admin.preview')" horizontal>
            <v-img
              :lazy-src="form.avatar"
              :src="form.avatar"
              max-height="100"
              max-width="150"
            />
          </b-field>
          <b-field :label="$t('admin.file')" horizontal>
            <file-picker v-model="form.avatar" />
          </b-field>
          <hr>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button
                  native-type="submit"
                  type="is-primary"
                >
                  {{ $t('admin.submit') }}
                </b-button>
              </div>
              <div class="control">
                <b-button
                  type="is-primary is-outlined"
                  @click="handleReset"
                >
                  {{ $t('admin.reset') }}
                </b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script src="./create.js"></script>
<style lang="scss" scoped src="./create.scss"></style>
