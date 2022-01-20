<template>
  <div class="card mb-5">
    <router-link
      :to="{ name: 'ProductDetails', params: { slug: product.slug } }"
    >
      <img
        :src="product.image"
        class="card-img-top img-fluid"
        :alt="ProductName"
      />
    <!-- </router-link> -->
    <div class="card-body px-3">
      <!-- <router-link 
        :to="{ name: 'ProductDetails', params: { slug: product.slug } }"
      >-->
        <p class="card-title m-0">
          {{ ProductName }}
        </p>
        <span>
          <strong>{{ product.Ratings }}</strong>
          <i class="fa fa-star"></i>
          <strong>({{ product.Total_Reviews }})</strong>
        </span>
        <h4 class="old-price">Rs.{{ OldPrice }}.</h4>
        <strong class="card-title"> Rs.{{ Price }}. </strong>
      <!-- </router-link> -->
      <!-- <span> 
           <button class="btn btn-block btn-sm btn-primary">
            Add To Cart
            <i class="fa fa-shopping-cart"></i>
          </button>
        </span> -->
    </div>
    <span class="badge-pill badge-primary"> {{ product.discount }}% off! </span>
    </router-link>
  </div>
</template>

<script>
import ProductPrices from '@/mixins/ProductPrices';
export default {
  props: ["product"],
  mixins: [ProductPrices],
  computed: {
    ProductName() {
      if (this.product.product_name.length > 16) {
        return this.product.product_name.substring(0, 16) + "...";
      } else {
        return this.product.product_name;
      }
    },
  },
};
</script>

<style lang="scss">
div .card {
  border: .3rem solid var(--secondary-color);
  border-radius: 1rem;
  background-color: transparent;
  height: 26.5rem;
  position: relative;

  a {
    overflow: hidden;
  }
  .card-title {
    font-weight: bolder;
    font-size: 1.7rem;
  }
  .card-img-top {
    border-radius: 1rem;
    width: 100%;
    height: 15rem;
    transition: all .5s ease-in;
  }
  .badge-pill {
    font-size: 1.8rem;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(32%) translateY(-60%);
  }
  &:hover {
    border-color: $hvr-clr;

    .card-img-top {
      transform: scaleX(1) scaleY(2) translateY(20%);
    }
  }
}
</style>