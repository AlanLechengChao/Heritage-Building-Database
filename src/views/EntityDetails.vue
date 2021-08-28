<template>
  <h1 v-if="formEntityData">
    Editing: Building: {{ formEntityData.current_name }}
  </h1>
  <h1 v-else>Loading...</h1>
  <el-row :gutter="20">
    <el-col :span="16"
      ><div class="grid-content">
        <div v-if="formEntityData" id="basicInformation">
          <el-form
            :model="formEntityData"
            :rules="rules"
            ref="building_form"
            label-width="200px"
          >
            <h3>Basic Information</h3>
            <el-form-item label="Current name" prop="current_name">
              <el-input v-model="formEntityData.current_name"></el-input>
            </el-form-item>
            <p>
              For Current address, Former names, and English names, list each
              item in a new line.
            </p>
            <el-form-item label="Current address" prop="current_address">
              <el-input
                type="textarea"
                v-model="formEntityData.current_address"
                autosize
              ></el-input>
            </el-form-item>

            <el-form-item label="Former names" prop="former_names">
              <el-input
                type="textarea"
                v-model="formEntityData.former_names"
                autosize
              ></el-input>
            </el-form-item>

            <el-form-item label="English names" prop="english_names">
              <el-input
                type="textarea"
                v-model="formEntityData.english_names"
                autosize
              ></el-input>
            </el-form-item>

            <h3>Geographic Information</h3>
            <el-form-item label="OpenStreetMaps Way number" prop="geo_osm_way">
              <el-input v-model="formEntityData.geo_osm_way"></el-input>
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
      entityData: null, // entityData is data retrieved from Firestore
      formEntityData: null, // formEntityData is the object to serve as the reactive v-model with the form
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
    this.uid = firebase.auth().currentUser.uid;
    console.log(this.id);
    if (this.id !== "new") {
      console.log("MODE: update existing building record");
      db.collection("buildings")
        .doc(this.id)
        .get()
        .then((result) => {
          this.entityData = result.data();
          //Construct formEntityData from data retrieved from firebase
          this.formEntityData = {
            current_name: this.entityData.current_name,
            former_names: this.entityData.former_names.join("\n"),
            current_address: this.entityData.current_address.join("\n"),
            english_names: this.entityData.english_names.join("\n"),
            geo_osm_way: this.entityData.hasOwnProperty("geographic_info")
              ? this.entityData.geographic_info.osm_way
              : "",
          };
        });
    } else {
      this.formEntityData = {
        current_name: "",
        current_address: "",
        former_names: "",
        english_names: "",
        geo_osm_way: "",
      };
    }
  },
  methods: {
    writeToDb() {
      // convert multiline string to array
      // taken from https://is.gd/hBt8ka
      const splitLines = (str) => str.split(/\r?\n/);

      var newEntityData = {
        last_edited_by: this.uid,
        timestamp: firebase.firestore.Timestamp.now(),
        current_name: this.formEntityData.current_name,
        current_address: splitLines(
          this.formEntityData.current_address
        ).filter((a) => a),
        english_names: splitLines(this.formEntityData.english_names).filter(
          (a) => a
        ),
        former_names: splitLines(this.formEntityData.former_names).filter(
          (a) => a
        ),
        //the filter gets rid of empty elements in the array
        //from https://melvingeorge.me/blog/remove-empty-elements-from-array-javascript
      };

      newEntityData["geographic_info"] = {
        osm_way: this.formEntityData.geo_osm_way,
      };

      if (this.id !== "new") {
        //update existing building
        var building_ref = db.collection("buildings").doc(this.id);
        console.log("write: update");

        console.log(newEntityData);

        building_ref
          .set(newEntityData, { merge: true })
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
        console.log(this.entityData);
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