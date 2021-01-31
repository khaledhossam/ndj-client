<template>
  <div>
    <meta-tag :title="title" />
    <section v-if="metaData.total" class="bg-color">
      <div class="container">
          <div class="row">
              <!-- breadcrumb -->
              <div class="col-12">
                  <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                          <li class="breadcrumb-item">
                            <nuxt-link :to="{ name: 'home' }">
                              {{$t('front.home')}}
                            </nuxt-link>
                          </li>
                          <li class="breadcrumb-item active">
                            {{$t('front.carts')}}
                          </li>
                      </ol>
                  </nav>
              </div>
              <div class="col-12 head-sec">
                  <div class="sec-title">
                      <h2 class="title">
                          {{$t('front.carts')}}
                          <small>({{metaData.total}}) {{$t('front.products')}}</small>
                      </h2>
                  </div>
              </div>
              <div class="col-lg-8">
                  <div class="cart-wrapper products list">
                      <ul class="cart-list">
                          <li class="item" v-for="(item, key) in carts" :key="key">
                              <div class="img"><img :src="item.product.primary_attachment.file" :alt="item.product.name"></div>
                              <div class="content">
                                  <h4 class="title">
                                      <nuxt-link :to="{ name: 'products.single', params: { id: item.product.id} }">
                                        {{item.product.name}}
                                      </nuxt-link>
                                  </h4>
                                  <div class="price">
                                      <span>{{ item.product.price_after_discount }}</span>
                                      <span>{{$t('front.riyal')}}</span>
                                  </div>
                                  <div class="old-price" v-if="item.product.discount">
                                      <span>{{item.product.price_after_tax}}</span>
                                      <span>{{$t('front.riyal')}}</span>
                                  </div>
                                  <div>
                                    <b-numberinput type="is-light" :min="1" :placeholder="1"
                                    v-model="item.quantity" @input="debouncedItemQty(item)"></b-numberinput>
                                  </div>
                                  <div>
                                      <span class="mdi mdi-trash-can-outline text-danger mdi-24px cursor"
                                          @click="deleteItem(item.product.id)" />
                                      <!-- <a @click="deleteItem(item.product.id)">
                                          <i class="fas fa-trash-alt"></i>
                                          <span>إزالة المنتج</span>
                                      </a> -->
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>
                  <v-row class="pagination">
                        <b-pagination
                          class="page-item"
                          :total="metaData.total"
                          :current="metaData.current_page"
                          :simple="false"
                          :per-page="metaData.per_page"
                          @change="onPageChange"
                        />
                    </v-row>
              </div>
              <div class="col-lg-4">
                  <div class="cart-wrapper">
                      <div v-if="isAuthenticated">
                        <h5 class="title">اضف البرومو كود</h5>
                        <v-form class="Promo-code"  @submit.prevent="submitDiscount">
                            <div class="form-group">
                                <input type="text" v-validate="{ required: true }"
                                  class="form-control border" name="discount" v-model="discount.code">
                                <span v-show="errors.has('discount')" class="text-error text-sm">
                                  {{ errors.first("discount") }}
                                </span>
                            </div>
                            <div class="row submit">
                                <div class="col-lg-6">
                                    <button type="submit" class="btn defualt">اضف </button>
                                </div>
                            </div>
                        </v-form>
                      </div>
                      <div class="cart-summary">
                          <h5 class="title">ملخص</h5>
                          <ul>
                              <li>
                                  <span>السعر ({{metaData.total}}) {{$t('front.products')}}</span>
                                  <span>{{subtotal}} {{$t('front.riyal')}}</span>
                              </li>
                              <li v-if="discount.value">
                                  <span>{{$t('front.discount')}}</span>
                                  <span>{{discountValue}} {{$t('front.riyal')}}</span>
                              </li>
                              <li v-if="discount.value" class="total">
                                  <span>الأجمالى</span>
                                  <span>{{total}} {{$t('front.riyal')}}</span>
                              </li>
                          </ul>
                          <div class="row">
                              <div class="col-6">
                                  <nuxt-link class="btn simple" :to="{ name: 'products' }">متابعة التسوق</nuxt-link>
                              </div>
                              <div class="col-6">
                                  <a class="btn defualt" href="#">الشراء الآن</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
    <section v-else class="bg-color">
        <div class="container">
            <div class="head-sec">
                <div class="sec-title">
                    <h2 class="title">
                        {{$t('front.carts')}}
                        <small>(0) {{$t('front.products')}}</small>
                    </h2>
                </div>
            </div>
            <div class="row justify-content-center text-center">
                <div class="col-12">
                    <div class="img"><img src="~/assets/front/images/img10.png" alt=""></div>
                    <div class="head-sec mt-5">
                        <div class="sec-title">
                            <h2 class="title">ليس لديك أي عناصر في عربة التسوق</h2>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 submit mb-5 mt-5">
                    <nuxt-link class="btn defualt" :to="{ name: 'products' }">متابعة للتسوق</nuxt-link>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script src="./index.js" ></script>
