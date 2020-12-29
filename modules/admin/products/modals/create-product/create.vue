<template>
  <div id="app" data-app>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component :title="titleBar" icon="ballot">
        <v-stepper v-model="stepper">
          <v-stepper-header>
            <v-stepper-step
              :complete="stepper > 1"
              step="1"
            >
              Name of step 1
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="stepper > 2"
              step="2"
            >
              Name of step 2
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              Name of step 3
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">

              <v-form @submit.prevent="firstStep" data-vv-scope="firstStep">
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
                    <v-textarea
                      v-model="form.en.description"
                      v-validate="{ required: true }"
                      :label="$t('admin[\'en.description\']')"
                      name="en.description"
                      :class="{ 'is-invalid': errors.has('en.description') }"
                    ></v-textarea>
                    <span v-show="errors.has('en.description')" class="text-error text-sm">
                      {{ errors.first("en.description") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-flex xs12>
                      <v-combobox
                        v-model="form.en.tags"
                        multiple
                        :label="$t('admin[\'en.tags\']')"
                        append-icon
                        chips
                        deletable-chips
                        class="tag-input"
                        :search-input.sync="syncEnTags"
                        @keyup.tab="updateTags(form.en.tags, syncEnTags)"
                        @paste="updateTags(form.en.tags, syncEnTags)"
                      />
                    </v-flex>
                    <span v-show="errors.has('en.tags')" class="text-error text-sm">
                      {{ errors.first("en.tags") }}
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
                    >
                    </v-text-field>
                    <span v-show="errors.has('ar.name')" class="text-error text-sm">
                      {{ errors.first("ar.name") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-textarea
                      v-model="form.ar.description"
                      v-validate="{ required: true }"
                      :label="$t('admin[\'ar.description\']')"
                      name="ar.description"
                      :class="{ 'is-invalid': errors.has('en.description') }"
                    ></v-textarea>
                    <span v-show="errors.has('ar.description')" class="text-error text-sm">
                      {{ errors.first("ar.description") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-flex xs12>
                      <v-combobox
                        v-model="form.ar.tags"
                        multiple
                        :label="$t('admin[\'ar.tags\']')"
                        append-icon
                        chips
                        deletable-chips
                        class="tag-input"
                        :search-input.sync="syncEnTags"
                        @keyup.tab="updateTags(form.ar.tags, syncEnTags)"
                        @paste="updateTags(form.ar.tags, syncEnTags)"
                      />
                    </v-flex>
                    <span v-show="errors.has('ar.tags')" class="text-error text-sm">
                      {{ errors.first("ar.tags") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="form.price"
                      v-validate="{ required: true, decimal:3 }"
                      :label="$t('admin.price')"
                      name="price"
                      :class="{ 'is-invalid': errors.has('price') }"
                    >
                    </v-text-field>
                    <span v-show="errors.has('price')" class="text-error text-sm">
                      {{ errors.first("price") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="form.quantity"
                      v-validate="{ required: true, numeric:true }"
                      :label="$t('admin.quantity')"
                      name="quantity"
                      :class="{ 'is-invalid': errors.has('quantity') }"
                    >
                    </v-text-field>
                    <span v-show="errors.has('quantity')" class="text-error text-sm">
                      {{ errors.first("quantity") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="form.max_purchase_quantity"
                      v-validate="'required|numeric|max_value:' + form.quantity"
                      :label="$t('admin.max_purchase_quantity')"
                      name="max_purchase_quantity"
                      :class="{ 'is-invalid': errors.has('max_purchase_quantity') }"
                    >
                    </v-text-field>
                    <span v-show="errors.has('max_purchase_quantity')" class="text-error text-sm">
                      {{ errors.first("max_purchase_quantity") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-text-field
                      v-model="form.barcode"
                      v-validate="{ required: true, numeric:true }"
                      :label="$t('admin.barcode')"
                      name="barcode"
                      :class="{ 'is-invalid': errors.has('barcode') }"
                    >
                    </v-text-field>
                    <span v-show="errors.has('barcode')" class="text-error text-sm">
                      {{ errors.first("barcode") }}
                    </span>
                  </v-col>

                </v-row>

                <v-col
                  cols="12"
                  md="9"
                >
                  <b-field grouped>
                    <div class="control">
                      <b-button
                        native-type="submit"
                        type="is-primary"
                      >
                        {{ $t('admin.next') }}
                      </b-button>
                    </div>
                  </b-field>
                </v-col>
              </v-form>

            </v-stepper-content>

            <v-stepper-content step="2">
              <v-form @submit.prevent="secondStep" data-vv-scope="secondStep">
                <v-row>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-autocomplete
                      v-model="form.brand_id"
                      v-validate="{ required: true }"
                      :items="brands"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('admin.brand')"
                      item-text="name"
                      :item-value="'id'"
                      name="brand_id"
                      persistent-hint
                      chips
                      small-chips
                      :class="{ 'is-invalid': errors.has('brand_id') }"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          @click="data.select"
                          @click:close="removeSelectItem(form.brand_id, data.item)"
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
                    <span v-show="errors.has('brand_id')" class="text-error text-sm">
                      {{ errors.first("brand_id") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-autocomplete
                      v-model="form.category_id"
                      v-validate="{ required: true }"
                      :items="categories"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('admin.category')"
                      item-text="name"
                      :item-value="'id'"
                      name="category_id"
                      persistent-hint
                      chips
                      small-chips
                      @change="changeCategory"
                      :class="{ 'is-invalid': errors.has('category_id') }"
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
                    <span v-show="errors.has('category_id')" class="text-error text-sm">
                      {{ errors.first("category_id") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-autocomplete
                      v-model="form.subcategory_id"
                      v-validate="{ required: true }"
                      :items="subcategories"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('admin.subcategory')"
                      item-text="name"
                      :item-value="'id'"
                      name="subcategory_id"
                      persistent-hint
                      chips
                      small-chips
                      :class="{ 'is-invalid': errors.has('subcategory_id') }"
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
                    <span v-show="errors.has('subcategory_id')" class="text-error text-sm">
                      {{ errors.first("subcategory_id") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <category-properties v-if="properties.length" :properties="properties" />
                  </v-col>

                </v-row>

                <v-col
                  cols="12"
                  md="9"
                >
                  <b-field grouped>
                    <div class="control">
                      <b-button
                        native-type="submit"
                        type="is-primary"
                      >
                        {{ $t('admin.next') }}
                      </b-button>
                    </div>
                    <div class="control">
                      <b-button
                        type="is-primary is-outlined"
                        @click="stepper = 1"
                      >
                        {{ $t('admin.previous') }}
                      </b-button>
                    </div>
                  </b-field>
                </v-col>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="3">

              <v-form @submit.prevent="submit" @reset="handleReset()" lazy-validation>
                <v-row>
                  <v-col
                    cols="12"
                    md="9"
                  >
                    <b-field :label="$t('admin.is_unique')" horizontal>
                      <b-switch v-model="form.is_unique" @input="toggleUnique" />
                    </b-field>
                  </v-col>

                  <v-col
                    v-if="!form.is_unique"
                    cols="12"
                    md="9"
                  >
                    <v-autocomplete
                      v-model="form.stores"
                      v-validate="{ required: true }"
                      :items="stores"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('admin.stores')"
                      multiple
                      item-text="name"
                      :item-value="'store_id'"
                      name="stores"
                      persistent-hint
                      chips
                      small-chips
                      :class="{ 'is-invalid': errors.has('stores') }"
                    >
                      <template v-slot:prepend-item>
                        <v-list-item
                          ripple
                          @click="toggleSelectAll(form.stores, stores)"
                        >
                          <v-list-item-action>
                            <v-icon :color="stores.length ? 'indigo darken-4' : ''">
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
                          @click:close="removeSelectItem(form.stores, data.item)"
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
                    <span v-show="errors.has('stores')" class="text-error text-sm">
                      {{ errors.first("stores") }}
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
                    <v-file-input
                      v-model="primary_attachment"
                      accept="image/*"
                      :label="$t('admin.primary_attachment')"
                      v-validate="{ required: true }"
                      name="primary_attachment"
                      @change="handleUploadFile"
                      small-chips
                      :class="{ 'is-invalid': errors.has('primary_attachment') }"
                    ></v-file-input>
                    <a v-if="form.primary_attachment.file" :href="form.primary_attachment.file" target="_blank">
                      <v-img
                        :lazy-src="form.primary_attachment.file"
                        :src="form.primary_attachment.file"
                        max-height="130"
                        max-width="180"
                        class="img-thumbnail"
                      />
                    </a>

                    <span v-show="errors.has('primary_attachment')" class="text-error text-sm">
                      {{ errors.first("primary_attachment") }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    md="9"
                  >
                    <v-file-input
                      accept="image/*"
                      :label="$t('admin.secondary_attachments')"
                      name="secondary_attachments"
                      multiple
                      @change="handleUploadFile"
                      small-chips
                      :class="{ 'is-invalid': errors.has('secondary_attachments') }"
                    ></v-file-input>
                    <v-row>
                      <v-col cols="12" md="4" v-for="(attachment, index) in form.attachments" :key="index" class="img-wrap">
                        <span class="mdi mdi-trash-can-outline text-danger mdi-24px cursor delete-file" @click="deleteFile(index)" />
                        <a :href="attachment.file" target="_blank">
                          <v-img
                            :lazy-src="attachment.file"
                            :src="attachment.file"
                            max-height="130"
                            max-width="180"
                            class="img-thumbnail img-fluid"
                          />
                        </a>
                    </v-col>
                    </v-row>
                    <span v-show="errors.has('secondary_attachments')" class="text-error text-sm">
                      {{ errors.first("secondary_attachments") }}
                    </span>
                  </v-col>

                </v-row>

                <v-col
                  cols="12"
                  md="9"
                >
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
                        @click="stepper = 2"
                      >
                        {{ $t('admin.previous') }}
                      </b-button>
                    </div>
                  </b-field>
                </v-col>
              </v-form>

            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </card-component>
    </section>
  </div>
</template>

<script src="./create.js"></script>
<style lang="scss" scoped src="./create.scss"></style>
