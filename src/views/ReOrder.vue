<template>
  <BuyProduct :ProductStr="ProductStr" />
</template>

<script>
import BuyProduct from '@/components/BuyProduct.vue';
export default {
  name: "ReOrder",
  props: ['ProductStr'],
  components: {BuyProduct},
  created() {
    if (!this.ProductStr) {
      this.$router.go(-1)
    }
  },
};
</script>
