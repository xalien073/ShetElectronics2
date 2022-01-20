<template>
  <div class="cart">
    <EmptyCart v-if="CartIsEmpty" />
    <template v-if="Cart.products.length">
      <div class="row mb-5">
        <div class="col-lg-6 text-center text-lg-right">
          <h2>Cart Subtotal: Rs.{{CartSubtotal}}</h2>
        </div>
        <div class="col-lg-6">
          <router-link :to="{ name: 'Checkout' }">
            <button class="btn btn-block btn-primary">
              Proceed to Checkout
            </button>
          </router-link>
        </div>
      </div>
      <template v-for="(product, index) in Cart.products" :key="product.product.product_id">
          <ProductInCart :product="product" />
      </template>
    </template>
    <template v-else-if="!CartIsEmpty">
      <LoadingSpinner />
    </template>
    <template v-if="Cart.forLater.length">
      <h3 class="my-5">Added for later:</h3>
       <template v-for="(product, index) in Cart.forLater" :key="product.product.product_id">
        <ProductForLater :product="product" /> 
      </template>
    </template>
  </div>
</template>
     
<script>
import { mapGetters } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ProductInCart from "@/components/ProductInCart.vue";
import ProductForLater from '@/components/ProductForLater'
import EmptyCart from "@/components/EmptyCart.vue";
export default {
  name: "Cart",
  components: { LoadingSpinner, ProductInCart, ProductForLater, EmptyCart },
  computed: {
    ...mapGetters(["User", "Cart", "CartSubtotal", "CartIsEmpty"]),
  },
  created() {
    if (!this.User) {
      this.$emit("login");
    }
  },
  mounted() {
    if(this.Cart.products.length && this.CartIsEmpty) {
      this.$store.dispatch("CartIsEmpty", false)
    }
  },
  updated() {
    if(this.Cart.products.length && this.CartIsEmpty) {
      this.$store.dispatch("CartIsEmpty", false)
    }
    if(!this.Cart.products.length && !this.CartIsEmpty) {
      this.$store.dispatch("CartIsEmpty", true)
    }
  },
};
</script>

<style lang="scss">
.cart {
  .mb-3 {
    height: 30vh;

    .col-lg-10 {
      width: 100%;
      height: 100%;

      .row {
        width: 100%;
        height: 100%;
        border: 0.3rem solid $hvr-clr;
        border-radius: 2rem;

        .col-lg-6 {
          width: 100%;
          height: 100%;
          position: relative;

          img {
            width: 100%;
            height: 100%;
            border-radius: 2rem;
          }
          h3,
          button {
            position: absolute;
            bottom: 2rem;
          }
          h3 {
            left: 2rem;
          }
          button:nth-child(2) {
            right: 9rem;
          }
          button:nth-child(3) {
            right: 1rem;
          }
        }
      }
    }
  }
   @media (max-width: 998px) {
    .mb-3 {
      height: 40vh;
      
      .col-lg-10 .row {
      .col-lg-6 {
        height: 20vh;
      }
      }
    }
  }
  @media (min-height: 1300px) {
    .mb-3 {
      height: 20vh;
    }
  }
}
</style>