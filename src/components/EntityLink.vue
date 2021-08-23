<template>
  <router-link :to="{name: 'BuildingDetails', params: { id: entityId}}">{{entityData.current_name}}</router-link>
</template>

<script>
import { db } from "../main.js";

export default {
  name: "EntityLink",
  props: {
    entityId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entityData: {}
    };
  },
  async mounted() {
    let entityRef = await db.collection("entities").doc(this.entityId).get(); 
    this.entityData = entityRef.data(); 
  },
};
</script>