<template>
  <div id="app" data-app>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component :title="titleBar" icon="ballot">
        <form @submit.prevent="submit" @reset="handleReset()">
          <b-field :label="$t('admin[\'en.name\']')" horizontal>
            <b-input
              v-model="form.en.name"
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

          <b-field :label="$t('admin[\'en.description\']')" horizontal>
            <v-textarea
              v-model="form.en.description"
              v-validate="{ required: true }"
              outlined
              :label="$t('admin[\'en.description\']')"
              name="en.description"
              value=""
            />
            <p v-show="errors.has('en.description')" class="text-danger text-sm">
              {{ errors.first("en.description") }}
            </p>
          </b-field>

          <b-field :label="$t('admin[\'en.tags\']')" horizontal>
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
            <p v-show="errors.has('en.tags')" class="text-danger text-sm">
              {{ errors.first("en.tags") }}
            </p>
          </b-field>

          <b-field :label="$t('admin[\'ar.name\']')" horizontal>
            <b-input
              v-model="form.ar.name"
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
          <hr>
          <b-field :label="$t('admin[\'ar.description\']')" horizontal>
            <v-textarea
              v-model="form.ar.description"
              v-validate="{ required: true }"
              outlined
              :label="$t('admin[\'ar.description\']')"
              name="ar.description"
              value=""
            />
            <p v-show="errors.has('ar.description')" class="text-danger text-sm">
              {{ errors.first("ar.description") }}
            </p>
          </b-field>

          <b-field :label="$t('admin[\'ar.tags\']')" horizontal>
            <v-flex xs12>
              <v-combobox
                v-model="form.ar.tags"
                multiple
                :label="$t('admin[\'ar.tags\']')"
                append-icon
                chips
                deletable-chips
                class="tag-input"
                :search-input.sync="syncArTags"
                @keyup.tab="updateTags(form.ar.tags, syncArTags)"
                @paste="updateTags(form.ar.tags, syncArTags)"
              />
            </v-flex>
            <p v-show="errors.has('ar.tags')" class="text-danger text-sm">
              {{ errors.first("ar.tags") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.price')" horizontal>
            <b-input
              v-model="form.price"
              v-validate="{ required: true, decimal:3 }"
              :placeholder="$t('admin.price')"
              name="price"
              :class="{ 'is-invalid': errors.has('price') }"
            />
            <p v-show="errors.has('price')" class="text-danger text-sm">
              {{ errors.first("price") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.quantity')" horizontal>
            <b-input
              v-model="form.quantity"
              v-validate="{ required: true, numeric:true }"
              :placeholder="$t('admin.quantity')"
              name="quantity"
              :class="{ 'is-invalid': errors.has('quantity') }"
            />
            <p v-show="errors.has('quantity')" class="text-danger text-sm">
              {{ errors.first("quantity") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.max_purchase_quantity')" horizontal>
            <b-input
              v-model="form.max_purchase_quantity"
              v-validate="'numeric|max_value:' + form.quantity"
              :placeholder="$t('admin.max_purchase_quantity')"
              name="max_purchase_quantity"
              :class="{ 'is-invalid': errors.has('max_purchase_quantity') }"
            />
            <p v-show="errors.has('max_purchase_quantity')" class="text-danger text-sm">
              {{ errors.first("max_purchase_quantity") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.category')" horizontal>
            <v-autocomplete
              v-model="form.category_id"
              v-validate="{ required: true }"
              :items="categories"
              :menu-props="{ maxHeight: '400' }"
              :label="$t('admin.select')"
              item-text="name"
              :item-value="'id'"
              name="category_id"
              persistent-hint
              chips
              small-chips
              @change="changeCategory"
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
            <p v-show="errors.has('category_id')" class="text-danger text-sm">
              {{ errors.first("category_id") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.subcategory')" horizontal>
            <v-autocomplete
              v-model="form.subcategory_id"
              v-validate="{ required: true }"
              :items="subcategories"
              :menu-props="{ maxHeight: '400' }"
              :label="$t('admin.select')"
              item-text="name"
              :item-value="'id'"
              name="subcategory_id"
              persistent-hint
              chips
              small-chips
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
            <p v-show="errors.has('subcategory_id')" class="text-danger text-sm">
              {{ errors.first("subcategory_id") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.brand')" horizontal>
            <v-autocomplete
              v-model="form.brand_id"
              v-validate="{ required: true }"
              :items="brands"
              :menu-props="{ maxHeight: '400' }"
              :label="$t('admin.select')"
              item-text="name"
              :item-value="'id'"
              name="brand_id"
              persistent-hint
              chips
              small-chips
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
            <p v-show="errors.has('brand_id')" class="text-danger text-sm">
              {{ errors.first("brand_id") }}
            </p>
          </b-field>

          <category-properties v-if="properties.length" :properties="properties" />

          <hr>
          <b-field :label="$t('admin.is_unique')" horizontal>
            <b-switch v-model="form.is_unique" @input="toggleUnique" />
          </b-field>
          <hr>

          <b-field v-if="!form.is_unique" :label="$t('admin.stores')" horizontal>
            <v-autocomplete
              v-model="form.stores"
              v-validate="{ required: true }"
              :items="stores"
              :menu-props="{ maxHeight: '400' }"
              :label="$t('admin.select')"
              multiple
              item-text="name"
              :item-value="'store_id'"
              name="stores"
              persistent-hint
              chips
              small-chips
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
            <p v-show="errors.has('stores')" class="text-danger text-sm">
              {{ errors.first("stores") }}
            </p>
          </b-field>

          <b-field :label="$t('admin.primary_attachment')" horizontal>
            <file-picker v-model="form.primary_attachment.file" />
          </b-field>

          <b-field :label="$t('admin.secondary_attachments')" horizontal>
            <file-picker v-model="form.attachments" :multiple="true" />
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
