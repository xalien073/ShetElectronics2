import PriceFormater from '@/composables/PriceFormater'
export default {
    computed: {
        OldPrice() {
            return PriceFormater(this.product.old_price)
        },
        Price() {
            return PriceFormater(this.product.price)
        },
        ProductSubtotal() {
            return PriceFormater(this.product.ProductSubtotal)
        },
        OrderSubtotal() {
            return PriceFormater(this.Order.Subtotal)
        }
      
    }
}