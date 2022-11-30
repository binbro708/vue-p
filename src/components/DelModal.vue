<!-- 刪除用Modal -->
<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">刪除</h1>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          確認刪除:{{ item.title }} <br />!!警告:此動作無法復原
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct()">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalMixin from "@/mixins/modalMixin";

export default {
  props: {
    item: {},
  },
  data() {
    return {
      model: {},
    };
  },
  mixins: [ModalMixin],
  methods: {
    delProduct() {
      let apiChange = "product";
      if (this.item.create_at) {
        apiChange = "order";
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/${apiChange}/${this.item.id}`;
      this.$http.delete(api).then(() => {
        this.hideModal();
        // 這邊觸發完要接著觸發外層的methods
        this.$emit("del-modal");
      });
    },
  },
};
</script>
