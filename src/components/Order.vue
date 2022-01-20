<template>
     <div class="row mb-4">
        <strong class="mx-auto">Order placed at {{ Order.Created }}.</strong>
      </div>
      <div v-for="product in Order.Orders" class="row m-0 mb-5 product-ordered">
        <OrderedProduct :product="product" />
      </div>
      <div class="row m-0">
        <div class="col-6 text-center">
          <h2>Status: {{ Order.Status }}</h2>
        </div>
        <div class="col-6">
          <h2>Subtotal: Rs.{{ OrderSubtotal }}</h2>
        </div>
      </div>
</template>

<script>
import OrderedProduct from '@/components/OrderedProduct'
import ProductPrices from '@/mixins/ProductPrices';
export default {
    name: 'Order',
    props: ["Order"],
    components: {OrderedProduct},
    mixins: [ProductPrices]

}
</script>

<style>

</style>