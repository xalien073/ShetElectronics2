<template>
  <nav
    id="navbar"
    class="navbar navbar-expand-sm navbar-dark bg-dark text-light w-100 p-0"
  >
    <div class="navbar-collapse">
      <div class="left-nav">
        <strong id="menu" @click="openNav"> &#9776;</strong>
      <router-link :to="{ name: 'Home' }" class="navbar-brand">
        <h1>Shet</h1>
      </router-link>
      </div>
      <form class="form-inline">
        <input
          @keydown.enter.prevent="Search"
          v-model="Query"
          id="search"
          class="form-control bg-dark"
          placeholder="Search"
          aria-label="Search"
          required
        />
        <button @click="Search" id="searchBtn" class="text-light">
          <i class="fa fa-search"></i>
        </button>
      </form>
      <div class="right-nav">
        <template v-if="User">
          <strong> Hello, {{ Hello }} </strong>

          <router-link :to="{ name: 'Cart' }">
            <i class="fa fa-shopping-cart">
              <span>{{ CartCount }} </span>
            </i>
          </router-link>

          <span>
            <i
              v-if="DarkTheme"
              @click="$store.dispatch('DarkTheme', false)"
              class="fa fa-sun"
            ></i>
            <i
              v-else
              @click="$store.dispatch('DarkTheme', true)"
              class="fa fa-moon"
            ></i>
          </span>
        </template>
        <strong v-else id="auth">
          <span @click="ToggleSignUp"> Sign Up </span>/
          <span @click="ToggleLogIn"> Log In- </span>
          <i class="fa fa-user"></i>
        </strong>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  props: ["User", "CartCount"],
  data() {
    return {
      Query: "",
    };
  },
  computed: {
    Hello() {
      if (this.User.first_name.length > 7) {
        return this.User.first_name.substring(0, 6) + "..";
      } else {
        return this.User.first_name;
      }
    },
    ...mapGetters(["DarkTheme"]),
  },
  watch: {
    DarkTheme: {
      handler() {
        if (this.DarkTheme) {
          document.body.classList.add("dark-theme");
          //document.querySelectorAll("#app>.btn").style.background = "none";
          if (!localStorage.getItem("DarkTheme")) {
            localStorage.setItem("DarkTheme", true);
          }
        } else {
          document.body.classList.remove("dark-theme");
          localStorage.removeItem("DarkTheme");
        }
      },
      immediate: true,
    },
  },
  methods: {
    Search() {
      if (this.Query !== "") {
        this.$emit("search", this.Query);
      }
    },
    ToggleSignUp() {
      this.$emit("signup");
    },
    ToggleLogIn() {
      this.$emit("login");
    },
    openNav() {
      document.querySelector("#mySidenav").style.width = "25rem";
      document.querySelector("#main").style.marginLeft = "25rem";
      document.querySelector(".sidenav").style.borderWidth = ".3rem";
      document.querySelector("#backdrop").style.width = "100%";
    },
  },
};
</script>

<style lang="scss">
#navbar {
  position: fixed;
  top: 0;
  z-index: 1;
  border: .3rem solid $hvr-clr;
  border-top: none;
  border-radius: 0.8rem;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  height: 14vh;
  align-items: center;

  a {
    color: #f8f9fa;

    &:hover {
      color: $hvr-clr;
    }
  }
  #menu {
    font-size: 5rem;
    font-weight: 900;
    cursor: pointer;

    &:hover {
      color: $hvr-clr;
    }
  }
  .navbar-brand h1 {
    font-size: 5.25rem;
    font-weight: bolder;
    margin-left: 1rem;
  }
  form {
    position: absolute;
    width: 49vw;
    left: 20vw; 
  }

  #search {
    color: #f8f9fa;
    border: 0.3rem solid #f8f9fa;
    border-radius: 5rem;
    height: 100%;
    width: 100%;
    font-size: 3rem;
  }
  #search::placeholder,
  #search::-webkit-input-placeholder {
    color: #f8f9fa;
  }
  #searchBtn {
    padding: 0 1rem;
    cursor: pointer; 
    position: absolute;
    right: .5rem;
    height: 91%;
    font-size: 2.5rem;
    border: 0.3rem solid #f8f8f9fa;
    background: transparent;
    border-right: none; 
    border-radius: 1.5rem;
  }
  .right-nav, .left-nav {
    height: 100%;
    width: 27vw;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
  }
  .right-nav {
    right: .5rem;
    justify-content: space-between;

    strong {
      font-size: 2.5rem;
    }
    a {
      font-size: 3rem;
      position: relative;
      top: .75rem;

      span {
        font-size: 2.5rem;
        position: absolute;
        top: -1.5rem;
        right: 1rem;
      }
    }
    span i {
      font-size: 4.5rem;
      cursor: pointer;
    }

    #auth, #auth i {
      position: absolute;
    } 
    #auth {
      font-size: 3rem;
      right: 4rem;
      cursor: pointer;

      i {
        font-size: 5rem;
      }
      &:hover {
        color: $hvr-clr;
      }
    }
  }
  .left-nav {
    left: .5rem;
  }

@media (min-height: 1360px) {
  height: 5vh;
}
  @media (max-width: 998px) {
    height: 13vh;

    form {
      bottom: 1vh;
      left: 2vw;
      width: 95vw;
    }
    .right-nav, .left-nav {
      height: 50%;
      width: 47vw;
    }
  }
}
</style>