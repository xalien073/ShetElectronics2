<template>
  <div class="col-lg-6">
    <h3 class="text-center text-lg-left ml-lg-3 my-4">Deliver to:</h3>
    <template v-if="Addresses.length">   
      <div class="overflow-auto pr-2">
        <template v-for="A in Addresses" :key="A.id">
          <div class="mb-4 p-3">
            <h3 class="text-left ml-4">
              <input type="radio" :value="A.id" v-model="ShippingAddress" />
              <span class="ml-3">{{ A.Name }}</span>
            </h3>
            <AddressDetails :A="A" />
          </div>
        </template>
      </div>
    </template>
    <div v-else-if="Addresses.length === 0"
      class="text-center">
          <strong id="Q">?</strong>
    </div>   
    <button @click="ToggleAddressForm"
    class="btn btn-block btn-primary">
      Add address
    </button>
  </div>
  <Modal :Show="ShowAddressForm" Title="Add Address" @close="ShowAddressForm=false">
    <AddressForm :User="User" @save-address="AddAddress" />
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import AddressForm from "@/components/AddressForm.vue";
import AddressDetails from "@/components/AddressDetails.vue";
export default {
  name: "Addresses",
  components: {Modal, AddressForm, AddressDetails },
  props: ["User"],
  emits: ["shippingaddress"],
  data() {
    return {
      ShowAddressForm: false,
      Addresses: [],
      ShippingAddress: "",
    };
  },
  watch: {
    ShippingAddress() {
      this.$emit("shippingaddress", this.ShippingAddress);
    },
  },
  created() {
    this.GetAddresses();
  },
  methods: {
    ToggleAddressForm() {
      this.ShowAddressForm = !this.ShowAddressForm;
    },
    GetAddresses() {
      axios({
        method: "get",
        url: "get-addresses/" + this.User.id,
      })
        .then((res) => (this.Addresses = res.data))
        .catch((err) => console.error(err));
    },
    AddAddress(NewAddress) {
      this.Addresses.push(NewAddress);
      this.ToggleAddressForm();
    },
  },
};
</script>