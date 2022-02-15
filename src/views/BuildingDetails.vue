<template>
  <h1 v-if="buildingData">{{ buildingData.current_name }} <el-button @click="edit">Edit</el-button></h1>
  <h1 v-else v-cloak>Loading...</h1>
  <el-row :gutter="20">
    <el-col :span="16">
      <div class="grid-content"> 
        <div v-if="buildingData" id="basicInformation">
          <h3>Basic Information</h3>
          <table>
            <colgroup>
              <col style="width: 10em" />
              <col style="width: 16em" />
            </colgroup>
            <tr>
              <td>Current Name</td>
              <td>{{ buildingData.current_name }}</td>
            </tr>
            <tr>
              <td>Former Names</td>
              <td v-if="buildingData.former_names[0]">
                {{buildingData.former_names}}
              </td>
              <td v-else>
                N/A
              </td>
            </tr>
            <tr>
              <td>English Names</td>
              <td>
                {{buildingData.english_names}}
              </td>
            </tr>
            <tr>
              <td>Current Address</td>
              <td>
                {{buildingData.current_address}}
              </td>
            </tr>
            <tr>
              <td>Year</td>
              <td>{{ buildingData.year }}</td>
            </tr>
            <tr v-if="buildingData.hasOwnProperty('geographic_info')">
              <td>OSM way</td>
              <td><el-button size="mini" round @click="osm_redirect"> {{ buildingData.geographic_info.osm_way }}</el-button></td>
            </tr>
          </table>
          <h3>Lists including the building</h3>
          <div id="listIncluding">
            <router-link
              :to="{ name: 'ListDetails', params: { id: d } }"
              v-for="d in buildingData.designations"
              :key="d"
              >{{ d }}</router-link
            >
          </div>
          <h3>Description</h3>
          <el-p v-if="buildingData.description" id="description">{{ buildingData.description }}</el-p>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div v-if="buildingData" class="grid-content">
        <h4>Image</h4>
        <div id="image">
          
          <img v-if="buildingData.image" v-bind:src="buildingData.image" alt="">
        </div>
        <h4>Map</h4>
        <div id="building-details-map">
          <iframe v-if="buildingData.maplink" width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" v-bind:src="buildingData.maplink"></iframe>
        </div>
        
      </div>
    </el-col>
  </el-row>
  
  <!-- <div v-if="buildingData" id="basicInformation">
    <h3>Basic Information</h3>
    <table>
      <colgroup>
        <col style="width: 10em" />
        <col style="width: 16em" />
      </colgroup>
      <tr>
        <td>Current Name</td>
        <td>{{ buildingData.current_name }}</td>
      </tr>
      <tr>
        <td>Former Names</td>
        <td>
          <ul>
            <li :key="item" v-for="item in buildingData.former_names">
              {{ item }}
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>English Names</td>
        <td>
          <ul>
            <li :key="item" v-for="item in buildingData.english_names">
              {{ item }}
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Current Address</td>
        <td>
          <ul>
            <li :key="item" v-for="item in buildingData.current_address">
              {{ item }}
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Year</td>
        <td>{{ buildingData.year }}</td>
      </tr>
      <tr v-if="buildingData.hasOwnProperty('geographic_info')">
        <td>OSM way</td>
        <td><el-button size="mini" round @click="osm_redirect"> {{ buildingData.geographic_info.osm_way }}</el-button></td>
      </tr>
    </table>
    <h3>Lists including the building</h3>
    <div id="listIncluding">
      <router-link
        :to="{ name: 'ListDetails', params: { id: d } }"
        v-for="d in buildingData.designations"
        :key="d"
        >{{ d }}</router-link
      >
    </div>
  </div> -->
</template>

<script>
import { db } from "../main.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      buildingData: null,
    };
  },
  mounted() {
    db.collection("buildings")
      .doc(this.id)
      .get()
      .then((result) => {
        this.buildingData = result.data();
        console.log(this.buildingData);
      });
  },
  methods: {
    edit () {
      this.$router.push({ name: "EditBuildingDetails", params: {id: this.id} }); 
    }, 
    osm_redirect () {
      window.open(`https://www.openstreetmaps.org/way/${this.buildingData.geographic_info.osm_way}`, '_blank')
    }
  }
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
  height: 300px;
}

#basicInformation {
  margin-left: 0em;
}

#image {
  width: 100%;
  /* background-color: red; */
  height: 100%;
}

img {
  width: 100%;
}

ul {
  list-style-type: none;
  padding-left: 0;
}
</style>