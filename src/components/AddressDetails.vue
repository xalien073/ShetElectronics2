<template>
<span class="p-5">
    <button v-show="!Edit&&!View" @click="View=!View"
    class="btn btn-lg btn-primary ml-5">
        View
    </button>
    <button v-show="!View&&!Edit" @click="Edit=true"
    class="btn btn-lg btn-primary ml-4">
        Edit
    </button>
</span>   
    <Modal :Show="View" :Title="A.Name" @close="View=false">
            <div class="pl-3">
            <p>{{ A.Address }}, {{A.City}} - {{ ZipCode }},</p>
            <p>{{ A.State }}.</p>
            </div>    
    </Modal>
    <Modal :Show="Edit" Title="Edit address" @close="Edit=false">
    <form @submit.prevent="UpdateAddress" id="EditAddress">
         <div class="form-row">
             <div class="form-group col-12">
        <textarea v-model.lazy="A.Address" cols="60" rows="2"
         class="form-control p-3" required
         placeholder="Flat No., Office, Area, Landmark">
         </textarea>
             </div>
         </div>
         <div class="form-row">
             <div class="form-group col-4">
        <input v-model.lazy="A.City" type="text"
        class="form-control p-2" required placeholder="City">
             </div>
              <div class="form-group col-4 px-2">
        <input v-model="A.Zip_Code" type="tel"
        pattern="^[0-9]+$" minlength="6" maxlength="6"
        class="form-control zip" required placeholder="Zip Code">
              </div>
               <div class="form-group col-4">
        <input v-model.lazy="A.State" ref="State" type="text"
        class="form-control p-2" required placeholder="State">
               </div>
         </div>
        <button class="btn btn-block btn-primary">Update</button>
    </form>
    </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
export default {
  name: "AddressDetails",
  props: ["A"],
  components: {Modal},
  data() {
      return {
          View: false,
          Edit: false
      }
  },
  computed: {
      ZipCode() {
          return this.A.Zip_Code.toString().substring(0, 3)+" "+this.A.Zip_Code.toString().substring(3, 6)
      }
  },
  watch: {
      A: {
        handler() {
          if (this.A.Zip_Code.length > 5) {
              this.$refs.State.focus()
          }
        },
        deep: true, 
      }
  },
  methods: {
      UpdateAddress() {
          this.A.Address = this.A.Address 
          this.A.City = this.A.City
          this.A.Zip_Code = this.A.Zip_Code
          this.State = this.A.State
          this.Edit = false
          this.View = true
          axios({
              method: 'patch',
              url: 'address/'+this.A.id+'/',
              data: {
                Address: this.A.Address, 
                City: this.A.City,
                Zip_Code: this.A.Zip_Code,
                State: this.A.State
              }
          })
          //.then(res => console.log(res))
          .catch(err => console.error(err))
        },
    }
};
</script>