<template>
  <h1 v-if="formBuildingData">
    Editing: Building: {{ formBuildingData.current_name }}
  </h1>
  <h1 v-else>Loading...</h1>
  <el-row :gutter="20">
    <el-col :span="16">
      <div class="grid-content">
        <div v-if="formBuildingData" id="basicInformation">
          <el-form
            :model="formBuildingData"
            :rules="rules"
            ref="building_form"
            label-width="200px"
          >
            <h3>Basic Information</h3>
            <el-form-item label="Current name" prop="current_name">
              <el-input v-model="formBuildingData.current_name"></el-input>
            </el-form-item>
            <p>
              For Current address, Former names, and English names, list each
              item in a new line.
            </p>
            <el-form-item label="Current address" prop="current_address">
              <el-input
                type="textarea"
                v-model="formBuildingData.current_address"
                autosize
              ></el-input>
            </el-form-item>

            <el-form-item label="Former names" prop="former_names">
              <el-input
                type="textarea"
                v-model="formBuildingData.former_names"
                autosize
              ></el-input>
            </el-form-item>

            <el-form-item label="English names" prop="english_names">
              <el-input
                type="textarea"
                v-model="formBuildingData.english_names"
                autosize
              ></el-input>
            </el-form-item>

            <h3>Geographic Information</h3>
            <el-form-item label="OpenStreetMaps Way" prop="geo_osm_way">
              <el-input v-model="formBuildingData.geo_osm_way"></el-input>
            </el-form-item>
            <h3>Description</h3>
            <el-form-item label="Description" prop="description">
              <el-input type="textarea" autosize v-model="formBuildingData.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('building_form')"
                >Confirm</el-button
              >
              <el-button @click="resetForm('building_form')">Reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div></el-col
    >
    <el-col :span="8"
      ><div class="grid-content">
        <div id="building-details-map">map placeholder</div>
      </div></el-col
    >
  </el-row>
</template>

<script>
import { db } from "../main.js";


export default {
  data() {
    return {
      id: this.$route.params.id,
      buildingData: null, // buildingData is data retrieved from Firestore
      formBuildingData: null, // formBuildingData is the object to serve as the reactive v-model with the form
      uid: null,
      rules: {
        current_name: [
          {
            required: true,
            message: "Current building name is required",
            trigger: "blur",
          },
        ],
        geo_osm_way: [
          {
            pattern: /^\d+$/,
            required: false,
            message: "OSM Way must be a number",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {

    // this.uid = firebase.auth().currentUser.uid;

    this.uid = null;

    
    console.log(this.id);
    if (this.id !== "new") {
      console.log("MODE: update existing building record");
      db.collection("buildings")
        .doc(this.id)
        .get()
        .then((result) => {
          this.buildingData = result.data();
          //Construct formBuildingData from data retrieved from firebase
          this.formBuildingData = {
            current_name: this.buildingData.current_name,
            former_names: this.buildingData.former_names,
            current_address: this.buildingData.current_address,
            english_names: this.buildingData.english_names,
            geo_osm_way: this.buildingData.hasOwnProperty("geographic_info")
              ? this.buildingData.geographic_info.osm_way
              : "",
            description: this.buildingData.description
          };
        });
    } else {
      this.formBuildingData = {
        current_name: "",
        current_address: "",
        former_names: "",
        english_names: "",
        geo_osm_way: "",
        description: ""
      };
    }
  },
  methods: {
    writeToDb() {
      // convert multiline string to array
      // taken from https://is.gd/hBt8ka
      // const splitLines = (str) => str.split(/\r?\n/);

      var newBuildingData = {
        last_edited_by: this.uid,
        timestamp: firebase.firestore.Timestamp.now(),
        current_name: this.formBuildingData.current_name,
        current_address: this.formBuildingData.current_address,
        english_names: this.formBuildingData.english_names,
        former_names: this.formBuildingData.former_names,
        description: this.formBuildingData.description
        //the filter gets rid of empty elements in the array
        //from https://melvingeorge.me/blog/remove-empty-elements-from-array-javascript
      };

      newBuildingData["geographic_info"] = {
        osm_way: this.formBuildingData.geo_osm_way,
      };

      if (this.id !== "new") {
        //update existing building
        var building_ref = db.collection("buildings").doc(this.id);
        console.log("write: update");

        console.log(newBuildingData);

        building_ref
          .set(newBuildingData, { merge: true })
          .then(() => {
            console.log("Document successfully written!");
            this.$message.success("Building data updated");
            this.$router.push({
              name: "BuildingDetails",
              params: { id: this.id },
            });
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            this.$message.error(`Error writing document:  ${error}`);
          });
      } else {
        //creating new building
        console.log(this.buildingData);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.writeToDb();
        } else {
          this.$message.error(
            "Error: Data validation failed. Please check your input. "
          );
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  width: 100%;
  color: rgb(0, 0, 0);
  height: 500px;
}

#basicInformation {
  margin-left: 0em;
}
</style>