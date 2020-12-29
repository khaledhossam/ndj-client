<template>
  <div id="app" data-app>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component :title="titleBar" icon="ballot">
        <v-form @submit.prevent="submit" @reset="handleReset()" lazy-validation>
          <v-row>
            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.name"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin.name')"
                name="name"
                :class="{ 'is-invalid': errors.has('name') }"
              >
              </v-text-field>
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
                v-validate="{ required: true, max: 150, email: true }"
                icon="email"
                type="email"
                :label="$t('admin.email')"
                name="email"
                :class="{ 'is-invalid': errors.has('email') }"
              ></v-text-field>
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
                v-validate="{ required: true, max: 15, numeric: true }"
                icon="phone"
                type="tel"
                :label="$t('admin.phone')"
                name="phone"
                expanded
                :class="{ 'is-invalid': errors.has('phone') }"
              ></v-text-field>
              <span v-show="errors.has('phone')" class="text-error text-sm">
                {{ errors.first("phone") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
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
                :class="{ 'is-invalid': errors.has('roles') }"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="removeSelect(form.roles, data.item)"
                  >
                    {{ data.item[currentLocale].display_name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title v-text="data.item[currentLocale].display_name" />
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <span v-show="errors.has('roles')" class="text-error text-sm">
                {{ errors.first("roles") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                ref="password"
                v-model="form.password"
                v-validate="param_id ? '' : { required: true }"
                type="password"
                :label="$t('admin.password')"
                name="password"
                :class="{ 'is-invalid': errors.has('password') }"
                password-reveal
              ></v-text-field>
              <span v-show="errors.has('password')" class="text-error text-sm">
                {{ errors.first("password") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.password_confirmation"
                v-validate="param_id ? '' : 'required|confirmed:password'"
                type="password"
                :label="$t('admin.confirm_password')"
                name="password_confirmation"
                :class="{ 'is-invalid': errors.has('password_confirmation') }"
                password-reveal
              ></v-text-field>
              <span v-show="errors.has('password_confirmation')" class="text-error text-sm">
                {{ errors.first("password_confirmation") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-file-input
                v-model="profile_image"
                accept="image/*"
                :label="$t('admin.profile_image')"
                v-validate="{ required: true }"
                name="profile_image"
                @change="handleUploadFile"
                :class="{ 'is-invalid': errors.has('profile_image') }"
                small-chips
              ></v-file-input>

              <a v-if="form.avatar" :href="form.avatar" target="_blank">
                <v-img
                  :lazy-src="form.avatar"
                  :src="form.avatar"
                  max-height="100"
                  max-width="150"
                  class="img-fluid"
                />
              </a>

              <span v-show="errors.has('profile_image')" class="text-error text-sm">
                {{ errors.first("profile_image") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <b-field :label="$t('admin.status')" horizontal>
                <b-switch v-model="form.is_active" />
              </b-field>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <b-field horizontal>
                <b-field grouped>
                  <div class="control">
                    <b-button
                      native-type="submit"
                      type="is-primary"
                      :disabled="!enableSubmit"
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
            </v-col>

          </v-row>
        </v-form>
      </card-component>
    </section>
  </div>
</template>

<script src="./create.js"></script>
<style lang="scss" scoped src="./create.scss"></style>
