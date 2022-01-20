<template>
  <div class="row m-0 order-preview">
    <div class="col-lg-1"></div>
    <div class="col-12 col-lg-10 p-0">
      <div class="row m-0">
        <Addresses :User="User" @shippingaddress="DeliverTo" />
        <Payments
          :Subtotal="CartSubtotal" :ShippingAddress="ShippingAddress"
          @placeorder="PlaceOrder"
        />
      </div>
    </div>
    <div class="col-lg-1"></div>
  </div>
</template>

<script>
import Addresses from "@/components/Addresses.vue";
import Payments from "@/components/Payments.vue";
import { mapGetters } from "vuex";
export default {
  name: "OrderPreview",
  components: { Addresses, Payments },
  data() {
    return {
      ShippingAddress: "",
    };
  },
  computed: {
    ...mapGetters(["User", "CartSubtotal"]),
  },
  methods: {
    DeliverTo(Address) {
      this.ShippingAddress = Address;
    },
    PlaceOrder() {
      this.$emit("placeorder", this.ShippingAddress);
    },
  },
};
</script>

<style lang="scss">
.order-preview {
  height: 75vh;

  .col-12 {
    height: 100%;
    border: .3rem solid $hvr-clr;
    border-radius: 2rem;

    .row {
      height: 100%;

      .col-lg-6 {
        position: relative;
        height: 100%;

        .overflow-auto {
          height: 65%;

          .mb-4 {
            border: .3rem solid $hvr-clr;
            border-radius: 2rem;

            input[type="radio"] {
              cursor: pointer;
              width: 2.5rem;
              height: 2.5rem;
              color: blueviolet;
              background: transparent;
            }
            h3 {
              font-size: 2.5rem;
              font-weight: bolder;
              text-transform: capitalize;
            }
          }
        }
        #Q {
          font-size: 30rem;
          position: relative;
          top: -12rem;
        }
        .btn-block {
          width: 98%;
          position: absolute;
          left: 1%;
          bottom: 2%;
        }
        .payment-details {
          height: 87%;
          display: grid;
          place-items: center;
          
          h2 {
            font-weight: bolder;
            font-size: 3rem;
          }
        } 
      }
    }
  }

  @media (min-height: 1308px) {
    height: 45vh;
  }

  @media (max-width: 998px) {
    height: 80vh;

    .col-12 .row .col-lg-6 {
      height : 40vh;
    }
  }
}
</style>