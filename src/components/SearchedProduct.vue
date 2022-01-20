<template>
  <div class="col-12 p-0">
    <div class="row m-0">
      <div class="col-6 p-0">
        <router-link
          :to="{ name: 'ProductDetails', params: { slug: product.slug } }"
        >
          <img :src="product.image" class="img-fluid" alt="Loading..." />
        </router-link>
        <span class="badge-pill badge-primary">{{ product.discount }}% off!</span>
      </div>
      <div class="col-6">
        <router-link
          :to="{ name: 'ProductDetails', params: { slug: product.slug } }"
        >
          <h2>
            {{ product.product_name }}
          </h2>
          <h4 class="old-price">Rs.{{ OldPrice }}.</h4>
          <h3>Rs.{{ Price }}.</h3>
          <strong>
            {{ product.Ratings }}
            <i class="fa fa-star"></i>
            <span>({{ product.Total_Reviews }})</span>
          </strong>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ProductPrices from '@/mixins/ProductPrices';
export default {
  name: "SearchedProduct",
  props: ["product"],
  mixins: [ProductPrices]
};
</script>

<style lang="scss">
#Results {
  .col-12 .row {
    height: 35vh;
    border: .3rem solid $hvr-clr;
    border-radius: 2rem;

    .col-6 {
      width: 100%;
      height: 100%;
      position: relative; 
  
  img {
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  }
    .badge-pill {
      font-size: 2.5rem;
      position: absolute;
      top: 0;
      right: 0;
    }
    h3, h4, strong {
      position: absolute;
      left: 2rem;
    }
    h3 {
      bottom: 4rem;
    }
    h4 {
      bottom: 7rem;
    }
    strong {
      bottom: 1rem; 
    }
    }
    
    @media (min-height: 1300px) {
      height: 25vw;
    }
    @media (max-width: 998px) {
      height: 40vw;
    }
  }
}
</style>