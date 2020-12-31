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
              :label="$t('admin.offerType')"
            >
              <v-select
                v-model="form.type"
                v-validate="'required'"
                :items="offerTypes"
                :label="$t('admin.offerType')"
                name="type"
                item-text="name"
                :item-value="'key'"
                :class="{ 'is-invalid': errors.has('type') }"
                @change="changeOfferType"
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
              <span v-show="errors.has('type')" class="text-error text-sm">
                {{ errors.first('type') }}
              </span>
            </v-col>

            <v-col
              v-if="form.type == 'percentage'"
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.value"
                v-validate="{ required: true, decimal: 2, max_value: 100, min_value: 0 }"
                :label="$t('admin.value')"
                name="value"
                suffix="%"
                :class="{ 'is-invalid': errors.has('value') }"
              />
              <span v-show="errors.has('value')" class="text-error text-sm">
                {{ errors.first("value") }}
              </span>
            </v-col>

            <v-col
              v-else-if="form.type == 'value'"
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.value"
                v-validate="{ required: true, decimal: 2, min_value: 0 }"
                :label="$t('admin.value')"
                name="value"
                :class="{ 'is-invalid': errors.has('value') }"
              />
              <span v-show="errors.has('value')" class="text-error text-sm">
                {{ errors.first("value") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <div class="control">
                <b-button
                  v-model="form.products"
                  type="is-primary"
                  icon-left="plus"
                  name="products"
                  @click="openModalOfferProducts"
                >
                  {{ $t('admin.products') }}
                </b-button>
              </div>
              <span v-show="errors.has('products')" class="text-error text-sm">
                {{ errors.first("products") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-menu
                v-model="start_date"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.start_date"
                    v-validate="'required'"
                    :value="computedDateFormattedMomentjs"
                    name="start_date"
                    :class="{ 'is-invalid': errors.has('start_date') }"
                    clearable
                    :label="$t('admin.start_date')"
                    readonly
                    v-bind="attrs"
                    prepend-icon="mdi-calendar"
                    v-on="on"
                    @click:clear="form.start_date = null"
                  />
                </template>
                <v-date-picker
                  v-model="form.start_date"
                  @change="start_date = false"
                />
              </v-menu>
              <span v-show="errors.has(`start_date`)" class="text-error text-sm">
                {{ errors.first(`start_date`) }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-menu
                v-model="end_date"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.end_date"
                    v-validate="'required'"
                    :value="computedDateFormattedMomentjs"
                    name="end_date"
                    :class="{ 'is-invalid': errors.has('end_date') }"
                    clearable
                    :label="$t('admin.end_date')"
                    readonly
                    v-bind="attrs"
                    prepend-icon="mdi-calendar"
                    v-on="on"
                    @click:clear="form.end_date = null"
                  />
                </template>
                <v-date-picker
                  v-model="form.end_date"
                  @change="end_date = false"
                />
              </v-menu>
              <span v-show="errors.has(`end_date`)" class="text-error text-sm">
                {{ errors.first(`end_date`) }}
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
        <offer-products />
      </card-component>
    </section>
  </div>
</template>

<script src="./create.js"></script>
