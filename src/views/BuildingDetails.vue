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
              <td v-if="buildingData.former_names != ''">
                {{buildingData.former_names}}
              </td>
              <td v-else>
                N/A
              </td>
            </tr>
            <tr>
              <td >English Names</td>
              <td v-if="buildingData.english_names">
                {{buildingData.english_names}}
              </td>
              <td v-else>
                N/A
              </td>
            </tr>
            <tr>
              <td >Current Address</td>
              <td v-if="buildingData.current_address">
                {{buildingData.current_address}}
              </td>
              <td v-else>
                N/A
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
        <div id="building-details-map" style="height: 300px;">
          <iframe v-if="buildingData.maplink" width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" v-bind:src="buildingData.maplink"></iframe>
        </div>
        
      </div>
    </el-col>
  </el-row>

</template>

<script>
import { db, overpassFrontend, OverpassFrontend } from "../main.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      buildingData: null,
      osmData: null,
      mapObject: null
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
    },
  },
  watch: {
    buildingData(_new) {
      let ref = this;
      overpassFrontend.get(
        [`w${this.buildingData.geographic_info.osm_way}`],
        {
            properties: OverpassFrontend.TAGS | OverpassFrontend.GEOM | OverpassFrontend.BBOX
        },
        function (err, result) {
            if (result) {
              ref.osmData = result;
              console.log(ref.osmData);
            } else {
                console.log('* empty result')
            }
        },
        function (err) {
            if (err) { console.log(err) }
        }
      )
    },
    osmData(_new) {
      console.log('watch', _new);
      // this.mapObject = L.map('building-details-map').setView([51.505, -0.09], 1);
      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
      // .addTo(this.mapObject);

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

h4 {
  margin: 0%;
}

img {
  width: 100%;
}

ul {
  list-style-type: none;
  padding-left: 0;
}
td {
  white-space: pre-line;
}

</style>