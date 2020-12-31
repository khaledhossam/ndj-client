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
        <v-row v-if="products.length" class="group">
          <v-col
            v-for="(product, key) in products"
            :key="key"
            cols="12"
            md="4"
            class="item-product"
          >
            <section class="section is-main-section">
              <tiles>
                <card-component class="tile is-child">
                  <img :src="product.primary_attachment.file" :alt="product[currentLocale].name">
                  <hr>
                  <b-field>
                    <b-checkbox
                      v-model="selectedProducts"
                      v-validate="{ required: true }"
                      :native-value="product.id"
                      type="checkbox"
                      name="products"
                      :checked="selectedProducts.includes(product.id)"
                    />
                    <b-input :value="product[currentLocale].name" custom-class="is-static" readonly />
                  </b-field>
                </card-component>
              </tiles>
            </section>
          </v-col>
        </v-row>
        <v-row v-else>
          <span class="text-center">
            {{ $t('admin.no_products') }}
          </span>
        </v-row>
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
