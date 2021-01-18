<template>
  <div id="menu">
    <div class="container">
        <div class="row">
            <nav class="navbar navbar-expand-lg ">
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown all-cats">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ $t('front.all_categories') }}
                            </a>
                            <div class="dropdown-menu col" aria-labelledby="navbarDropdown">
                                <div class="row">
                                    <div class="col-lg-2">
                                        <h5 class="dropdown-menu-title">
                                          {{ $t('front.categories') }}
                                        </h5>
                                        <div class="dropdown-menu-cats-links">
                                            <nuxt-link v-for="(category, key) in categories" :key="key" class="dropdown-item" :to="{ name: 'test' }">
                                              {{ category.name}}
                                            </nuxt-link>
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <h5 class="dropdown-menu-title">
                                          {{ $t('front.favourite_brands') }}
                                        </h5>
                                        <div class="row brands nowrap">
                                            <!-- item -->
                                            <div v-for="(brand, key) in brands.slice(0, 9)" :key="key" class="col-6 col-lg-4">
                                                <a href="#">
                                                    <img :src="brand.image" :alt="brand.name">
                                                </a>
                                            </div>
                                            <!-- item -->
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <h5 class="dropdown-menu-title">
                                          {{ $t('front.offers') }}
                                        </h5>
                                        <div class="row products small">
                                            <!-- item -->
                                            <product-item
                                              v-for="(offer, key) in offers"
                                              :key="key"
                                              :product="offer"
                                              :gridClass="'col-6'"
                                            />
                                            <!-- item -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li v-for="(category, key) in categories.slice(0, 5)" :key="key" class="nav-item">
                            <nuxt-link class="nav-link" :to="{ name: 'test' }">
                              {{ category.name}}
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
  </div>
</template>

<script src="./main-menu.js"></script>
