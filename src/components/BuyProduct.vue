<template>
<div>
  <ProductPreview :Product="Product" :ProductSubtotal="ProductSubtotal"
     @updtotal="UpdTotal" />
  <OrderPreview :Subtotal="ProductSubtotal" @placeorder="PlaceOrder" />
</div>
</template>

<script>
import PlaceSingleProduct from '@/composables/PlaceSingleProduct';
import OrderPreview from '@/components/OrderPreview.vue';
import ProductPreview from '@/components/ProductPreview.vue';
import { mapGetters } from 'vuex';
export default {
  name: "BuyProduct",
  props: ['ProductStr'],
  components: {ProductPreview, OrderPreview},
  data() {
    return {
      Product : '',
      ProductSubtotal: '',
      Qty: 1,
    };
  },
  computed: {
      ...mapGetters(["User"])
  },
  created() {
    if (this.ProductStr) {
      this.ParseProduct()
    }
  },
  methods: {
    ParseProduct() {
      this.Product = JSON.parse(this.ProductStr)
      this.ProductSubtotal = this.Product.price
    },
    UpdTotal(NewTotal, NewQty) {
      this.ProductSubtotal = NewTotal
      this.Qty = NewQty
    },
    PlaceOrder(ShippingAddress) {
        const ProductOrdered = {
        Customer: this.User.id,
        Product: this.Product.product_id,
        ProductSubtotal: this.ProductSubtotal,
        Qty: this.Qty,
        };
        PlaceSingleProduct(ShippingAddress, ProductOrdered)
    }
   
  },
};
</script>
