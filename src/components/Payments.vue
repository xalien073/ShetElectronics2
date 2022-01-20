<template>
   <div
   class="col-lg-6 text-center">
   <div class="payment-details">
      <h2>
        Total Price: Rs.{{ Subtotal }}<hr>
        (Inclusive of all taxes.)</h2>
   </div>
    <button
      :disabled="!ShippingAddress" @click="PlaceOrder" id="PO"
      class="btn btn-block btn-primary">
      Place Order     
    </button>
  </div>
</template>

<script>
export default {
    name: "Payments",
    emits: ["placeorder"],
    props: ["Subtotal", "ShippingAddress"],
    methods: {
        PlaceOrder() {
            this.$emit('placeorder')
        }
    }
}
</script>
