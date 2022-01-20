<template>
  <form @submit.prevent="LogIn" id="LogIn">
      <div class="form-group row mx-0">
        <label for="LEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            required
            v-model="Email"
            type="email"
            class="form-control"
            id="LEmail"
            placeholder="your@email.com"
          />
        </div></div>
      
      <div class="form-group row mx-0">
        <label for="LPassword" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input
            required
            v-model="Password"
            type="password"
            class="form-control"
            id="LPassword"
            placeholder="Password"
          />
        </div></div>
      
      <div class="dropdown-divider"></div>
      <div class="text-center">
      <h6><a href="#" @click="$emit('signup')">New to Shet? Sign Up</a></h6>
      <h6><a href="#">Forgot password?</a></h6>
      <strong v-show="Warn" class="text-warning">{{ Warning }}</strong>
      </div>
      <button class="btn btn-block btn-primary mt-2">Log In</button>
    </form>
</template>

<script>
import AuthData from '@/mixins/AuthData';
import UserProfile from '@/composables/UserProfile';
export default {
  name: "LogIn",
  mixins: [AuthData],
  methods: {
    LogIn() {
      this.Warn = false;
      axios({
        method: "post",
        url: "log-in",
        data: {
          email: this.Email,
          password: this.Password,
        },
      })
        .then((res) => {
          if (res.data.id) {
            UserProfile(res.data)
            this.$emit("login")
          }else{
            this.Warn = true
            this.Warning = res.data
          }
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>
