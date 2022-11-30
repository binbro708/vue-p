<!-- 分頁按鈕 -->
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 接收外層傳進來的page 之後v-for總頁數 -->
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <!-- 會把當前頁面當參數傳進去emit裡面 -->
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"

// @emitPages="更新頁面事件"
export default {
  props: ["pages"],
  methods: {
    updatePage(page) {
      this.$emit("emitPages", page);
    },
  },
};
</script>
