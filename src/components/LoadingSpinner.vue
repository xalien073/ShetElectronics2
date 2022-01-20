<template>
<div class="text-center">
    <div class="spinner-border m-5" role="status">
       <span class="sr-only">Loading...</span>
   </div>
</div>   
</template>
<script>
export default {
    name: 'LoadingSpinner'
}
</script>
<style scoped>
.spinner-border,
.sr-only{
    color: deeppink;
}
</style>