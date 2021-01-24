<template>
  <div>
     <!-- section -->
    <section class="bg-color">
        <div class="container">
            <div class="row">
                <!-- breadcrumb -->
                <div class="col-12">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                              <nuxt-link :to="{ name: 'home' }">
                                {{ $t('front.home') }}
                              </nuxt-link>
                            </li>
                            <li class="breadcrumb-item active">الماس</li>
                        </ol>
                    </nav>
                </div>
                <!-- sidebar -->
                <div class="col-lg-3" id="sidebar">
                    <i class="fas fa-times close"></i>
                    <div class="sidebar">
                        <!-- sidebar block -->
                        <div class="side-block">
                            <div class="head-block open">
                                <div class="block-title">
                                    <h2 class="title">
                                      {{ $t('front.categories') }}
                                    </h2>
                                </div>
                                <i class="fa fa-chevron-left"></i>
                            </div>
                            <div class="block-body open">
                                <ul class="block-list">
                                    <li v-for="(category, key) in categories" :key="key">
                                        <nuxt-link :to="{ name: 'category.products', params: { id: category.id } }">
                                          {{ category.name }}
                                        </nuxt-link>
                                        <i class="fa fa-chevron-left"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- sidebar block -->
                        <div class="side-block">
                            <div class="head-block open">
                                <div class="block-title">
                                    <h2 class="title">
                                      {{ $t('front.brands') }}
                                    </h2>
                                </div>
                                <i class="fa fa-chevron-left"></i>
                            </div>
                            <div class="block-body open">
                                <ul class="block-list">
                                    <li v-for="(brand, key) in brands" :key="key">
                                        <label class="form-check-label">
                                            <input @click="toggleBrands(brand.id)" type="checkbox">
                                            <span></span>
                                            {{ brand.name }}
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- sidebar block -->
                        <div v-if="subcategories.length" class="side-block">
                            <div class="head-block open">
                                <div class="block-title">
                                    <h2 class="title">
                                      {{ $t('front.subcategories') }}
                                    </h2>
                                </div>
                                <i class="fa fa-chevron-left"></i>
                            </div>
                            <div class="block-body open">
                                <ul class="block-list">
                                    <li v-for="(subcategory, key) in subcategories" :key="key">
                                        <label class="form-check-label">
                                            <input type="checkbox" @click="toggleSubCategories(subcategory.id)">
                                            <span></span>
                                            {{ subcategory.name }}
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- sidebar block -->
                        <div class="side-block">
                            <div class="head-block open">
                                <div class="block-title">
                                    <h2 class="title">
                                      {{ $t('front.price') }}
                                    </h2>
                                </div>
                                <i class="fa fa-chevron-left"></i>
                            </div>
                            <div class="block-body open">
                                <div class="row form-price">
                                    <div class="col-6"><input v-model="queryParam.price_from" type="number" class="form-control" :placeholder="$t('front.from')"
                                            min="1"></div>
                                    <div class="col-6"><input v-model="queryParam.price_to" type="number" class="form-control" :placeholder="$t('front.to')"
                                            min="1"></div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn defualt" @click="handlePaginatedData">تفعيل</button>
                    </div>
                </div>
                <!-- products -->
                <div class="col-lg-9">
                    <!-- result & sortby & display -->
                    <div class="header-products">
                        <div class="prod-result">
                            <h5 class="title">
                              {{ metaData.total }} {{ $t('front.results') }}
                            </h5>
                        </div>
                        <div class="tools-display">
                            <div class="filter" id="filter"><i class="fas fa-filter"></i></div>
                            <div class="sortby">
                                <label>ترتيب حسب</label>
                                <select class="custom-select" @change="onSortChange">
                                    <option
                                      v-for="(sort, key) in sorts" :key="key"
                                      :value="sort.key"
                                      :selected="key == 0 ? 'selected' : ''"
                                    >
                                      {{ $t(`front.${sort.key}`) }}
                                    </option>
                                </select>
                            </div>
                            <div class="display-num">
                                <label>عرض</label>
                                <select class="custom-select" @change="onPerPageChange">
                                    <option
                                      v-for="(page, key) in pages" :key="key"
                                      :value="page"
                                      :selected="key == 0 ? 'selected' : ''"
                                    >
                                      {{ page }} {{ $t('front.per_page') }}
                                    </option>
                                </select>
                            </div>
                            <div class="display">
                                <a @click="toggleDisplay"><i class="fa fa-list"></i></a>
                            </div>
                        </div>
                    </div>
                    <!-- products -->
                    <div class="row">
                        <div class="col-12 head-sec">
                            <div class="sec-title">
                                <h2 class="title">
                                  {{ $t('front.products') }}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div :class="parentClass">
                        <!-- products -->
                        <!-- item -->
                          <product-block
                            v-for="(product, key) in products"
                            :key="key"
                            :product="product"
                            :gridClass="gridClass"
                          />
                        <!-- item -->
                    </div>
                    <!-- pagination -->
                    <!-- <div class="row">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    <i class="fa fa-chevron-right"></i>
                                </a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    <i class="fa fa-chevron-left"></i>
                                </a>
                            </li>
                        </ul>
                    </div> -->
                    <v-row class="pagination">
                      <b-pagination
                        class="page-item"
                        :total="metaData.total"
                        :current="queryParam.current_page"
                        :simple="false"
                        :per-page="queryParam.per_page"
                        @change="onPageChange"
                      />
                    </v-row>
                </div>
            </div>
        </div>
    </section>
    <!-- section -->
  </div>
</template>

<script src="./products.js"></script>
