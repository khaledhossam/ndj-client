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
                v-model="form.en.name"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'en.name\']')"
                name="en.name"
                :class="{ 'is-invalid': errors.has('en.name') }"
              />
              <span v-show="errors.has('en.name')" class="text-error text-sm">
                {{ errors.first("en.name") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.ar.name"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'ar.name\']')"
                name="ar.name"
                :class="{ 'is-invalid': errors.has('ar.name') }"
              />
              <span v-show="errors.has('ar.name')" class="text-error text-sm">
                {{ errors.first("ar.name") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
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
                :class="{ 'is-invalid': errors.has('categories') }"
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
              <span v-show="errors.has('categories')" class="text-error text-sm">
                {{ errors.first("categories") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
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
                :disabled="param_id ? true : false"
                @change="changePropertyType"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
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
              <span :v-if="param_id">{{ $t('admin.property_type_disable') }}</span>
              <span v-show="errors.has('property_type_id')" class="text-error text-sm">
                {{ errors.first("property_type_id") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <card-component v-if="form.has_options" :title="$t('admin.options')" icon="ballot-outline">
                <b-field v-for="(option, key) in form.options" :key="key" label="" horizontal>
                  <b-field>
                    <b-input
                      v-model="option.en.name"
                      v-validate="{ required: true }"
                      type="text"
                      :placeholder="$t('admin[\'en.name\']')"
                      :name="`en.name.${key}`"
                    />
                    <span v-show="errors.has(`en.name.${key}`)" class="text-error text-sm">
                      {{ errors.first(`en.name.${key}`) }}
                    </span>
                  </b-field>
                  <b-field>
                    <b-input
                      v-model="option.ar.name"
                      v-validate="{ required: true }"
                      type="text"
                      :placeholder="$t('admin[\'ar.name\']')"
                      :name="`ar.name.${key}`"
                    />
                    <span v-show="errors.has(`ar.name.${key}`)" class="text-error text-sm">
                      {{ errors.first(`ar.name.${key}`) }}
                    </span>
                  </b-field>
                  <span class="mdi mdi-trash-can-outline text-danger mdi-24px cursor" @click="removeOption(key)" />
                </b-field>
                <b-field class="text-center">
                  <span class="mdi mdi-plus-circle-outline fa-3x text-success mdi-24px cursor" @click="addOption" />
                </b-field>
              </card-component>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <b-field :label="$t('admin.required')" horizontal>
                <b-switch v-model="form.is_required" />
              </b-field>
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
