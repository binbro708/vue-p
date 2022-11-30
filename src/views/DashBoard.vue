<!-- 後台 -->
<template>
  <!-- nav元件 -->
  <Navbar></Navbar>
  <div class="container-fluid mt-3 position-relative">
    <!-- 吐司元件 -->
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
</template>
<script>
// 載入NAV
import Navbar from "../components/NavBar.vue";
// 載入跨元件傳遞資料套件
import emitter from "@/methods/emitter";
// 載入提示訊息
import ToastMessages from "@/components/ToastMessages.vue";
export default {
  // 因為nav會越寫越長，故拆分成元件
  components: {
    Navbar,
    ToastMessages,
  },
  // 讓之後的頁面都能從這邊傳遞資料
  provide() {
    return {
      emitter,
    };
  },
  created() {
    // mdn文件給的方法，使用replace取cookie
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 把token加入header
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user).then((res) => {
      if (!res.data.success) {
        this.$router.push("login");
      }
    });
  },
};
</script>
