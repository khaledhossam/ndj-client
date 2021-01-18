<template>
  <div>
    <meta-tag :title="title" />
    <app-slider :ads="ads" />
    <!-- categories -->
    <section>
        <div class="container">
          <VueSlickCarousel v-bind="settings" class="cats nowrap">
            <div v-for="(category, key) in categories" :key="key" class="cat">
                <div class="img">
                    <img :src="category.image" :alt="category.name">
                </div>
                <a href="#">
                  {{ category.name }}
                </a>
            </div>
          </VueSlickCarousel>
        </div>
    </section>
    <!-- section -->
    <section>
        <div class="container">
            <div class="row">
                <div class="col head-sec">
                    <div class="sec-title">
                        <h2 class="title">
                          {{ $t('front.suggested') }}
                        </h2>
                    </div>
                    <a class="btn more" href="#">
                      {{ $t('front.display_all') }}
                    </a>
                </div>
            </div>
            <!-- products -->
            <div class="row products nowrap">
                <!-- item -->
                <product-item
                  v-for="(suggestion, key) in suggestions"
                  :key="key"
                  :product="suggestion"
                  :gridClass="'col-6 col-lg-3'"
                />
                <!-- item -->
            </div>
        </div>
    </section>
    <!-- section -->
    <section class="img-offer">
        <a href="#">
            <img src="~/assets/front/images/img1.png" alt="">
        </a>
    </section>
    <!-- section -->
    <section v-if="firstCatProducts.length" class="bg-color">
        <div class="container">
            <div class="row">
                <div class="col head-sec">
                    <div class="sec-title">
                        <h2 class="title">
                          {{ firstCategory.name}}
                        </h2>
                    </div>
                    <a class="btn more" href="#">
                      {{ $t('front.display_all') }}
                    </a>
                </div>
            </div>
            <!-- products -->
            <div class="row products nowrap">
                <!-- item -->
                <product-item
                  v-for="(product, key) in firstCatProducts"
                  :key="key"
                  :product="product"
                  :gridClass="'col-6 col-lg-3'"
                />
                <!-- item -->
            </div>
        </div>
    </section>
    <!-- section -->
    <section v-if="secondCatProducts.length" class="bg-color">
        <div class="container">
            <div class="row">
                <div class="col head-sec">
                    <div class="sec-title">
                        <h2 class="title">
                          {{ secondCategory.name}}
                        </h2>
                    </div>
                    <a class="btn more" href="#">
                      {{ $t('front.display_all') }}
                    </a>
                </div>
            </div>
            <!-- products -->
            <div class="row products nowrap">
                <!-- item -->
                <product-item
                  v-for="(product, key) in secondCatProducts"
                  :key="key"
                  :product="product"
                  :gridClass="'col-6 col-lg-3'"
                />
                <!-- item -->
            </div>
        </div>
    </section>
    <!-- section -->
    <section class="img-offer">
        <a href="#">
            <img src="~/assets/front/images/img2.png" alt="">
        </a>
    </section>
    <!-- section -->
    <!-- <section class="bg-color2">
        <div class="container">
            <div class="row">
                <div class="col head-sec">
                    <div class="sec-title">
                        <h2 class="title">الساعات</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="cat-item">
                        <div class="img"><img src="~/assets/front/images/cat-img1.png" alt=""></div>
                        <h4 class="title">
                            <a href="product.html">ساعات رجالى</a>
                        </h4>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="cat-item">
                        <div class="img"><img src="~/assets/front/images/cat-img2.png" alt=""></div>
                        <h4 class="title">
                            <a href="product.html">ساعات حريمى</a>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
    <!-- section -->
    <section v-if="thirdCatProducts.length" class="bg-color">
        <div class="container">
            <div class="row">
                <div class="col head-sec">
                    <div class="sec-title">
                        <h2 class="title">
                          {{ thirdCategory.name}}
                        </h2>
                    </div>
                    <a class="btn more" href="#">
                      {{ $t('front.display_all') }}
                    </a>
                </div>
            </div>
            <!-- products -->
            <div class="row products nowrap">
                <!-- item -->
                <product-item
                  v-for="(product, key) in thirdCatProducts"
                  :key="key"
                  :product="product"
                  :gridClass="'col-6 col-lg-3'"
                />
                <!-- item -->
            </div>
        </div>
    </section>
    <!-- section -->
    <section class="img-offer">
        <a href="#">
            <img src="~/assets/front/images/img3.png" alt="">
        </a>
    </section>
    <!-- section -->
    <section>
        <div class="container">
            <div class="row">
                <div class="col head-sec">
                    <div class="sec-title">
                        <h2 class="title">
                          {{ $t('front.most_seller') }}
                        </h2>
                    </div>
                    <a class="btn more" href="#">
                      {{ $t('front.display_all') }}
                    </a>
                </div>
            </div>
            <!-- products -->
            <div class="row products nowrap">
                <!-- item -->
                <product-item
                  v-for="(product, key) in mostSellerProducts"
                  :key="key"
                  :product="product"
                  :gridClass="'col-6 col-lg-3'"
                />
                <!-- item -->
            </div>
        </div>
    </section>
    <!-- section -->
    <section class="bg-color">
        <div class="container">
            <div class="row">
                <div class="col head-sec">
                    <div class="sec-title">
                        <h2 class="title">
                          {{ $t('front.famous_brands') }}
                        </h2>
                    </div>
                    <a class="btn more" href="#">
                      {{ $t('front.shop_now') }}
                    </a>
                </div>
            </div>
            <!-- brands -->
            <div class="row brands nowrap">
                <!-- item -->
                <div v-for="(brand, key) in brands" :key="key" class="col-6 col-lg-2">
                    <a href="#">
                        <img :src="brand.image" :alt="brand.name">
                    </a>
                </div>
                <!-- item -->
            </div>
        </div>
    </section>
  </div>
</template>

<script src="./home.js"></script>
