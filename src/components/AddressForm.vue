<template>
  <form @submit.prevent="SaveAddress">
    <div class="form-row mx-0">
      <div class="form-group col-md-6">
        <input
          type="text"
          id="FirstName"
          class="form-control"
          v-model="FirstName"
          placeholder="First Name"
          required
        />
      </div>
      <div class="form-group col-md-6">
        <input
          type="text"
          id="LastName"
          class="form-control"
          v-model="LastName"
          placeholder="Last Name"
          required
        />
      </div>
        <div class="form-group col-md-12">
          <input
            type="email"
            id="Email"
            class="form-control"
            v-model="Email"
            placeholder="Email"
          />
        </div>
        <div class="form-group col-md-12">
          <input
        type="text"
        id="Address"
        class="form-control"
        v-model="Address"
        placeholder="Flat No, Society or Office"
        required
      />
    </div>
    <div class="form-group col-md-12">
      <input
        type="text"
        id="Address2"
        class="form-control"
        v-model="Address2"
        placeholder="Area & Landmark"
        required
      />
    </div>
    <div class="form-row">
      <div class="form-group col-4">
        <input
          type="text"
          id="City"
          class="form-control"
          v-model="City"
          required
          placeholder="City"
        />
      </div>
      <div class="form-group col-4">
        <input
          type="tel"
          pattern="^[0-9]+$"
          minlength="6"
          maxlength="6"
          class="form-control zip"
          v-model="Zip"
          required
          placeholder="Zip Code"
        />
      </div>
      <div class="form-group col-4">
        <input
          type="text"
          ref="State"
          id="State"
          class="form-control"
          v-model="State"
          required
          placeholder="State"
        />
      </div>
    </div>
    <div class="form-group col-md-6">
      <input
        type="tel"
        pattern="^[0-9]+$"
        minlength="10"
        maxlength="10"
        id="Phone"
        class="form-control"
        v-model="Phone"
        required
        placeholder="Recipients Phone Number"
      />
    </div>
    <div class="form-group col-md-6">
      <input
        type="tel"
        ref="phone2"
        pattern="^[0-9]+$"
        minlength="10"
        maxlength="10"
        id="Phone2"
        class="form-control"
        v-model="Phone2"
        placeholder="Secondary Number(Optional)"
      />
    </div>
    <button class="btn btn-block btn-primary">Save Address</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddressForm",
  props: ["User"],
  data() {
    return {
      FirstName: "",
      LastName: "",
      Email: "",
      Address: "",
      Address2: "",
      City: "",
      State: "",
      Zip: "",
      Phone: "",
      Phone2: "",
    };
  },
  watch:{
    Phone() {
      if(this.Phone.length > 9) {
        this.$refs.phone2.focus()
      }
    },
    Phone2() {
      if(this.Phone2.length > 9) {
        this.$refs.phone2.blur()
      }
    },
    Zip() {
      if(this.Zip.length > 5) {
        this.$refs.State.focus()
      }
    }
  },
  methods: {
    SaveAddress() {
      const NewAddress = {
        User: this.User.id,
        Name: this.FirstName + " " + this.LastName,
        Email: this.Email,
        Address: this.Address + "," + "" + this.Address2,
        City: this.City,
        Zip_Code: this.Zip,
        State: this.State,
        Phone: this.Phone,
        Secondary_Phone: this.Phone2,
      };
      axios({
        method: "post",
        url: "address/",
        data: NewAddress,
      })
        .then((res) => {
          this.$emit("save-address", res.data);
        })
        .catch((err) => console.error(err.message));
    },
  },
};
</script>