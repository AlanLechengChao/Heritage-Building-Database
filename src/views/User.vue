<template>
  <h2>User profile</h2>

  <h3>Basic information</h3>
  <p>
    The following information is pulled from Google Authentication and cannot be
    altered.
  </p>
  <table>
    <colgroup>
      <col style="width: 10em" />
      <col style="width: 16em" />
    </colgroup>
    <tr>
      <td>Full Name</td>
      <td>{{ authUserData.displayName }}</td>
    </tr>
    <tr>
      <td>Email</td>
      <td>{{ authUserData.email }}</td>
    </tr>
  </table>

  <h3>Role</h3>
  <p>
    User role data is managed by the website administrator.
  </p>
  <table>
    <colgroup>
      <col style="width: 10em" />
      <col style="width: 16em" />
    </colgroup>
    <tr>
      <td>Role</td>
      <td>{{ userData.role }}</td>
    </tr>
  </table>

</template>

<script>
import { db } from "../main.js";

export default {
  name: "User",
  data() {
    return {
      id: this.$route.params.id,
      authUserData: null,
      userData: null,
    };
  },
  created() {
    const firebase_auth_user = firebase.auth().currentUser;
    this.authUserData = firebase_auth_user;


    db.collection(`users`).doc( this.id ).get().then((result) => {
            if (result.exists) {
                //console.log("Document data:", result.data());
                this.userData = result.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
        }
        })






    this.userData = db.collection("users").doc(this.id).get();

    console.log(this.userData);
  },
};
</script>

<style>
</style>