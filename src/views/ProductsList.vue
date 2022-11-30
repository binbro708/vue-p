<template>
  <Loading :active="isLoading"></Loading>
  <div class="container-fluid d-flex mx-auto">
    <div class="card-area d-flex flex-wrap mx-auto row">
      <div class="card mt-4 col-3" v-for="item in products" :key="item.id">
        <img
          :src="item.imageUrl"
          class="card-img-top"
          alt=""
          style="
            height: 300px;
            width: 450px;
            object-fit: cover;
            object-position: 50% 30%;
          "
        />
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <h5 class="card-title">{{ item.origin_price }} 元</h5>
          <div class="btn-group btn-group-sm">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="getProduct(item.id)"
            >
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="addCart(item.id)"
              :disabled="this.status.loadingItem === item.id"
            >
              <div
                class="spinner-grow spinner-grow-sm"
                role="status"
                v-if="this.status.loadingItem === item.id"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      product: {},
      //   單一按鈕狀態
      status: {
        loadingItem: "",
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      cart: {},
      coupon_code: "",
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      // 取得商品列表
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      //loading改變
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        this.isLoading = false;
      });
    },
    //進入單一商品頁面
    getProduct(id) {
      //直接到路由表的id
      this.$router.push(`/user/product/${id}`);
    },
    addCart(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      //   去比對是點到哪個產品
      this.status.loadingItem = id;
      const cart = { product_id: id, qty: 1 };
      this.$http.post(url, { data: cart }).then(() => {
        this.status.loadingItem = "";
        this.isLoading = false;
      });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        // 包含陣列列表
        this.cart = res.data.data;
        this.isLoading = false;
      });
    },
    updateCart(item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading = true;
      this.status.loadingItem = item.id;
      const cart = { product_id: item.product_id, qty: item.qty };
      this.$http.put(url, { data: cart }).then(() => {
        this.status.loadingItem = "";
        this.getCart();
      });
    },
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.isLoading = true;
      const coupon = { code: this.coupon_code };
      this.$http.post(url, { data: coupon }).then(() => {
        this.getCart();
        this.isLoading = false;
      });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.isLoading = true;
      this.$http.post(url, { data: order }).then(() => {
        this.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>
