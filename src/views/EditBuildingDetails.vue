<template>
  <h1 v-if="buildingData">Editing: {{ buildingData.current_name }}</h1>
  <h1 v-else>Loading...</h1>
  <div id="building-details-map">map placeholder</div>
  <div v-if="buildingData" id="basicInformation">
      <h3>Basic Information</h3>
      <table>
          <colgroup>
            <col style="width: 10em;">
            <col style="width: 16em;">
          </colgroup>
          <tr>
              <td>Current Name</td>
              <td><input v-model="buildingData.current_name"/> </td>
              <td><button>edit</button></td>
          </tr>
          <!--tr>
              <td>Former Names</td>
              <td>{{ buildingData.former_names }}</td>
              
          </tr>
          <tr>
              <td>English Names</td>
              <td>{{ buildingData.english_names }}</td>
              
          </tr-->
          <tr>
              <td>Current Address</td>
              <td>{{ buildingData.current_address }}</td>
              
          </tr>
          <tr>
              <td>Year</td>
              <td>{{ buildingData.year }}</td>
             
          </tr>
      </table>
      <h3>Lists including the building</h3>
      <div v-if="buildingData" id="listIncluding">
          <router-link :to="{name: 'ListDetails', params: {id: d}}" v-for="d in buildingData.designations" :key="d">{{ d }}</router-link>
      </div>

  </div>
</template>

<script>
import { db } from '../main.js'

export default {
    data() {
        return {
            id: this.$route.params.id,
            buildingData: null
        }
    },
    mounted() {
        db.collection('buildings').doc(this.id).get().then((result) => {
            this.buildingData = result.data();
        })
    }
}
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