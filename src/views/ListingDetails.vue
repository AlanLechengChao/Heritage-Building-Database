<template>
  <el-row :gutter="20">
    <el-col :span="16"
      ><div class="grid-content bg-purple">
        <h1 v-if="listingData">{{ listingData.current_name }}</h1>

        <div v-if="listingData" id="listingInformation">
          <h2>{{ list_id }} / {{ listingData.listed_name }}</h2>

          <el-switch
            v-model="editingMode"
            active-text="Edit"
            inactive-text="View"
          ></el-switch>

          <el-form
            :model="listingData"
            :rules="rules"
            ref="listingForm"
            label-width="200px"
          >
            <el-form-item label="Listing Name" prop="listed_name">
              <el-input
                v-if="editingMode"
                v-model="listingData.listed_name"
              ></el-input>
              <span v-else>{{ listingData.listed_name }}</span>
            </el-form-item>
            <el-form-item label="Listing Address" prop="listed_address">
              <el-input
                v-if="editingMode"
                v-model="listingData.listed_address"
              ></el-input>
              <span v-else>{{ listingData.listed_address }}</span>
            </el-form-item>

            <el-form-item label="Buildings included">
              <el-card class="box-card">
                <el-form-item
                  v-for="(building, index) in listingData.buildings"
                  :label="'Building ' + index"
                  :key="building.key"
                  :prop="'buildings.' + index + '.value'"
                  :rules="{
                    required: true,
                    message: 'Building code cannot be empty',
                    trigger: 'blur',
                  }"
                >
                  <div v-if="editingMode">
                    <el-input v-model="building.value"></el-input
                    ><el-button @click.prevent="removeBuilding(building)"
                      >Delete</el-button
                    >
                  </div>

                  <div v-else>
                    <!--span>{{ building.value }}</span-->
                    <building-link :buildingId='building.value'></building-link>
                    <!--router-link :to="{name: 'BuildingDetails', params: {id: building.value}}">{{listedBuildingsData[building.value].current_name}}</router-link-->
                  </div>
                </el-form-item>
              </el-card>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('listingForm')"
                >Confirm</el-button
              >
              <el-button @click="resetForm('listingForm')">Reset</el-button>
            </el-form-item>
          </el-form>

          <h3>Other lists that include buildings of this listing</h3>
          <!--div v-if="buildingData" id="listIncluding">
          <router-link :to="{name: 'ListDetails', params: {id: d}}" v-for="d in buildingData.designations" :key="d">{{ d }}</router-link>
      </div-->
        </div>
      </div></el-col
    >
    <el-col :span="8"
      ><div class="grid-content bg-purple">
        <div id="listing-details-map">map placeholder</div>
      </div></el-col
    >
  </el-row>
</template>

<script>
import { db } from "../main.js";
import BuildingLink from '../components/BuildingLink.vue';
export default {
  data() {
    return {
      list_id: this.$route.params.id,
      listing_id: this.$route.params.listing_id,
      listingData: null,
      //listedBuildingsData: null, 
      editingMode: false,
      rules: {
        listed_name: [
          {
            required: true,
            message:
              "Please input the name of the listing as appeared in the original archival document",
            trigger: "blur",
          },
        ],
        listed_address: [
          {
            required: true,
            message:
              "Please enter the address of the listing as appeared in the original archival document",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {BuildingLink},
 mounted() {
   console.log(this.listing_id); 
    db.collection(`designations/${this.list_id}/items`)
      .doc(this.listing_id)
      .get()
      .then((result) => {
        if (result.exists) {
          this.listingData = result.data();
        } else {
          console.log("No such document!");
        }
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeBuilding(item) {
      var index = this.listingData.buildings.indexOf(item);
      if (index !== 0) {
        this.listingData.buildings.splice(index, 1);
      } else {
        this.$message.error("Listing must include at least one building");
      }
    },
    addBuilding() {
      this.listingData.buildings.push({
        value: "",
        key: Date.now(),
      });
    },
    confirmEdit() {
      console.log("confirm");
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

#listing-details-map {
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