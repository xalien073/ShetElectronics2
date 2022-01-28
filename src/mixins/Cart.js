import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(["User", "Cart"])
  },
  methods: {
    AddToCart(product, url) {
      if (this.User) {
        const AddProduct = { "product": product, "qty": 1, "ProductSubtotal": product.price }
        if (url === 'cart'|| url === 'move-to-cart') {
          this.$store.dispatch('AddProduct', AddProduct);
        }
        if(url === 'add-for-later') {
          this.$store.dispatch('AddForLater', AddProduct)
        }
        axios({
          method: "post",
          url: `${url}/`,
          data: { id: product.product_id },
        })
          .then((res) => {
          })
          .catch((err) => console.error(err.message));
      } else {
        this.$emit("login");
      }
    },
    AddForLater(product, ProductSubtotal, key) {
      console.log('id',product.product_id)
      this.$store.dispatch('DeleteProduct', {key, ProductSubtotal});
      this.AddToCart(product, 'add-for-later')
    },
    MoveToCart(product, ProductSubtotal, key) {
      console.log('id',product.product_id)
      this.$store.dispatch('DeleteForLater', key)
      this.AddToCart(product, 'move-to-cart')
    },
    Delete(id, ProductSubtotal, key, url) {
      if(url === 'cart') {
        this.$store.dispatch('DeleteProduct', {key, ProductSubtotal});
      }
      else{this.$store.dispatch('DeleteForLater', key)}
      axios({
        method: "delete",
        url: `${url}/${id}`,
      })
        //.then((res) => {console.log(res)})
        .catch((err) => console.error(err));
    },
  }
}