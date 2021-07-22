<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/buildings">Buildings</router-link>
    <router-link to="/lists">Lists</router-link>
    <router-link to="/maps">Maps</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  padding: 10px 20px 10px 20px;
  background-color: rgb(230, 230, 230);
  text-decoration: none;
  display: inline-block;
  
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
  font-weight: bold;
  background-color: lightgray;
}
</style>
