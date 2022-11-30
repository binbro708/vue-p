<template>
  <div
    id="carouselExampleSlidesOnly"
    class="carousel slide"
    data-bs-ride="carousel"
    ref="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active text-center h4">歡迎</div>
      <div class="carousel-item text-center h4">這是我的vue練習項目</div>
    </div>
  </div>
</template>

<script>
// 把吐司元件載入進來
import Carousel from "bootstrap/js/dist/carousel";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Toast",
  props: ["msg"],
  mounted() {
    const myCarousel = this.$refs.carousel;
    // eslint-disable-next-line no-unused-vars
    const carousel = new Carousel(myCarousel, {
      interval: 3000,
      wrap: true,
    });
  },
};
</script>
