import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  name: 'MyComponent',
  props: {
    ads: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        rtl: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        initialSlide: 1,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  }
}
