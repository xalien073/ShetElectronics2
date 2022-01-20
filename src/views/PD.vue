<template>
  <div class="product-details">
    <template v-if="product">
      <div class="row">
        <div class="col-lg-1 p-0 order-lg-1">
          <div class="product-views align-items-center">
            <img
              :src="product.image"
              class="img-fluid active"
              :alt="product.product_name"
              @click="View360($event)"
            />
            <img
              src="@/assets/m121.webp"
              class="img-fluid"
              :alt="product.product_name"
              @click="View360($event)"
            />
            <img
              src="@/assets/m12.webp"
              class="img-fluid"
              :alt="product.product_name"
              @click="View360($event)" 
            />
            <img
              src="@/assets/m122.webp"
              class="img-fluid"
              :alt="product.product_name"
              @click="View360($event)" 
            />
            <img
              src="@/assets/m123.webp"
              class="img-fluid"
              :alt="product.product_name"
              @click="View360($event)" 
            />
          </div>
        </div>
        <div class="col-lg-5 p-0 order-lg-2 order-first">
          <transition name="featured-image" appear>
          <img
            :src="product.image"
            class="img-fluid"
            :alt="product.product_name"
            ref="FeaturedImage"
          />
          </transition>
          <span class="badge-pill badge-primary">{{ product.discount }}% off!</span>
        </div>
        <div class="col-lg-6 p-5 order-lg-3">
          <h2>
            {{ product.product_name }}
          </h2>
          <h3>
            <span @click="ShowStarRating" id="Rate">
              {{ StarRatings }}
              <i class="fa fa-star"></i>
            </span>
            <span @click="Review = true" id="Review" class="ml-2">
              ({{ product.Total_Reviews }})
            </span>
          </h3>
          <strong v-if="Rated" class="text-success">
            Thanks for rating!
            <span @click="Rated = false" class="btn btn-sm btn-primary ml-1">
              &times;
            </span>
          </strong>
          <h5 class="old-price">Rs.{{ OldPrice }}.</h5>
          <h3>Rs.{{ Price }}.</h3>
          <button @click="BuyNow" class="btn btn-lg btn-primary my-5 my-lg-0">
            Buy Now
          </button>
          <span class="ml-lg-4">
            <button v-show="!Qty" @click="AddProduct(product, 'cart')"
              class="btn btn-lg btn-primary">
              Add to Cart
            </button>
            <span v-if="Qty">
              <label>Qty</label>
              <select v-model="Qty" @change="UpdQty($event, product.product_id, CartIndex)"
                class="mx-2 badge-pill badge-primary">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </span>
          </span>
          <p class="my-4">
            <strong>Description:</strong>
            {{ product.description }}
          </p>
        </div>
        <Modal :Show="Rate" :Title="product.product_name" @close="Rate = false">
          <StarRatings
            :product="product.product_id"
            :User="User.id"
            @close="(Rate = false), (Rated = true), (Review = true)"
          />
        </Modal>
        <Modal
          :Show="Review"
          :Title="product.product_name"
          @close="Review = false"
        >
          <Reviews :product="product.product_id" />
        </Modal>
      </div>
    </template>
    <template v-else>
      <LoadingSpinner />
    </template>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Modal from "@/components/Modal.vue";
import StarRatings from "@/components/StarRatings.vue";
import Reviews from "@/components/Reviews.vue";
import ProductPrices from '@/mixins/ProductPrices';
import Cart from '@/mixins/Cart'
import { mapGetters } from 'vuex';
export default {
  name: "ProductDetails",
  props: ["slug"],
  components: { LoadingSpinner, Modal, StarRatings, Reviews },
  mixins: [Cart, ProductPrices],
  data() {
    return {
      product: null,
      ProductStr: "",
      Qty: "",
      ProductSubtotal: "",
      CartIndex: "",
      Rate: false,
      Review: false,
      Rated: false,
    };
  },
  computed: {
    ...mapGetters(["User", "Cart"]),
    StarRatings() {
      return this.product.Ratings.slice(0, 3);
    },
  },
  created() {
    this.GetProduct();
  },
  updated() {
    this.Cart.products.map((val, index) => {
      console.log(val.product.slug)
      if (this.slug === val.product.slug) {
        if (this.product) {
          this.Qty = val.qty;
          this.ProductSubtotal = val.total;
          this.CartIndex = index;
        }
      }
    })
    console.log('updated...',this.CartIndex)
  },
  methods: {
    GetProduct() {
      axios({
        method: "get",
        url: "products/" + this.slug,
      })
        .then((res) => {
          this.product = res.data;
          this.ProductStr = JSON.stringify(res.data);
        })
        .catch((err) => console.error(err));
    },
    BuyNow() {
      if (this.User) {
        this.$router.push({
          name: "BuyNow",
          params: { ProductStr: this.ProductStr },
        });
      } else {
        this.$emit("login");
      }
    },
    AddProduct(product, url) {
      this.AddToCart(product, url)
      this.CartIndex = this.Cart.products.length
      if(this.User) {this.Qty = 1}
    },
    UpdQty(event, id, CartIndex) {
      let UpdatedQty = event.target.value;
      let UpdatedSubtotal = this.product.price * UpdatedQty;
      let CartSubtotal = UpdatedSubtotal - this.ProductSubtotal;
      this.$store.dispatch('UpdateProduct', {CartIndex, UpdatedQty, UpdatedSubtotal, CartSubtotal});
      const Update = {
        qty: UpdatedQty,
        total: UpdatedSubtotal
      };
      axios({
        method: "patch",
        url: "cart/"+ id +"/",
        data: Update,
      })
        // .then((res) => {})
        .catch((err) => console.error(err.message));
    },
    ShowStarRating() {
      if (this.User) {
        this.Rate = true;
      } else {
        this.$emit("login");
      }
    },
    View360(e) {
      this.$refs.FeaturedImage.src = e.target.src
      document.querySelector(".active").classList.remove("active")
      e.target.classList.add("active") 
    }
  },
};
</script>

<style lang="scss">
.product-details {
  .row {
    min-height: 75vh;

    .col-lg-1 {
      height: 75vh;

      .product-views {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;

        img {
          height: 13vh;
          width: 13vh;
          border-radius: 2rem;
          cursor: pointer;
        }
        .active {
          border: .3rem solid $hvr-clr;
        }
      }
    }
    .col-lg-5 {
      position: relative;
      height: 75vh;

      .featured-image-enter-from {
        opacity: 0;
        transform: rotateY(-45deg) translateX(-50%); 
      }
      .featured-image-enter-active {
        transition: all 3s ease-out;
      }
      .featured-image-leave-to {}
      .featured-image-leave-active {}   

      img {
        width: 100%;
        height: 100%;
        border: .3rem solid $hvr-clr;
        border-radius: 2rem;
      }
      .badge-pill {
        font-size: 3rem;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(32%, -50%);
      }
    }
    .col-lg-6 {
      h2 {
        font-weight: bolder;
      }  

    #Rate,
    #Review {
      cursor: pointer;
    }
    select {
      height: 4rem;
      font-size: 2rem;
      cursor: pointer;
    }
    }
  }

   @media (min-height:1300px) {
    .row {
      .col-lg-1 {
        height: 45vw;

        .product-views {

          img {
            height: 8vw;
            width: 8vw;
          }
        }
      }
      .col-lg-5 {
        height: 45vw;
      }
      .col-lg-6 {
        .btn {
          width: 45%;
        }
      }
    }
  }

  @media (max-width: 998px) {
    .row {
      .col-lg-1 {
        height: 20vw;

        .product-views {
          flex-direction: row;

          img {
            height: 18vw;
            width: 18vw;
          }
        }
      }
      .col-lg-5 {
        height: 37.5vh;

        .badge-pill {
          transform: translate(0, 0);
        }
      }
      .col-lg-6 {
        .btn {
          width: 100%;
        }
      }
    }
  }
}
</style>