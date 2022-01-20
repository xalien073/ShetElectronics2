<template>
<teleport to="#hw">
  <div class="row m-0 order-success">
    <div class="col-12 text-center">
      <button @click="play">play</button>
      <h2>Thank you for placing order on Shet.com!</h2>
      <h3>
        Your order Id is: {{ OrderId }},
        <router-link
          :to="{ name: 'Orders' }"
          class="btn btn-primary btn-lg mx-2"
        >
          here</router-link
        >
        to check Order Status.
      </h3>
    </div>
    <DeliveryTruck />
  </div>
  </teleport>
</template>

<script>
import ad from '@/assets/truck.mp3'
import DeliveryTruck from '@/components/DeliveryTruck.vue';
export default {
  props: ["OrderId"],
  components: {DeliveryTruck},
  mounted() {
    setTimeout(this.play, 2000)
  },
  methods: {play() {console.log(ad)
     new Audio(ad).play()}}
};
</script>

<style lang="scss">
body {
  margin-top: 0;
}
#navbar {display: none;}
#app {display: none;}
.order-success {
   height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-image: url('../assets/hw.jpg');
    background-size: cover;
    .col-12 {
      color: blueviolet; 
      transform: translateY(-20vh) scale(0.5);
      animation: drop 5s 10s linear forwards 1;
      @keyframes drop {
        to {transform: translateY(50vh) scale(1.5);} 
      }
    }
  .btn {
    font-size: 2rem;

    &::before {
      content: "Click";

      @media (min-height: 1300px) {
        content: "Tap";
      }
      @media (max-width: 998px) {
        content: "Tap";
      }
    }
  }
}
</style>