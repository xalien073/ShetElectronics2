<template>
  <div class="row m-0">
    <div class="col-12" v-show="NoResultsFound">
      <h3 class="text-center text-warning">Results not found!</h3>
    </div>
    <template v-if="SearchResults.length">
      <div class="col-lg-2"></div>
      <div id="Results" class="col-lg-8">
        <ul>
          <li>All</li>
          <li>Categories</li>
          <li>Brands</li>
          <strong>
          Price: from Rs
            <input type="tel" v-model.number="from" @keypress.enter="" placeholder="0">
            to Rs
            <input type="tel" v-model.number="to" @keypress.enter="" placeholder="1,00,00,000">
            </strong>
        </ul>
        <h4 class="text-center mb-3">
          Found {{ ResultsFound }} results, for {{ Query }}!
        </h4>
        <template v-for="R in SearchResults" :key="R.product_id">
          <div class="row mb-3">
            <searchedProduct :product="R" />
          </div>
        </template>
      </div>
      <div class="col-lg-2"></div>
      <div class="col-4 p-0">
        <button
          v-show="PreviousPage"
          @click="GetPreviousPage"
          class="btn btn-primary btn-block"
        >
          Previous
        </button>
      </div>
      <div class="col-4"></div>
      <div class="col-4 p-0">
        <button v-show="NextPage" @click="GetNextPage"
        class="btn btn-primary btn-block">
          Next
        </button>
      </div>      
    </template>
    <template v-else-if="!NoResultsFound">
      <LoadingSpinner />
    </template>
  </div>
</template>
     
<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SearchedProduct from "@/components/SearchedProduct.vue";
export default {
  name: "SearchResults",
  props: [
    "SearchResults",
    "NoResultsFound",
    "ResultsFound",
    "Query",
    "PreviousPage",
    "NextPage",
  ],
  components: { LoadingSpinner, SearchedProduct },
  data() {
    return {
      from: "",
      to: ""
    }
  },
  methods: {
    GetPreviousPage() {
      this.$emit("prev");
    },
    GetNextPage() {
      this.$emit("next");
    },
  },
};
</script>

<style lang="scss">
#Results {
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;

    li {
      list-style: none;
      padding: .5rem 1rem;
      cursor: pointer;
      border: .3rem groove var(--secondary-color);
      border-radius: 5rem;
      font-size: 2rem;
      font-weight: 900;

      &:hover {
        color: $hvr-clr;
        border-color: $hvr-clr;
      }
    }
    strong {
      font-size: 2rem;
    input {
      width: 8rem;
      letter-spacing: 0;
      color: var(--secondary-color);
      background: transparent;
      border: .3rem groove var(--secondary-color);
      border-radius: 1rem;
      font-size: 2rem; 
      font-weight: 900;
    }
    }
  }
}
</style>