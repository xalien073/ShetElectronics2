<template>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-9">
        <h2>{{ User.first_name }} {{ User.last_name }}</h2>
        <h4>{{ User.email }}</h4>
      </div>
      <div class="col-3"></div>
      <div class="col-3">
        <h3>
          <router-link :to="{ name: 'Orders' }">
          My Orders
        </router-link>
        </h3>
      </div>
      <div class="col-6">
      </div> 
    </div>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { mapGetters } from 'vuex';
export default {
  name: "MyAccount",
  components: { LoadingSpinner },
  computed: {
    ...mapGetters(["User"])
  }
};
</script>
