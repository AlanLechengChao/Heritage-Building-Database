<template>

  
  <div id="banner_box">
    <userinfo></userinfo>
    <h1 id="banner">Database of Shanghai Cultural Heritage Sites</h1>
  </div>
  
  <!-- <img id="banner_pic" src="https://raw.githubusercontent.com/AlanLechengChao/Heritage-Building-Database/main/banner.jpeg" alt=""> -->
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

body {
  margin-top: 0;
}

#app {
  margin: auto;
  max-width: 80%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #064434;
}

#nav {
  margin: auto;
  /* text-align: justify; */
  padding: 0 0 20px 0;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 99;
  
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
  transition: 1s all;
  /* color: #42b983; */
  font-weight: bold;
  background-color: rgb(30, 155, 115);
}

#banner {
  /* display: inline-block; */
  font-size: 3em;
  /* color:; */
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-weight: 900;
  /* font-size; */
  color: rgb(251, 251, 251);
  margin-bottom: 0;
  /* margin-left: 20px; */
  position: absolute;
  bottom: 5%;
  text-align: center;
  /* margin: auto; */
  /* margin-top: 0; */
}

#banner_box {
  /* width: 100%; */
  
  height: 180px;
  position: relative;
  background-image: url("https://raw.githubusercontent.com/AlanLechengChao/Heritage-Building-Database/main/banner.jpeg");
  background-size: cover;
  background-position-y: 30%;
}

#banner_pic {
  width: 100%;
  /* height: 100px; */
  display: block;
  /* position: absolute; */
  /* background: #358073; */
}
</style>
