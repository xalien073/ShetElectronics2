<template>
    <div class="container">
        <div v-for="R in Reviews" :key="R.id" class="row">
            <div class="col-2">
            <figure>
                <img :src="R.reviewer.profile_image" alt="Profile Image"
                class="rounded-circle img-fluid">    
            </figure>
            </div>
            <div class="col-10">
                <p>
                    {{R.reviewer.first_name}} rated {{R.stars}}<i class="fa fa-star"></i> at {{R.timeStamp}}
                </p>
                <p>- {{R.review}}</p>
            </div>
        </div>    
    </div>    
</template>

<script>
export default {
  name: "Reviews",
  props: ["product"],
  data() {
    return {
      Reviews: [],
    };
  },
  created() {
    axios({
      method: "get",
      url: "product-reviews/" + this.product,
    })
      .then((res) => (this.Reviews = res.data))
      .catch((err) => console.error(err));
  },
};
</script>

<style>
</style>