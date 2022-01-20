import store from '@/store';
function GetCart(User) {
    axios({
    method: "get",
    url: "cart/",
    })
    .then((res) => {
      store.dispatch('Cart', res.data)
    })
    .catch((err) => console.error(err))
  }
  export default GetCart