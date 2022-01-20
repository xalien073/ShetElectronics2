<template>
  <form @submit.prevent="SignUp" id="SignUp">
      <div class="form-row">
        <div class="form-group col-6">
        <input
          required
          type="text"
          v-model="FirstName"
          class="form-control"
          id="FirstName"
          placeholder="First Name"
        />
      </div>
        <div class="form-group col-6">
        <input
          required
          type="text"
          v-model="LastName"
          class="form-control"
          id="LastName"
          placeholder="Last Name"
        />
        </div>
      </div>
      <div class="form-row">
            <div class="form-group col-md-6">
        <input
          required
          type="tel"
          v-model="PhoneNumber"
          class="form-control"
          pattern="^[0-9]+$"
          minlength="10"
          maxlength="10"
          id="PhoneNumber"
          placeholder="Your Phone Number"
        />
      </div>
          <div class="form-group col-md-6">
        <input
          required
          type="email"
          ref="email"
          v-model="Email"
          class="form-control"
          id="Email"
          placeholder="your@email.com"
        />
          </div>
      </div>
      <div class="form-row">
            <div class="form-group col-md-6">
        <input
          required
          type="password"
          v-model="Password"
          class="form-control"
          id="Password"
          placeholder="Create Password"
        />
            </div>
              <div class="form-group col-md-6">
        <input
          required
          type="password"
          v-model="ConfirmPassword"
          class="form-control"
          id="ConfirmPassword"
          placeholder="Confirm Your Password"
        />
              </div>
      </div>
      <div class="form-check text-center m-0">
        <input type="checkbox" class="btn form-check-input" id="RM" />
        <label class="form-check-label" for="RM"> Remember me </label>
        <div>
        <strong v-show="Warn" class="text-warning">{{ Warning }}</strong>
        </div>
      </div>
      <button class="btn btn-block btn-primary mt-1">Sign Up</button>
    </form>
</template>

<script>
import AuthData from '@/mixins/AuthData';
import UserProfile from '@/composables/UserProfile';
export default {
  name: "SignUp",
  mixins: [AuthData],
  data() {
    return {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      ConfirmPassword: "",
    };
  },
  watch: {
    PhoneNumber() {
      if (this.PhoneNumber.length > 9) {
        this.$refs.email.focus()
      }
    }
  },
  methods: {
    SignUp() {
      this.Warn = false;
      if (this.Password === this.ConfirmPassword) {
        axios({
          method: "post",
          url: "sign-up",
          data: {
            first_name: this.FirstName,
            last_name: this.LastName,
            phone_number: this.PhoneNumber,
            email: this.Email,
            password: this.Password,
            confirm_password: this.Password,
          },
        })
          .then((res) => {
            if (res.data.id) {
              UserProfile(res.data)
              this.$emit("created")
            }
            if (res.data.email && res.data.phone_number) {
              this.Warn = true;
              this.Warning =
                this.Email + " & " + this.PhoneNumber + " is already taken!";
            } else {
              if (res.data.email) {
                this.Warn = true;
                this.Warning = this.Email + " is already taken!";
              }
              if (res.data.phone_number) {
                this.Warn = true;
                this.Warning = this.PhoneNumber + " is already taken!";
              }
            }
          })
          .catch((err) => console.error(err));
      } else {
        this.Warn = true;
        this.Warning =
          "Password and Confirm Password does not match, try again!";
      }
    },
  },
};
</script>

<style>
input[type="tel"] {
  letter-spacing: 2rem;
}
::placeholder {
  letter-spacing: 1px;
}
</style>
