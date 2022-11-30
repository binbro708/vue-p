<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/productslist"
        >練習用</router-link
      >
      <router-link class="navbar-brand" to="/user/cart">購物車</router-link>
    </div>
  </nav>
  <div class="container-fluid mt-3 position-relative">
    <router-view></router-view>
  </div>
</template>
