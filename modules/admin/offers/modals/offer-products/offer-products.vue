<template>
  <modal
    v-if="modalProps"
    :adaptive="true"
    :height="modalProps.height"
    :width="modalProps.width"
    :min-height="modalProps.minHeight"
    :scrollable="modalProps.scrollable"
    name="offerProductsModal"
    :click-to-close="false"
  >
    <div slot="top-right">
      <b-button @click="hideModal">
        x
      </b-button>
    </div>
    <div class="vs-modal">
      <!--Modal Header-->
      <div class="modal-header">
        <h4>{{ $t('admin.products') }}</h4>
      </div>

      <!--Modal Body-->
      <div class="modal-body">
        <div v-if="products.length">
          <v-row>
            <v-text-field v-model="searchValue" prepend-icon="mdi-database-search" :placeholder="$t('admin.quick_search')" @input="debouncedNormalSearch" />
          </v-row>
          <v-row class="group">
            <v-col
              v-for="(product, key) in products"
              :key="key"
              cols="12"
              sm="4"
              class="item-product"
            >
              <section class="section is-main-section">
                <card-component class="tile is-child">
                  <div class="img-container">
                    <img :src="product.primary_attachment.file" :alt="product[currentLocale].name">
                  </div>
                  <hr>
                  <b-field>
                    <b-checkbox
                      v-if="inputType == 'checkbox'"
                      v-model="product_ids"
                      v-validate="{ required: true }"
                      :native-value="product.id"
                      type="checkbox"
                      :name="bindProp"
                      :checked="product_ids.includes(product.id)"
                      @input="toggleProducts(product)"
                    />
                    <b-radio
                      v-else
                      v-model="product_ids"
                      v-validate="{ required: true }"
                      :native-value="product.id"
                      type="radio"
                      :checked="product_ids == product.id"
                      @change="toggleProducts"
                    />
                    <b-input :value="product[currentLocale].name" custom-class="is-static" readonly />
                  </b-field>
                </card-component>
              </section>
            </v-col>
          </v-row>
          <v-row>
            <b-pagination
              :total="total"
              :current="page"
              :simple="false"
              :per-page="perPage"
              @change="onPageChange"
            />
          </v-row>
        </div>
        <div v-else class="alert alert-info">
          <span class="text-center">
            {{ $t('admin.no_products') }}
          </span>
        </div>
      </div>

      <!--Modal Footer-->
      <div class="modal-footer">
        <v-col
          cols="12"
          md="9"
        >
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button
                  type="is-primary"
                  @click="saveProducts"
                >
                  {{ $t('admin.save') }}
                </b-button>
              </div>
              <div class="control">
                <b-button
                  type="is-primary is-outlined"
                  @click="hideModal"
                >
                  {{ $t('admin.cancel') }}
                </b-button>
              </div>
            </b-field>
          </b-field>
        </v-col>
      </div>
    </div>
  </modal>
</template>

<script src="./offer-products.js"></script>
<style lang="scss" scoped src="./offer-products.scss"></style>
