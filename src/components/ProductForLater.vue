<template>
    <div class="row mb-3">
          <div class="col-lg-1"></div>
          <div class="col-lg-10 p-0">
            <div class="row m-0">
              <div class="col-lg-6 p-0">
                <router-link
                  :to="{ name: 'ProductDetails', params: { slug: product.product.slug } }"
                >
                  <img :src="product.product.image" class="img-fluid" :alt="product.Product_Name" />
                </router-link>
              </div>
              <div class="col-lg-6">
                <router-link
                  :to="{ name: 'ProductDetails', params: { slug: product.product.slug } }"
                >
                  <h2>{{ product.product.product_name }}</h2>
                  <h3>
                    Qty {{ product.qty }}
                    <span class="ml-5">Rs.{{ ProductSubtotal }}</span>
                  </h3>
                </router-link>
                <button class="badge-pill badge-primary"
                  @click="MoveToCart(product.product, product.ProductSubtotal, index)">
                Move to Cart
                </button>
                <button class="badge-pill badge-primary"
                  @click="Delete(product.product.product_id, product.ProductSubtotal, index, 'move-to-cart')"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
          <div class="col-lg-1"></div>
        </div>
</template>

<script>
import ProductPrices from '@/mixins/ProductPrices'
import Cart from '@/mixins/Cart'
export default {
    props: ["product"],
    mixins: [ProductPrices, Cart]

}
</script>

<style>

</style>