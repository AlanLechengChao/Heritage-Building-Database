<template>
  <div id="userinfo">
    <el-dropdown v-if="user" trigger="click">
      <el-button type="primary" class="el-dropdown-link" size="small">
        {{ user.email }}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="profileButtonPressed"
            >My profile</el-dropdown-item
          >
          <el-dropdown-item @click="signoutButtonPressed"
            >Logout</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button size="small" v-else @click="LoginButtonPressed">Log in</el-button>

    <!-- <span v-if="user">
      <router-link :to="{ name: 'User', params: { id: user.uid } }">
        {{ user.email }}
      </router-link>
      <button @click.stop="signoutButtonPressed">Log out</button></span
    >
    <span v-else><button @click.stop="LoginButtonPressed">Log in</button></span> -->
  </div>
</template>

<script>
// Userinfo component shows the currently logged in user
// on top of the page
export default {
  name: "Userinfo",
  data() {
    return {
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      //console.log(this.user);
      this.$emit("userStateChange", user);
    });
  },
  methods: {
    signoutButtonPressed(e) {
      //e.stopPropagation();
      firebase.auth().signOut();
      this.user = null;
      this.$router.push({ name: "Login" });
    },
    LoginButtonPressed(e) {
      //e.stopPropagation();
      this.$router.push({ name: "Login" });
    },
    profileButtonPressed(e) {
      //e.stopPropagation();
      this.$router.push({ name: "User", params: { id: this.user.uid } });
    },
  },
};
</script>

<style scoped>
#userinfo {
  width: 100%;
  padding: 0;
  margin: 0;
  text-align: right;
  display: inline-block;
}

.el-dropdown-menu li{
    font-family: Helvetica, Arial, sans-serif;
}
</style>