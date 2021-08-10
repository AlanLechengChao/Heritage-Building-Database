<template>
  <h1 v-if="listingData">{{ listingData.current_name }}</h1>
  <div id="listing-details-map">map placeholder</div>
  <div v-if="listingData" id="listingInformation">
      <h2>{{list_id}} / {{listingData.listed_name}}</h2>
      <h3>Basic Information</h3>
      <table>
          <colgroup>
            <col style="width: 10em;">
            <col style="width: 16em;">
          </colgroup>
          <tr>
              <td>Listed Name</td>
              <td>{{ listingData.listed_name }}</td>
              
          </tr>
          <tr>
              <td>Listed Address</td>
              <td>{{ listingData.listed_address }}</td>
              
          </tr>
          <tr>
              <td>Associated buildings</td>
              <td>TODO: Buildings</td>
              
          </tr>
      </table>

      <h3>Other lists that include buildings of this listing</h3>
      <!--div v-if="buildingData" id="listIncluding">
          <router-link :to="{name: 'ListDetails', params: {id: d}}" v-for="d in buildingData.designations" :key="d">{{ d }}</router-link>
      </div-->

  </div>
</template>

<script>
import { db } from '../main.js'
export default {
    data() {
        return {
            list_id: this.$route.params.id,
            listing_id: this.$route.params.listing_id,
            listingData: null
        }
    },
    mounted() {
        db.collection(`designations/${this.list_id}/items`).doc( this.listing_id ).get().then((result) => {
            if (result.exists) {
                console.log("Document data:", result.data());
                this.listingData = result.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
        }
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