<template>
  <h1 v-if="buildingData">
    Editing: Building: {{ buildingData.current_name }}
  </h1>
  <h1 v-else>Loading...</h1>
  <el-row :gutter="20">
    <el-col :span="16"
      ><div class="grid-content">
        <div v-if="buildingData" id="basicInformation">
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

            <el-form-item label="Former names" prop="former_names">
              <el-input
                type="textarea"
                v-model="formBuildingData.former_names"
              ></el-input>
            </el-form-item>

            <el-form-item label="English names" prop="english_names">
              <el-input
                type="textarea"
                v-model="formBuildingData.english_names"
              ></el-input>
            </el-form-item>

            <h3>Geographic Information</h3>
            <el-form-item label="OpenStreetMaps Way number" prop="geo_osm_way">
              <el-input
                v-model="formBuildingData.geo_osm_way"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('building_form')"
                >Confirm</el-button
              >
              <el-button @click="resetForm('building_form')">Reset</el-button>
            </el-form-item>
          </el-form>

          <!-- <table>
            <colgroup>
              <col style="width: 10em" />
              <col style="width: 16em" />
            </colgroup>
            <tr>
              <td>Current Name</td>
              <td><input v-model="buildingData.current_name" /></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <button @click="writeToDb">Save</button><br /><button>
                  Reset
                </button>
              </td>
            </tr>
          </table> -->
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
      buildingData: null,
      formBuildingData: null,
      uid: null,
      rules: {
        current_name: [
          {
            required: true,
            message: "Please input building name",
            trigger: "blur",
          },
          {
            min: 1,
            max: 240,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        osm_way: [
          {
            required: false,
            message: "Please input OSM way",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    const splitLines = (str) => str.split(/\r?\n/); //convert multiline string to array

    this.uid = firebase.auth().currentUser.uid;
    console.log(this.id);
    if (this.id !== "new") {
      console.log("update");
      db.collection("buildings")
        .doc(this.id)
        .get()
        .then((result) => {
          this.buildingData = result.data();
          //TODO: construct new object for use on Element-UI form.
          this.formBuildingData = {
            current_name: this.buildingData.current_name,
            former_names: this.buildingData.former_names.join("\n"),
            current_address: this.buildingData.current_address.join("\n"),
            english_names: this.buildingData.english_names.join("\n"),
            geo_osm_way: this.buildingData.hasOwnProperty('geographic_info') ? this.buildingData.geographic_info.osm_way : ""
           };
        });
    } else {
      this.formBuildingData = {
        current_name: "",
        current_address: "",
        former_names: "", 
        english_names: "", 
        geo_osm_way: ""
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
          .set(newBuildingData, { merge: true })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      } else {
        console.log(this.buildingData);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          this.$message.error(
            "Error: Data validation failed. Please check your input. "
          );
          //console.log("error submit!!");
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