<template>
  <div class="row m-0 product-preview mb-3">
    <div class="col-lg-1"></div>
    <div class="col-12 col-lg-10 p-0">
      <div class="row m-0">
        <div class="col-6 p-0">
          <img :src="Product.image" class="img-fluid" alt="Loading..." />
        </div>
        <div class="col-6 text-left p-0 pl-3">
          <h2>
            {{ Product.product_name }}
          </h2>
          <h3>Rs.{{ ProductSubtotal }}.
          <span class="ml-4 ml-lg-5">
            <label>Qty</label>
            <select
              v-model="Qty"
              @change="UpdQty($event)"
              class="mx-2 badge-pill badge-primary"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </span>
          </h3>
        </div>
      </div>
    </div>
    <div class="col-lg-1"></div>
  </div>
</template>

<script>
export default {
  name: "ProductPreview",
  data() {
    return {
      Qty: 1,
      ProductSubtotal: "",
    };
  },
  props: ["Product"],
  created() {
    this.ProductSubtotal = this.Product.price;
  },
  methods: {
    UpdQty(event) {
      let UpdatedQty = event.target.value;
      this.ProductSubtotal = this.Product.price * UpdatedQty;
      this.Qty = UpdatedQty;
      this.$emit("updtotal", this.ProductSubtotal, this.Qty);
    },
  },
};
</script>

<style lang="scss">
.product-preview {
  height: 40vh;

  .col-12 {
    height: 100%;
    border: .3rem solid $hvr-clr;
    border-radius: 2rem;

    .row {
      height: 100%;

      .col-6 {
        height: 100%;
        position: relative;

        img {
          height: 100%;
          width: 100%;
          border-radius: 2rem;
        }
        h2, h3 {
          font-weight: bolder;
        }
        h3 {
          position: absolute;
          bottom: 1rem;
        }
        select {
          height: 4rem;
          font-size: 2rem;
          cursor: pointer;
        }
      }
    }
  }

  @media (min-height: 1300px) {
    height: 30vw; 
  }
  @media (max-width: 998px) {
    height: 40vw;
  }
}
</style>