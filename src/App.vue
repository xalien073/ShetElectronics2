<template>
  <NavBar
    :User="User"
    :CartCount="CartCount"
    @signup="ToggleSignUp"
    @login="ToggleLogIn"
    @search="Search"
  />
  <SideNavBar :User="User" />
  <!-- <a href="http://localhost:8000/admin/" target="_blank">
    <button class="btn btn-dark btn-block">admin</button>
  </a> -->
  <main class="container-fluid m-0 py-5">
    <router-view id="main" v-slot="{ Component }"
      :Query="Query"
      :SearchResults="SearchResults"
      :ResultsFound="ResultsFound"
      :NoResultsFound="NoResultsFound"
      :PreviousPage="PreviousPage"
      :NextPage="NextPage"
      @prev="GetPreviousPage"
      @next="GetNextPage"
      @login="ShowLogIn = true"
    >
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
    </router-view>
  </main>
  <teleport to="footer">
  <Footer />
  </teleport>
  <a href="" id="CtA" target="_blank">
    <i class="fab fa-whatsapp"></i>
  </a> 
  <Modal :Show="ShowSignUp" Title="Sign Up" @close="ShowSignUp=false">
    <SignUp @created="ToggleSignUp" />
  </Modal>
  <Modal :Show="ShowLogIn" Title="Log In" @close="ShowLogIn=false">
    <LogIn @login="ToggleLogIn" @signup="ShowLogIn=false, ShowSignUp=true" />
  </Modal>
</template>

<script>
import GetCSRFToken from "@/composables/csrftoken";
import GetCart from "@/composables/GetCart";
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
import SideNavBar from "@/components/SideNavBar.vue";
import Footer from '@/components/Footer.vue';
import SignUp from "@/components/SignUp.vue";
import LogIn from "@/components/LogIn.vue";
import Modal from "@/components/Modal.vue";
export default {
  components: { NavBar, SideNavBar, Footer, SignUp, LogIn, Modal },
  data() {
    return {
      Query: "",
      SearchResults: [],
      ResultsFound: null,
      NoResultsFound: true,
      CurrentPage: 1,
      PreviousPage: false,
      NextPage: false,
      ShowSignUp: false,
      ShowLogIn: false,
    };
  },
  created() {
    if (localStorage.getItem("User") !== null) {
      const User = JSON.parse(localStorage.getItem("User"));
      this.$store.dispatch("User", User);
      GetCart(User.id);
    }
    GetCSRFToken();
    if (localStorage.getItem('DarkTheme')) {
      this.$store.dispatch("DarkTheme", true)
    }
  },
  computed: {
    ...mapGetters(["User", "Cart"]),
    CartCount() {
      if(this.Cart.products) {
      return this.Cart.products.length
      }
      else{return 0}
    }
  },
  methods: {
    ToggleSignUp() {
      this.ShowSignUp = !this.ShowSignUp;
    },
    ToggleLogIn() {
      this.ShowLogIn = !this.ShowLogIn;
    },
    Search(Query) {
      axios({
        method: "get",
        url: `search/?search=${Query}`,
      })
        .then((res) => {
          this.PreviousPage = this.NextPage = false;
          if (res.data.results.length !== 0) {
            this.SearchResults = res.data.results;
            this.NoResultsFound = false;
            if (res.data.next) {
              this.NextPage = true;
            }
          } else {
            this.NoResultsFound = true;
            this.SearchResults = [];
          }
          this.Query = Query;
          this.$router.push({ name: "SearchResults" });
          this.ResultsFound = res.data.count;
          this.CurrentPage = 1;
        })
        .catch((err) => console.error("error", err));
    },
    GetPreviousPage() {
      this.CurrentPage -= 1;
      this.Pagination();
    },
    GetNextPage() {
      this.CurrentPage += 1;
      this.Pagination();
    },
    Pagination() {
      axios({
        method: "get",
        url: "search/?page=" + this.CurrentPage + "&search=" + this.Query,
      })
        .then((res) => {
          this.SearchResults = res.data.results;
          this.PreviousPage = this.NextPage = false;
          if (res.data.previous) {
            this.PreviousPage = true;
          }
          if (res.data.next) {
            this.NextPage = true;
          }
        })
        .catch((err) => console.error("error", err));
    },
  },
};
</script>

<style lang="scss">
/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: all .4s;
}
#CtA {
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  font-size: 5rem;
}

// route animation
.route-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.route-enter-active {
  transition: all .5s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.route-leave-active {
  transition: all .5s ease-in;
}
</style>
