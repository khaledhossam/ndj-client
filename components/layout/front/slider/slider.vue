<template>
  <div>
    <section id="slideshow">
      <div class="container">
        <div class="row">
          <div class="col-12 slideshow">
            <VueSlickCarousel v-bind="settings">
              <nuxt-link v-for="(ad, key) in ads" :key="key"
                :to="{ name: 'category.products', params: { id: ad.category.id } }">
                  <img :src="ad.image" :alt="ad.title">
              </nuxt-link>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="./main-slider.js"></script>
