<template>
  <div class="home">
    <h2>Home</h2>
    <Search />
    <h3>Recently Updated Buildings</h3>
    <div v-if="top5Buildings.length != 0">
      <router-link :to="{name: 'BuildingDetails', params: {id: b.id}}" v-for="b in top5Buildings" :key="b.id">{{b.current_name}}<br></router-link>
    </div>
    <h3>Recently Updated Lists</h3>
    <div v-if="top5Lists.length != 0">
      <router-link :to="{name: 'ListDetails', params: {id: l.id}}"  v-for="l in top5Lists" :key="l.id">{{l.designation}}<br></router-link>
    </div>
    
  </div>
  
</template>

<script>
import { db } from '../main.js'
import Search from '../components/Search.vue'



export default {
  
  name: 'Home',
  data() {
      return {
        top5Buildings: [],
        top5Lists: []
      }
    },
  components: {Search},
  async mounted() {
    let buildingRef = await db.collection('buildings').orderBy('timestamp').limit(5).get();
    buildingRef.forEach(item => {
      let data = item.data();
      data.id = item.id;
      this.top5Buildings.push(data);
    });
    let listRef = await db.collection('designations').orderBy('timestamp').limit(5).get();
    listRef.forEach(item => {
      let data = item.data();
      data.id = item.id;
      this.top5Lists.push(data);
    });
  }
}


</script>
