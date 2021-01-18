<template>
  <div>
    <section id="slideshow">
      <div class="container">
        <div class="row">
          <div class="col-12 slideshow">
            <VueSlickCarousel v-bind="settings">
              <a v-for="(ad, key) in ads" :key="key" href="#">
                  <img :src="ad.image" :alt="ad.title">
              </a>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="./main-slider.js"></script>
