<template>
<div>
  <div class="row m-0 orders" v-if="Orders.length">
    <div class="col-12 mb-5 p-0" v-for="Order in Orders" :key="Order.Order_Id">
      <Order :Order="Order" />
    </div>
  </div>
  <template v-if="ZeroOrders">
  <h2 class="text-center">
    You haven't placed any order yet!
  </h2>
  </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Order from "@/components/Order.vue";

export default {
  name: "Orders",
  components: { Order},
  data() {
    return {
      Orders: [],
      ZeroOrders: false,
    };
  },
  computed: {
    ...mapGetters(["User"]),
  },
  created() {
    if (this.User) {
      this.GetOrders();
    }
  },
  updated() {
    if (this.User && !this.ZeroOrders && !this.Orders.length) {
      this.GetOrders()
    }
  },
  methods: {
    GetOrders() {
      axios({
        method: "get",
        url: "get-orders/" + this.User.id,
      })
        .then((res) => {
          this.Orders = res.data
         if (!res.data.length) {
            this.ZeroOrders = true
          }else {this.ZeroOrders = false} 
        })
        .catch((err) => console.error(err.message));
    },
  },
};
</script>

<style lang="scss">
.orders .col-12 {
  border: 0.3rem solid $hvr-clr;
  border-radius: 2rem;

  .product-ordered {
    height: 30vh;

    .col-lg-3 {
      height: 100%;

      img {
        width: 200%;
        height: 100%;
        border: 0.5rem solid $hvr-clr;
        border-radius: 2rem;
      }
    }
    .col-lg-7 {
      height: 100%;
      .row {
        height: 100%;
        .col-12 {
          height: 100%;
          border: none;
          position: relative;

          h3 {
            position: absolute;
            bottom: 0;
          }
          .row {
            height: 100%;
          }
          @media (max-width: 998px) {
            height: 50%;
          }
        }
      }
    }
    @media (min-height: 1300px) {
      height: 20vw;
    }
    @media (max-width: 998px) {
      height: 25vw;
    }
  }
}
</style>