<template>
  <el-row :gutter="20">
    <el-col :span="16"
      ><div class="grid-content bg-purple">
        <h1 v-if="listingData">
          {{ listingData.designation_id }} / {{ listingData.list_item_name }}
        </h1>

        <div v-if="listingData" id="listingInformation">
          <h2>{{ listingData.list_item_name }}</h2>

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
            <el-form-item label="Listing Name" prop="list_item_name">
              <el-input
                v-if="editingMode"
                v-model="listingData.list_item_name"
              ></el-input>
              <span v-else>{{ listingData.list_item_name }}</span>
            </el-form-item>
            <el-form-item label="Listing Address" prop="listed_address">
              <el-input
                v-if="editingMode"
                v-model="listingData.listed_address"
              ></el-input>
              <span v-else>{{ listingData.listed_address }}</span>
            </el-form-item>

            <el-form-item label="Entities included">
              <el-card class="box-card">
                <el-form-item
                  v-for="(entity, index) in listingData.entities"
                  :label="'Entity ' + index"
                  :key="entity.key"
                  :prop="'entities.' + index + '.value'"
                  :rules="{
                    required: true,
                    message: 'Entity code cannot be empty',
                    trigger: 'blur',
                  }"
                >
                  <div v-if="editingMode">
                    <el-input v-model="entity.value"></el-input
                    ><el-button @click.prevent="removeEntity(entity)"
                      >Delete</el-button
                    >
                  </div>

                  <div v-else>
                    <!--span>{{ building.value }}</span-->
                    <entity-link :entityId="entity.value"></entity-link>
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
import EntityLink from "../components/EntityLink.vue";
export default {
  data() {
    return {
      uid: null,
      // list_id: this.$route.params.id,
      listing_id: this.$route.params.listing_id,
      listingData: null,
      //listedBuildingsData: null,
      editingMode: false,
      rules: {
        list_item_name: [
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
      },
    };
  },
  components: { EntityLink },
  mounted() {
    this.uid = firebase.auth().currentUser.uid;
    db.collection(`listitems`)
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
    writeToDb() {
      var newListItemData = {
        metadata: {
          last_edited_by: this.uid,
          last_edited_on: firebase.firestore.Timestamp.now(),
        },
        list_item_name: this.listingData.list_item_name,
        listed_address: this.listingData.listed_address,
        designation_id: this.listingData.designation_id,
        entities: this.listingData.entities,
      };

      if (this.listing_id !== "new") {
        //update existing building
        var listitem_ref = db.collection("listitems").doc(this.listing_id);
        console.log("write: update");

        console.log(newListItemData);

        listitem_ref
          .set(newListItemData, { merge: true })
          .then(() => {
            console.log("Document successfully written!");
            this.$message.success("List item data updated");
            this.$router.push({
              name: "ListItemDetails.vue",
              params: { listing_id: this.listing_id },
            });
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            this.$message.error(`Error writing document:  ${error}`);
          });
      } else {
        //creating new building
        console.log(this.newListItemData);
      }
    },
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
    removeEntity(item) {
      var index = this.listingData.entities.indexOf(item);
      if (index !== 0) {
        this.listingData.entities.splice(index, 1);
      } else {
        this.$message.error("Listing must include at least one entity");
      }
    },
    addEntity() {
      this.listingData.entities.push({
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
  color: #56907b;
  text-decoration: underline;
}

#listing-details-map {
  background-color: rgb(90, 129, 118);
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