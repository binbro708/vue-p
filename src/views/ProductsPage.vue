<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <!-- 新增產品，點擊預設是true -->
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      新增產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <!-- v-for 把資料列印出來 -->
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-right">
          <!-- 用methods裡的filter加入千分號 -->
          {{ $filters.currency(product.origin_price) }}
        </td>
        <!-- 用methods裡的filter加入千分號 -->
        <td class="text-right">{{ $filters.currency(product.price) }}</td>
        <td>
          <span class="text-success" v-if="product.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <!-- 編輯狀態才有東西傳進去 -->
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, product)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="delModal(product)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 分頁元件 -->
  <!-- props empProduct emit getProducts接收內層傳回來的page-->
  <PaginationComponents
    :pages="pagination"
    @emitPages="getProducts"
  ></PaginationComponents>
  <!-- props temProduct emits接收新增的資料並且重新渲染 -->
  <ProductsModal
    ref="ProductsModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductsModal>
  <!-- del-modal在DelModal.vue中那邊刪除完後會觸發這邊的 getProducts-->
  <DelModal
    ref="DelModal"
    :item="tempProduct"
    @del-modal="getProducts"
  ></DelModal>
</template>

<script>
import ProductsModal from "../components/ProductModal.vue";
import DelModal from "../components/DelModal.vue";
import PaginationComponents from "../components/PaginationComponents.vue";
export default {
  data() {
    // 定義產品跟分頁
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    ProductsModal,
    DelModal,
    PaginationComponents,
  },
  inject: ["emitter"],
  methods: {
    // TODO loading效果
    // 取得產品列表，預設第一頁
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          // 把取出來的產品列表存進去
          this.products = res.data.products;
          // 分頁資訊
          this.pagination = res.data.pagination;
        }
      });
    },
    openModal(isNew, item) {
      // 如果是點擊新增產品，打開來就會是空的
      if (isNew) {
        this.tempProduct = {};
        // 如果不是點新增產品，那就剩下點編輯，那這個tempProduct就會是原本有的資料
      } else {
        this.tempProduct = { ...item };
      }
      // 原本isNew的false會被改成true
      this.isNew = isNew;
      // 把temProduct清空後才打開
      const productComponent = this.$refs.ProductsModal;
      productComponent.showModal();
    },
    delModal(item) {
      // 如果是刪除那這邊的表單就會是有的資料，因為你一定要有東西才能刪除嘛
      this.tempProduct = item;
      const delProductComponent = this.$refs.DelModal;
      // 把delModal給打開來
      delProductComponent.showModal();
    },
    // 產品重新渲染，由上方的openModal去判斷是新增還是編輯，來改變表單內容的狀態
    updateProduct(item) {
      this.tempProduct = item;
      // 新增產品資料列表，this.isNew = isNew; 就是點新增產品isNew的狀態
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      //api要用post的方法
      let httpMethod = "post";
      // isNew=false 就是編輯的狀態
      if (!this.isNew) {
        // api要加上個別商品的id
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        // 如果是要編輯就要用put的方法，是firebase
        httpMethod = "put";
      }
      // 取到整個ProductsModal元件
      const productComponent = this.$refs.ProductsModal;
      // 該新增的新增，該編輯的編輯
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        // 新增完or編輯完把modal關閉
        productComponent.hideModal();
        if (res.data.success) {
          // 如果成功就重新取得產品列表
          this.getProducts();
          // 把這邊的資料跨元件送到ToastMessages那邊
          this.emitter.emit("push-message", {
            style: "success",
            title: "更新成功",
          });
        } else {
          this.emitter.emit("push-message", {
            style: "danger",
            title: "更新失敗",
            content: res.data.message.join("、"),
          });
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
