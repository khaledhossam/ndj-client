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
              :label="$t('admin.categories')"
            >
              <v-select
                v-model="form.parent_id"
                v-validate="'required'"
                :items="categories"
                :label="$t('admin.categories')"
                name="parent_id"
                item-text="name"
                :item-value="'id'"
                :class="{ 'is-invalid': errors.has('parent_id') }"
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
              </v-select>
              <span v-show="errors.has('parent_id')" class="text-error text-sm">
                {{ errors.first('parent_id') }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.tax_percentage"
                v-validate="{ required: true, numeric: true, max_value: 100, min_value: 0 }"
                :label="$t('admin.tax_percentage')"
                name="tax_percentage"
                suffix="%"
                :class="{ 'is-invalid': errors.has('tax_percentage') }"
              />
              <span v-show="errors.has('tax_percentage')" class="text-error text-sm">
                {{ errors.first("tax_percentage") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-select
                v-model="form.order"
                v-validate="'required'"
                :items="orders"
                :label="$t('admin.orderSort')"
                name="orderSort"
                :class="{ 'is-invalid': errors.has('orderSort') }"
              />
              <span v-show="errors.has('orderSort')" class="text-error text-sm">
                {{ errors.first("orderSort") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-file-input
                v-model="image"
                v-validate="param_id ? '' : { required: true }"
                accept="image/*"
                :label="$t('admin.image')"
                name="image"
                :class="{ 'is-invalid': errors.has('image') }"
                small-chips
                @change="handleUploadFile"
              />

              <a v-if="form.image" :href="form.image" target="_blank">
                <v-img
                  :lazy-src="form.image"
                  :src="form.image"
                  max-height="100"
                  max-width="150"
                  class="img-fluid"
                />
              </a>

              <span v-show="errors.has('image')" class="text-error text-sm">
                {{ errors.first("image") }}
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
