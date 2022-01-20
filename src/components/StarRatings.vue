<template>
    <form @submit.prevent="RateProduct">
        <div class="rating-wrapper">
            <input type="radio" v-model="Stars" value="5" id="1"><label for="1"></label>
            <input type="radio" v-model="Stars" value="4" id="2"><label for="2"></label>
            <input type="radio" v-model="Stars" value="3" id="3"><label for="3"></label>
            <input type="radio" v-model="Stars" value="2" id="4"><label for="4"></label>
            <input type="radio" v-model="Stars" value="1" id="5"><label for="5"></label>    
        </div>
        <textarea v-model.lazy="Review" cols="58" rows="2"
        class="m-1" placeholder="Tell us about your product experience!">
        </textarea>
        <div class="text-center">
        <strong v-if="Warn" class="text-warning">Please select a star to rate!</strong>
        </div>
        <button type="submit" class="btn btn-block btn-primary">Submit</button>
    </form>        
</template>

<script>
export default {
    name: "StarRatings",
    props: ["product", 'User'],
    data() {
        return {
            Review: '',
            Stars: 0,
            Warn: false
        }
    },
    methods: {
        RateProduct() {
            if (this.Stars !== 0) {
            const Review = {
                product: this.product,
                reviewer: this.User,
                review: this.Review,
                stars: this.Stars
            }
            axios({
                method: 'post',
                url: "star-ratings/",
                data: Review
            })
            .then((res) => this.$emit('close')
            )
            .catch((err) => console.log(err))
            this.Warn = false
            }else {
                this.Warn = true
            }
        }
    }

}
</script>

<style lang="scss">
.rating-wrapper {
    direction: rtl;
    position: relative;
    
    input {
    display: none;
}
label {
    display: inline-block;
    width: 20%;
    cursor: pointer;
    position: relative;
}
label::before {
    content: "\2605";
    font-size: 12rem;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
}
label::after {
    content: "\2605";
    font-size: 12rem;
    display: inline-block;
    color: gold;
    opacity: 0;
    position: relative;
}
label:hover:after,
label:hover ~ label:after,
input:checked ~ label:after {
    opacity: 1;
}
label[for="3"] {
    top: -3.9rem;
}
label[for="2"],
label[for="4"] {
    top: -2.5rem;
}
}
</style>