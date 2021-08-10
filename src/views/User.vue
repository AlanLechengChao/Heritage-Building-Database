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

  <h3>Preferences</h3>
  <p>
    You can set up your screen name here. If you do not set up a screen name,
    your full name as shown above will be displayed on the database.
  </p>
  <table>
    <colgroup>
      <col style="width: 10em" />
      <col style="width: 16em" />
    </colgroup>
    <tr>
      <td>Screen Name</td>
      <td>TODO: Editable screen name</td>
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

    const userRef = db.collection("users").doc(this.id);
    console.log(this.id);

    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },
};
</script>

<style>
</style>