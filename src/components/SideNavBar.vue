<template>
  <div id="backdrop" class="backdrop" @click.self="closeNav">
    <div id="mySidenav" class="sidenav bg-dark">
      <a href="javascript:void(0)" class="closenav" @click="closeNav">
        &times;
      </a>
      <figure id="profile-img">
        <img
          v-if="User"
          :src="User.profile_image"
          class="rounded-circle img-fluid w-100"
          :alt="User.first_name"
        />
        <img
          v-else
          src="@/assets/user.jpeg"
          class="rounded-circle img-fluid w-100"
          alt="User"
        />
      </figure>
      <router-link v-show="User" :to="{ name: 'MyAccount' }"
        >My Account</router-link
      >
      <router-link :to="{ name: 'About' }">About Us</router-link>
      <router-link to="/contact">Contact Us</router-link>
      <router-link v-show="User" @click="LogOut" to="/">Log Out</router-link>
    </div>
  </div>
</template>

<script>
import GetCSRFToken from "@/composables/csrftoken";
export default {
  name: "SideNavBar",
  props: ["User"],
  methods: {
    closeNav() {
      document.querySelector("#mySidenav").style.width = "0";
      document.querySelector("#main").style.marginLeft = "0";
      document.querySelector(".sidenav").style.borderWidth = "0";
      document.querySelector("#backdrop").style.width = "0";
    },
    LogOut() {
      this.$store.dispatch("User", null);
      this.$store.dispatch("Cart", []);
      localStorage.removeItem("User");
      axios({
        method: "get",
        url: "log-out",
      })
        .then(GetCSRFToken())
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style lang="scss">
#backdrop {
  width: 0;

  /* The side navigation menu */
  .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 3; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 6rem; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    border: 0 groove #f8f9fa;
    border-left: none;
    border-radius: 2rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0; 

    /* The navigation menu links */
    a {
      padding: 0.8rem 0.8rem 0.8rem 3.2rem;
      font-size: 2.5rem;
      color: #f8f9fa;
      display: block;
      transition: 0.3s;

      /* When you mouse over the navigation links, change their color */
      &:hover {
        color: $hvr-clr;
      }
    }
    /* Position and style the close button (top right corner) */
    .closenav {
      position: absolute;
      top: 0;
      right: 1.5rem;
      font-size: 5.5rem;
      margin-left: 5rem;
      padding: 0;
    }
    #profile-img {
      margin: 0 3.5rem;
    }
    /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
    @media screen and (max-height: 450px) {
      padding-top: 1.5rem;

      a {
        font-size: 1.8rem;
      }
    }
  }
}
/* side menu ends  */
</style>