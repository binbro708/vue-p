<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/productslist"
        >練習用</router-link
      >
      <router-link class="navbar-brand" to="/user/cart">購物車</router-link>
    </div>
  </nav>
  <Carousel class="mt-5"></Carousel>
  <router-link to="/user/productslist" class="nav-link mt-5 text-center"
    >點我連到產品列表</router-link
  >
</template>
<script>
import Carousel from "../components/CarouselComponents.vue";

export default {
  components: { Carousel },
};
</script>
