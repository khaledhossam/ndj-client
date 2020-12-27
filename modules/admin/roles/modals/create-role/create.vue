<template>
  <div id="app" data-app>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component :title="titleBar" icon="ballot">
        <v-form @submit.prevent="submit" @reset="handleReset()">
          <v-row>
            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.en.display_name"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'en.name\']')"
                name="en.name"
                :class="{ 'is-invalid': errors.has('en.name') }"
              >
              </v-text-field>
              <span v-show="errors.has('en.name')" class="text-error text-sm">
                {{ errors.first("en.name") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.ar.display_name"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'ar.name\']')"
                name="ar.name"
                :class="{ 'is-invalid': errors.has('ar.name') }"
              >
              </v-text-field>
              <span v-show="errors.has('ar.name')" class="text-error text-sm">
                {{ errors.first("ar.name") }}
              </span>
            </v-col>

            <v-col
              cols="12"
            >
              <card-component :title="$t('admin.roles')" icon="ballot-outline">
                <b-field
                  v-for="(group, key) in groups"
                  :key="`group_${key}`"
                  :label="group[currentLocale].display_name"
                  class="has-check"
                  horizontal
                >
                  <b-checkbox
                    v-for="(permission, index) in group.permissions"
                    :key="`per_${index}`"
                    v-model="form.permissions"
                    v-validate="{ required: true }"
                    :native-value="permission.id"
                    type="checkbox"
                    name="permissions"
                  >
                    {{ permission[currentLocale].display_name }}
                  </b-checkbox>
                </b-field>
                <span v-show="errors.has('permissions')" class="text-error text-sm">
                  {{ errors.first("permissions") }}
                </span>
              </card-component>
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
