<template>
  <h2>Login</h2>
  <section id="firebaseui-auth-container"></section>
</template>

<script>
import { db } from '../main.js'
// import Login from '../components/Login.vue'

export default {
    name: "Login", 
    mounted() {
      console.log('run')
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        var uiConfig = {
            signInSuccessUrl: "/", // This redirect can be achived by route using callback.
            signInFlow: "popup",
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
}
</script>

<style>

</style>