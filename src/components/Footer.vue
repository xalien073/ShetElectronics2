<template>
    <div class="row py-2 mx-0">
    <div class="col-12 col-lg-8 text-center text-lg-right">
      <h3>&copy; www.unknown.com - All rights reserved.</h3>
    </div>
    <div class="col-12 col-lg-4 text-right">
      <span>
        <a href="" target="_blank">
          <i class="fab fa-whatsapp"></i>
        </a>
        <a href="" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="" target="_blank">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="" target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" target="_blank">
          <i class="fab fa-linkedin"></i>
        </a>
      </span>
    </div>
    </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
footer {
  margin-top: auto;
  border: .3rem solid $hvr-clr;
  border-bottom: none; 

  span i {
    font-size: 3rem;
    margin: 0 .5rem;
  }
}
</style>