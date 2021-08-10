<template>
  <h2>User profile</h2>
  <p>The following information is pulled from Google Login and cannot be altered. </p>
  <table>
          <colgroup>
            <col style="width: 10em;">
            <col style="width: 16em;">
          </colgroup>
          <tr>
              <td>Display Name </td>
              <td>{{ userData.displayName }}</td>
          </tr>
          <tr>
              <td>Email</td>
              <td>{{ userData.email }}</td>
          </tr>
      </table>
</template>

<script>

import { db } from '../main.js'

export default {
    name: "User", 
    data() {
        return {
            id: this.$route.params.id, 
            userData: null
        }
    },
    created() {
        const user = firebase.auth().currentUser;
        this.userData = user; 

        // db.collection('users').doc(this.id).get().then((result) => {
        //     this.userData = result.data();
        // })
    }
}
</script>

<style>

</style>