<template>
  <div class="home">
    <h2>Home</h2>
    
  </div>
  <Search />
</template>

<script>
import { db } from '../main.js'
import Search from '../components/Search.vue'



export default {
  
  name: 'Home',
  data() {
      return {
        resultJSON: {}
      }
    },
  
  components: {Search},
}


</script>
