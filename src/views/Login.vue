<template>
  <h2>Login</h2>
  <Login />
</template>

<script>
import { db } from '../main.js'
import Login from '../components/Login.vue'

export default {
    name: "Login", 
    components: {Login},
}
</script>

<style>

</style>