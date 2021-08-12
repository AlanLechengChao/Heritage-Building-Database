<template>
  <h1 v-if="buildingData">Editing: {{ buildingData.current_name }}</h1>
  <h1 v-else>Loading...</h1>

  <div id="building-details-map">map placeholder</div>
  <div v-if="buildingData" id="basicInformation">
    <h3>Basic Information</h3>
    <table>
      <colgroup>
        <col style="width: 10em" />
        <col style="width: 16em" />
      </colgroup>
      <tr>
        <td>Current Name</td>
        <td><input v-model="buildingData.current_name" /></td>
        <td></td>
      </tr>
      <!--tr>
              <td>Former Names</td>
              <td>{{ buildingData.former_names }}</td>
              
          </tr>
          <tr>
              <td>English Names</td>
              <td>{{ buildingData.english_names }}</td>
              
          </tr-->
      <!--tr>
        <td>Current Address</td>
        <td>{{ buildingData.current_address }}</td>
      </tr-->
      <tr>
        <td>
          <button @click="writeToDb">Save</button><br /><button>Reset</button>
        </td>
      </tr>
    </table>
    <!--h3>Lists including the building</h3>
    <div v-if="buildingData" id="listIncluding">
      <router-link
        :to="{ name: 'ListDetails', params: { id: d } }"
        v-for="d in buildingData.designations"
        :key="d"
        >{{ d }}</router-link
      >
    </div-->
  </div>
</template>

<script>
import { db } from "../main.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      buildingData: null,
    //   newBuildingData: null,
      uid: null,
    };
  },
  mounted() {
    this.uid = firebase.auth().currentUser.uid;
    console.log(this.id);
    if (this.id !== "new") {
      console.log("update");
      db.collection("buildings")
        .doc(this.id)
        .get()
        .then((result) => {
          this.buildingData = result.data();
        //   this.newBuildingData = {
        //     current_name: this.buildingData.current_name,
        //     current_address: this.buildingData.current_address,
        //   };
          console.log(this.buildingData);
        });
    } else {
      this.buildingData = {
        current_name: "",
        current_address: [""],
      };
    }
  },
  methods: {
    writeToDb() {
      if (this.id !== "new") {
        var building_ref = db.collection("buildings").doc(this.id);
        console.log("write: update");

        // var newBuildingData = {
        //     "last_edited_by": this.uid, 
        //     "timestamp": firebase.firestore.Timestamp.now(), 
        //     "current_name": this.buildingData.current_name, 
        //     "current_address": JSON.parse(JSON.stringify(this.buildingData.current_address))
        // }; 

        var newBuildingData = this.buildingData; 

        console.log(newBuildingData);

        building_ref
          .set( newBuildingData , { merge: true })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      } else {
        console.log(this.buildingData);

        // db.collection("buildings")
        //   .add(
        //     this.buildingData
        //     // name: "Tokyo",
        //     // country: "Japan",
        //   )
        //   .then((docRef) => {
        //     console.log("Document written with ID: ", docRef.id);

        //     //vue router to building with new ID
        //   })
        //   .catch((error) => {
        //     console.error("Error adding document: ", error);
        //   });
      }
    },
  },
};
</script>

<style scoped>
#listIncluding a {
  display: block;
  color: #2c3e50;
  text-decoration: underline;
}

#building-details-map {
  background-color: rgb(206, 206, 206);
  float: right;
  margin-right: 0em;
  width: 30%;
  color: rgb(0, 0, 0);
  height: 500px;
}

#basicInformation {
  margin-left: 0em;
}
</style>