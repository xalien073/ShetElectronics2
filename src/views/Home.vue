<template>
  <div>
    <teleport to="#bg">
      <div class="background">
        <div class="row m-0">
          <div class="col-md-8 col-lg-8 col-xl-8">
            <div class="row m-0 text-center">
              <p>
                Welcome to Heaven of Electronics,
                <strong id="brand">Shet.com!</strong>
              </p>
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4">
            <div class="row m-0 align-items-center justify-content-center">
              <Cube />  
            </div>
          </div>
        </div>
      </div>
    </teleport>
    <template v-if="products.length">
      <div class="row m-0">
        <div
          v-for="product in products"
          :key="product.product_id"
          class="col-6 col-sm-6 col-md-4 col-lg-3"
        >
          <FeaturedProduct :product="product" />
        </div>
      </div>
    </template>
    <template v-else>
      <LoadingSpinner />
    </template>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Cube from "@/components/Cube.vue";
import FeaturedProduct from "@/components/FeaturedProduct.vue";
export default {
  name: "Home",
  props: ["User", "Cart"],
  components: {
    LoadingSpinner,
    Cube,
    FeaturedProduct,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      axios({
        method: "get",
        url: "products/",
      })
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style lang="scss">
.background {
  width: 100%;
  height: 86vh;
  background: linear-gradient(
    transparent 5%,
    darkblue 35%,
    indigo 65%,
    darkblue 70%,
    transparent 100%
  );
  background-size: cover;
  transform-style: preserve-3d;
  perspective: 120rem;
  perspective-origin: 50% calc(50% - 90rem);
  // padding: 0 10% 5% 10%;

  .row {
    height: 100%;
  
  .col-md-8 .row {
    align-items: center;

    p {
      font-size: 5rem;
      font-weight: 900;
      color: hsl(206, 21%, 94%);
      animation: welcome 2s linear infinite;
      text-shadow: 0.5rem 1rem #0005;
    }

    #brand {
      font-size: 5.2rem;
    }
  }
  }

  @keyframes welcome {
    0%,
    100% {
      transform: scale(0.5);
    }
    50% {
      transform: scale(1.1);
    }
  }
  @media (min-height: 1360px) {
    height: 45vh;
}
  @media screen and (max-width: 998px) {
    // height: 45vh;
  }
  @media screen and (max-width: 998px) {
    height: 87vh;

    .row .col-md-8 .row {
      align-items: flex-start;
    } 
  }
}
</style>