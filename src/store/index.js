import { createStore } from 'vuex'
import PriceFormater from '@/composables/PriceFormater'

export default createStore({
  state: {
    User: null,
    Cart: {'subtotal': 0, 'products': [], 'forLater': []},
    CartIsEmpty: false,
    CSRFToken: null,
    DarkTheme: false
  },
  getters: {
    User: (state) => {
      return state.User;
    },
    Cart: (state) => {
      return state.Cart;
    },
    CartSubtotal: (state) => {
      return PriceFormater(state.Cart.subtotal)
    },
    CartIsEmpty: (state) => {
      return state.CartIsEmpty;
    },
    CSRFToken: (state) => {
      return state.CSRFToken;
    },
    DarkTheme: (state) => {
      return state.DarkTheme;
    }
  },
  mutations: {
    User(state, User) {
      state.User = User;
    },
    Cart(state, Cart) {
      state.Cart.products = Cart.products;
      state.Cart.subtotal = Cart.subtotal;
      state.Cart.forLater = Cart.forLater;
      if(Cart.products.length) {
        state.CartIsEmpty = false
      }
      else{state.CartIsEmpty = true}
    },
    CartIsEmpty(state, CartIsEmpty) {
      state.CartIsEmpty = CartIsEmpty;
    },
    AddProduct(state, payload) {
      state.Cart.products.push(payload)
      state.Cart.subtotal += payload.ProductSubtotal;
    },
    UpdateProduct(state, payload) {
      state.Cart.products[payload.CartIndex].qty = payload.UpdatedQty
      state.Cart.products[payload.CartIndex].ProductSubtotal = payload.UpdatedSubtotal
      state.Cart.subtotal += payload.CartSubtotal;
    },
    DeleteProduct(state, payload) {
      state.Cart.products.splice(payload.key, 1);
      state.Cart.subtotal -= payload.ProductSubtotal;
    },
    AddForLater(state, payload) {
      state.Cart.forLater.push(payload)
    },
    DeleteForLater(state, key) {
      state.Cart.forLater.splice(key, 1) 
    },
    CSRFToken(state, CSRFToken) {
      state.CSRFToken = CSRFToken;
    },
    DarkTheme(state, DarkTheme) {
      state.DarkTheme = DarkTheme;
    }
  },
  actions: {
    User(context, User) {
      context.commit('User', User);
    },
    Cart(context, Cart) {
      context.commit('Cart', Cart);
    },
    CartIsEmpty(context, CartIsEmpty) {
      context.commit('CartIsEmpty', CartIsEmpty);
    },
    AddProduct(context, payload) {
      context.commit('AddProduct', payload)
    },
    UpdateProduct(context, payload) {
      context.commit('UpdateProduct', payload)
    },
    DeleteProduct(context, payload) {
      context.commit('DeleteProduct', payload)
    },
    AddForLater(context, payload) {
      context.commit('AddForLater', payload)
    },
    DeleteForLater(context, key) {
      context.commit('DeleteForLater', key)
    },
    CSRFToken(context, CSRFToken) {
      context.commit('CSRFToken', CSRFToken);
    },
    DarkTheme(context, DarkTheme) {
      context.commit('DarkTheme', DarkTheme);
    }
  },
  modules: {
  }
})
