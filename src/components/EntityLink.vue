<template>
  <router-link v-if="entityData" :to="{name: 'BuildingDetails', params: { id: entityId}}">{{ displayName }}</router-link>
  <!-- v-if needed to avoid empty entityData raising errors -->
</template>

<script>
import { db } from "../main.js";

export default {
  name: "EntityLink",
  props: {
    entityId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      entityData: null
    };
  },
  computed: {
    displayName: function () {
      return this.entityData.current_names[0]; 
    }
  }, 
  // created () {
  //   console.log("created: entity id: " + this.entityId); 
  // }, 
  async created() {
    console.log("entity id: " + this.entityId); 
    let entityRef = await db.collection("entities").doc(this.entityId).get(); 
    this.entityData = entityRef.data(); 
    console.log(this.entityData);
  },
};
</script>