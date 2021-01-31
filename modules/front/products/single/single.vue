<template>
    <div>
      <section>
          <div class="container">
              <div class="row ">
                  <!-- breadcrumb -->
                  <div class="col-12">
                      <nav aria-label="breadcrumb">
                          <ol class="breadcrumb">
                              <li class="breadcrumb-item">
                                <nuxt-link :to="{ name: 'home' }">
                                  {{ $t('front.home') }}
                                </nuxt-link>
                              </li>
                              <li class="breadcrumb-item">
                                <nuxt-link :to="{ name: 'category.products', params: { id: product.category.id } }">
                                  {{ product.category.name || ''}}
                                </nuxt-link>
                              </li>
                              <li class="breadcrumb-item">
                                <nuxt-link :to="{ name: 'subcategory.products', params: { id: product.subcategory.id } }">
                                  {{ product.subcategory.name || '' }}
                                </nuxt-link>
                              </li>
                              <li class="breadcrumb-item active">
                                  {{ product.name }}
                              </li>
                          </ol>
                      </nav>
                  </div>
                  <!-- product slide -->
                  <div class="col-lg-8">
                      <div class="prod-slide">
                          <!-- ninja-slider -->
                          <div id="ninja-slider">
                              <div class="slider-inner">
                                  <ul>
                                    <VueSlickCarousel v-bind="settings" class="cats nowrap">
                                      <li>
                                        <a class="ns-img" :href="product.primary_attachment.file"></a>
                                      </li>
                                      <li v-for="(attachment, key) in product.attachments" :key="key">
                                        <a class="ns-img" :href="attachment.file"></a>
                                      </li>
                                    </VueSlickCarousel>
                                  </ul>
                                  <div class="fs-icon" title="Expand/Close"></div>
                              </div>
                          </div>
                          <!-- thumbnail-slider -->
                          <div id="thumbnail-slider">
                              <div class="inner">
                                  <ul>
                                    <VueSlickCarousel v-bind="settings" class="cats nowrap">
                                      <li>
                                        <a class="ns-img" :href="product.primary_attachment.file"></a>
                                      </li>
                                      <li v-for="(attachment, key) in product.attachments" :key="key">
                                        <a class="ns-img" :href="attachment.file"></a>
                                      </li>
                                    </VueSlickCarousel>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- product info -->
                  <div class="col-lg-4">
                      <div class="prod-info">
                          <h2 class="prod-title">
                            {{ product.name }}
                          </h2>
                          <h5 v-if="product.discount" class="prod-info-item">
                              <span>: {{ $t('front.before') }}</span>
                              <span>
                                  <div class="old-price">
                                      <span>{{product.price_after_tax}}</span>
                                      <span>{{$t('front.riyal')}}</span>
                                  </div>
                              </span>
                          </h5>
                          <h5 class="prod-info-item">
                              <span>: {{$t('front.now')}}</span>
                              <span>
                                  <div class="price">
                                      <span>{{product.price_after_discount}}</span>
                                      <span>{{$t('front.riyal')}}</span>
                                  </div>
                              </span>
                              <span class="prod-info-note">({{$t('front.include_tax')}})</span>
                          </h5>
                          <h5 v-if="product.discount" class="prod-info-item">
                              <span>: {{$t('front.saved')}}</span>
                              <span>
                                  <div class="prod-saving">
                                      <div class="save-price">
                                        <span>{{discountValue}}</span>
                                        <span>{{$t('front.riyal')}}</span>
                                      </div>
                                      <div class="prod-info-discount">{{product.discount}}% {{$t('front.off')}}</div>
                                  </div>
                              </span>
                          </h5>
                          <h5 class="prod-info-item">
                              <span>: {{$t('front.category')}}</span>
                              <span>
                                <nuxt-link :to="{ name: 'category.products', params: { id: product.category.id } }">
                                  {{ product.category.name }}
                                </nuxt-link>
                              </span>
                          </h5>
                          <h5 class="prod-info-item">
                              <span>: {{$t('front.subcategory')}}</span>
                              <span>
                                <nuxt-link :to="{ name: 'subcategory.products', params: { id: product.subcategory.id } }">
                                  {{ product.subcategory.name }}
                                </nuxt-link>
                              </span>
                          </h5>
                          <h5 v-for="(option, key) in dynamicOptions" :key="key" class="prod-info-item">
                              <span>: {{ option.property.name }}</span>
                              <span>
                                  <select class="form-control" @change="selectedDynamicProps($event.target.value, key)">
                                      <option
                                        v-for="(obj, index) in option.value"
                                        :key="`${key}opt${index}`"
                                        :value="obj.id"
                                      >
                                        {{ obj.name }}
                                      </option>
                                  </select>
                              </span>
                          </h5>
                          <h5 class="prod-info-item">
                              <span>: {{$t('front.quantity')}}</span>
                              <span>
                                  <b-numberinput type="is-light" :min="1" :placeholder="1" v-model="cart.quantity"></b-numberinput>
                              </span>
                          </h5>
                      </div>
                      <div><a class="btn defualt" @click="addToCart">
                              <span>{{$t('front.add_to_cart')}}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="21.616" height="19.824"
                                  viewBox="0 0 21.616 19.824">
                                  <g id="shopping_cart-1" data-name="shopping cart-1" transform="translate(0 0)">
                                      <path id="Path_1567" data-name="Path 1567"
                                          d="M15.574,13.906H8.514a3.85,3.85,0,0,1-3.773-3.1l-1.1-5.629V5.145L3.354,3.623a2.009,2.009,0,0,0-1.57-1.588L.716,1.83A.924.924,0,0,1,1.082.018L2.158.241A3.835,3.835,0,0,1,5.151,3.293l.154.8h15.37a.915.915,0,0,1,.754.4.9.9,0,0,1,.1.845l-2.364,6.119A3.868,3.868,0,0,1,15.574,13.906Zm-9.918-8,.882,4.553a2.013,2.013,0,0,0,1.976,1.621h7.059a2.024,2.024,0,0,0,1.881-1.292l1.877-4.893Z"
                                          transform="translate(0.025 0)" fill="#f9f6f6" />
                                      <ellipse id="Ellipse_46" data-name="Ellipse 46" cx="1.83" cy="1.83" rx="1.83"
                                          ry="1.83" transform="translate(13.667 16.165)" fill="#f9f6f6" />
                                      <ellipse id="Ellipse_47" data-name="Ellipse 47" cx="1.83" cy="1.83" rx="1.83"
                                          ry="1.83" transform="translate(6.48 16.165)" fill="#f9f6f6" />
                                  </g>
                              </svg>
                          </a>
                      </div>
                      <div class="prod-share">
                          <h5 class="share-title">
                            {{ $t('front.share_by') }}
                          </h5>
                          <div class="share-links">
                              <!-- <a href="#"><i class="fab fa-instagram"></i></a>
                              <a href="#"><i class="fab fa-twitter"></i></a> -->
                              <!-- <a href="#"><i class="fab fa-facebook-f"></i></a> -->
                              <!-- <ShareNetwork
                                network="whatsapp"
                                :url="$route.path"
                                :title="product.name"
                                :description="product.description"
                                :hashtags="product.tags.join()"
                              >
                                <i class="fab fa-whatsapp"></i>
                              </ShareNetwork> -->
                              <ShareNetwork
                                network="whatsapp"
                                :url="urlLink"
                                :title="product.name"
                                :description="product.description"
                                :hashtags="product.tags.join()"
                              >
                                <i class="fab fa-whatsapp"></i>
                              </ShareNetwork>
                              <ShareNetwork
                                network="twitter"
                                :url="urlLink"
                                :title="product.name"
                                :description="product.description"
                                :hashtags="product.tags.join()"
                              >
                                <i class="fab fa-twitter"></i>
                              </ShareNetwork>
                              <ShareNetwork
                                network="facebook"
                                :url="urlLink"
                                :title="product.name"
                                :description="product.description"
                                :hashtags="product.tags.join()"
                              >
                                <i class="fab fa-facebook-f"></i>
                              </ShareNetwork>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="bg-color">
          <div class="container">
              <div class="row" v-if="product.similar_products.length">
                  <div class="col head-sec">
                      <div class="sec-title">
                          <h2 class="title">{{ $t('front.be_liked') }}</h2>
                      </div>
                  </div>
              </div>
              <!-- products -->
              <div class="row products nowrap">
                <!-- item -->
                <product-block
                  v-for="(product, key) in product.similar_products"
                  :key="key"
                  :product="product"
                  :gridClass="'col-6 col-lg-3'"
                />
                <!-- item -->
              </div>
              <!-- other-info text -->
              <div class="other-info">
                  <h5 class="title">
                    {{ $t('front.description') }}
                  </h5>
                  <div class="text">
                      <p>
                        {{ product.description }}
                      </p>
                  </div>
              </div>
              <!-- other-info text -->
              <div class="other-info">
                  <h5 class="title">
                    {{ $t('front.dynamic_properties') }}
                  </h5>
                  <div class="text">
                      <div class="prod-info">
                        <h5 v-for="(option, key) in dynamicFields" :key="key" class="prod-info-item">
                            <span>: {{ option.property.name }}</span>
                            <span>
                                <div class="bg-light p-2">
                                    <span>{{ option.value }}</span>
                                </div>
                            </span>
                        </h5>
                      </div>
                  </div>
              </div>
              <!-- rate -->
              <div class="rating">
                  <h5 class="title">
                    {{ $t('front.ratings') }}
                  </h5>
                  <div class="rateing-wrapper">
                      <div class="review">
                          <div class="info">
                              <h5 class="title">{{$t('front.general_classification')}}</h5>
                              <div class="total">{{product.rate}}</div>
                              <div class="stars ">
                                  <i v-for="index in totalRate" :key="index" class="fas fa-star yellow"></i>
                                  <i v-for="index in (5 - totalRate)" :key="index" class="fas fa-star"></i>
                              </div>
                              <small>
                                {{ product.rating_users_no }} {{ $t('front.rating') }}
                              </small>
                          </div>
                          <div class="total-details">
                              <ul>
                                  <li v-for="(rating, key) in product.rating_statistics" :key="key">
                                      <span>{{rating.rate}}</span>
                                      <span class="bar">
                                          <span :style="`width: ${rating.rate / 100}%;`"></span>
                                      </span>
                                      <span>{{rating.users_no}}</span>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <!-- comments -->
                      <div class="comments">
                        <div class="comment" v-for="(rating, key) in ratings" :key="key">
                            <div class="img"><img :src="rating.user.avatar" :alt="rating.user.name"></div>
                            <div class="stars">
                                <i v-for="index in rating.rate" :key="index" class="fas fa-star yellow"></i>
                                <i v-for="index in 5 - rating.rate" :key="index" class="fas fa-star"></i>
                                <span class="percent">{{rating.rate}}</span>
                            </div>
                            <h5 class="commentator">{{rating.user.name}}</h5>
                            <div class="text">
                              {{ rating.comment }}
                            </div>
                        </div>
                        <b-button class="load-more" v-if="enableLoadMore" @click="loadMoreRatings">
                          {{ $t('front.load_more') }}
                        </b-button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
</template>

<script src="./single.js" ></script>
<style lang="scss" scoped src="./single.scss"></style>

