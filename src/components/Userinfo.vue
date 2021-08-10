<template>
    <div id="userinfo">
        <span v-if="user">
            <router-link :to="{name: 'User', params: { id: user.uid} }" > {{user.email}}  </router-link> <button @click="signoutButtonPressed">Log out</button></span>
        <span v-else><button @click="LoginButtonPressed">Log in</button></span>
    </div>
</template>

<script>
// Userinfo component shows the currently logged in user 
// on top of the page
export default {
    name: "Userinfo",
    data() {
        return {
            user: null
        };
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
            //console.log(this.user);
            this.$emit('userStateChange', user);
        });
    },
    methods: {
        signoutButtonPressed(e) {
            e.stopPropagation();
            firebase.auth().signOut();
            this.user = null; 
            this.$router.push({ name: "Login" }); 
        }, 
        LoginButtonPressed(e) {
            e.stopPropagation();
            this.$router.push({ name: "Login" });
        }
    }
};
</script>

<style scoped>
#userinfo{
  width: 100%;
  padding: 0;
  margin: 0;
  text-align: right;
  white-space:nowrap; 
  overflow:hidden; 
}
</style>