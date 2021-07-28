<template>
<userinfo></userinfo>
  
  
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/buildings">Buildings</router-link>
    <router-link to="/lists">Lists</router-link>
    <router-link to="/maps">Maps</router-link>
  </div>
  
  <router-view/>
</template>


<script>

import Userinfo from "@/components/Userinfo.vue";

export default {
  name: 'App',
  components:{
    Userinfo
  }, 
  mounted() {
    // console.log(this.$db)
  }
  // data () {
  //   return {

  //   }
  // }
}
</script>

<style>
#app {
  margin: auto;
  max-width: 80%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  margin: auto;
  /* text-align: justify; */
  padding: 30px 0 20px 0;
  width: 100%;
}

#nav a {
  padding: 10px 5% 10px 5%;
  background-color: rgb(230, 230, 230);
  text-decoration: none;
  text-align: center;
  display: inline-block;
  color: #2c3e50;
  width: 15%;
}

#nav a.router-link-active {
  /* color: #42b983; */
  font-weight: bold;
  background-color: lightgray;
}
</style>
