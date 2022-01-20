<template>
  <OrderPreview @placeorder="PlaceOrder" />
</template>

<script>
import SaveOrder from "@/composables/SaveOrder";
import OrderPreview from "@/components/OrderPreview.vue";
import { mapGetters } from 'vuex'
export default {
  name: "Checkout",
  components: { OrderPreview },
  data() {
    return {
      Order: {
        Customer: "",
        Address: "",
      },
    };
  },
  computed: {
    ...mapGetters(["User"]),
  },
  methods: {
    PlaceOrder(ShippingAddress) {
      this.Order.Address = ShippingAddress;
      this.Order.Customer = this.User.id
      SaveOrder(this.Order);
      this.$store.dispatch("Cart", []);
    }
  },
};
</script>

<style scoped>
</style>