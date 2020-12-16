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

          <b-field :label="$t('admin.categories')" horizontal>
            <v-autocomplete
              v-model="form.categories"
              v-validate="{ required: true }"
              :items="categories"
              :menu-props="{ maxHeight: '400' }"
              :label="$t('admin.select')"
              multiple
              item-text="name"
              :item-value="'id'"
              name="categories"
              persistent-hint
              chips
              small-chips
            >
              <template v-slot:prepend-item>
                <v-list-item
                  ripple
                  @click="toggle"
                >
                  <v-list-item-action>
                    <v-icon :color="categories.length ? 'indigo darken-4' : ''">
                      {{ icon }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $t('admin.select_all') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2" />
              </template>

              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="removeSelect(form.categories, data.item)"
                >
                  {{ data.item[currentLocale].name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <v-list-item-content>
                  <v-list-item-title v-text="data.item[currentLocale].name" />
                </v-list-item-content>
              </template>
            </v-autocomplete>
            <p v-show="errors.has('categories')" class="text-danger text-sm">
              {{ errors.first("categories") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.property_type_id')" horizontal>
            <v-autocomplete
              v-model="form.property_type_id"
              v-validate="{ required: true }"
              :items="propertyTypes"
              :menu-props="{ maxHeight: '400' }"
              :label="$t('admin.select')"
              item-text="name"
              :item-value="'id'"
              name="property_type_id"
              persistent-hint
              chips
              small-chips
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="removeSelect(form.propertyTypes, data.item)"
                >
                  {{ data.item[currentLocale].name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <v-list-item-content>
                  <v-list-item-title v-text="data.item[currentLocale].name" />
                </v-list-item-content>
              </template>
            </v-autocomplete>
            <p v-show="errors.has('property_type_id')" class="text-danger text-sm">
              {{ errors.first("property_type_id") }}
            </p>
          </b-field>

          <card-component v-if="form.options.length" :title="$t('admin.options')" icon="ballot-outline">
            <b-field v-for="(option, key) in form.options" :key="key" label="" horizontal>
              <b-field>
                <b-input
                  v-model="option.en.name"
                  :placeholder="$t('admin[\'en.name\']')"
                  name="en.name"
                />
              </b-field>
              <b-field>
                <b-input
                  v-model="form.ar.name"
                  type="text"
                  :placeholder="$t('admin[\'ar.name\']')"
                  name="ar.name"
                />
              </b-field>
              <span class="mdi mdi-trash-can-outline text-danger mdi-24px cursor" />
            </b-field>
            <b-field class="text-center">
              <span class="mdi mdi-plus-circle-outline fa-3x text-success mdi-24px cursor" />
            </b-field>
          </card-component>
          <hr>

          <hr>
          <b-field :label="$t('admin.required')" horizontal>
            <b-switch v-model="form.is_required" />
          </b-field>

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