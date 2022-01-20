import router from '@/router'
function SaveOrder(Order) {
  axios({
    method: "post",
    url: "place-order/",
    data: Order,
  })
    .then((res) => {
      router.push({ name: 'OrderSuccess', params: { OrderId: res.data.Order_Id }})
    })
    .catch((err) => console.error(err.message));
}
export default SaveOrder