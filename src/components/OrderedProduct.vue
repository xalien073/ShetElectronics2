<template>
  <div class="col-lg-1"></div>
  <div class="col-4 col-lg-3 p-0 pl-1 pl-lg-0">
    <img :src="product.Product.image" class="img-fluid" :alt="ProductName" />
  </div>
  <div class="col-8 col-lg-7">
    <div class="row m-0">
  <div class="col-12 col-lg-8 p-0">
    <h2>{{ ProductName }}</h2>
    <h3>Rs.{{ ProductSubtotal }}.
      <span class="ml-5">Qty {{ product.Qty }}</span>
    </h3>
  </div>
  <div class="col-12 col-lg-4 p-0">
    <div class="row m-0 align-items-center">
    <button @click="ReOrder" class="btn btn-block btn-primary">
      Re-Order</button>
    </div>
  </div>
  </div>
  </div>
  <div class="col--lg-1"></div>
</template>

<script>
import ProductPrices from '@/mixins/ProductPrices'; 
export default {
  props: ["product"],
  data() {
    return {
      ProductStr: ''
    }
  },
  mixins: [ProductPrices],
  computed: {
    ProductName() {
      if (this.product.Product.product_name.length > 25) {
        return this.product.Product.product_name.slice(0, 20) + "...";
      } else {
        return this.product.Product.product_name;
      }
    },
  },
  created() {
    this.ProductStr = JSON.stringify(this.product.Product)
  },
  methods: {
    ReOrder() {
       this.$router.push({ name: 'ReOrder', params: { ProductStr: this.ProductStr } })
    }
  }
};
</script>
