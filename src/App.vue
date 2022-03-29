<template>
<userinfo></userinfo>
  
  <h1 id="banner">Database of Shanghai Cultural Heritage Sites</h1>
  <div id="bannner_pic"></div>
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
  color: #0b5744;
}

#nav {
  margin: auto;
  /* text-align: justify; */
  padding: 30px 0 20px 0;
  width: 100%;

}

a {
  color: #000000;
  text-decoration: underline;
}

#nav a {
  padding: 10px 5% 10px 5%;
  background-color: rgb(169, 190, 179);
  text-decoration: none;
  text-align: center;
  display: inline-block;
  color: #eff8f6;
  width: 15%;
  font-family: Georgia, Times, 'Times New Roman', serif;
  font-weight: bold;
}

#nav a.router-link-active {
  /* color: #42b983; */
  font-weight: bold;
  background-color: rgb(74, 128, 111);
}

#banner {
  display: block;
  font-family:Georgia, 'Times New Roman', Times, serif;
  /* font-size; */
  margin-bottom: 0
}

#banner_pic {
  width: 500px;
  height: 100px;
  display: block;
  position: absolute;
  background: #358073;
}
</style>
