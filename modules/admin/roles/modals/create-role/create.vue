<template>
  <div id="app" data-app>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component :title="titleBar" icon="ballot">
        <form @submit.prevent="submit" @reset="handleReset()">
          <b-field :label="$t('admin[\'en.name\']')" horizontal>
            <b-input
              v-model="form.en.display_name"
              v-validate="{ required: true, max: 150 }"
              icon="account"
              :placeholder="$t('admin[\'en.name\']')"
              name="en.name"
              :class="{ 'is-invalid': errors.has('en.name') }"
            />
            <p v-show="errors.has('en.name')" class="text-danger text-sm">
              {{ errors.first("en.name") }}
            </p>
          </b-field>

          <b-field :label="$t('admin[\'ar.name\']')" horizontal>
            <b-input
              v-model="form.ar.display_name"
              v-validate="{ required: true, max: 150 }"
              icon="account"
              :placeholder="$t('admin[\'ar.name\']')"
              name="ar.name"
              :class="{ 'is-invalid': errors.has('ar.name') }"
            />
            <p v-show="errors.has('ar.name')" class="text-danger text-sm">
              {{ errors.first("ar.name") }}
            </p>
          </b-field>
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
            <p v-show="errors.has('permissions')" class="text-danger text-sm">
              {{ errors.first("permissions") }}
            </p>
          </card-component>
          <hr>
          <b-field :label="$t('admin.status')" horizontal>
            <b-switch v-model="form.is_active" />
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
