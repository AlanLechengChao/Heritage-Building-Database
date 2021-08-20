<template>
  <router-link :to="{name: 'BuildingDetails', params: { id: buildingId}}">{{buildingData.current_name}}</router-link>
</template>

<script>
import { db } from "../main.js";

export default {
  name: "BuildingLink",
  props: {
    buildingId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      buildingData: {}
    };
  },
  async mounted() {
    let buildingRef = await db.collection("buildings").doc(this.buildingId).get(); 
    this.buildingData = buildingRef.data(); 
  },
};
</script>