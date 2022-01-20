import SaveOrder from '@/composables/SaveOrder';
const Order = {
    Customer: '',
    Subtotal: '',
    Address: '',
    Orders: [],
}
function PlaceSingleProduct(ShippingAddress, ProductOrdered) {
    axios({
        method: "post",
        url: "product-ordered/",
        data: ProductOrdered,
    })
    .then((res) => {
            Order.Orders.push(res.data.id)
            SaveOrder(Order)
            Order.Orders = []
    })
    .catch((err) => console.error(err.message))
    Order.Customer = ProductOrdered.Customer
    Order.Subtotal = ProductOrdered.ProductSubtotal
    Order.Address = ShippingAddress
}
export default PlaceSingleProduct