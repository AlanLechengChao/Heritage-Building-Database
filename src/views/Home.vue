<template>
  <!-- <h2>Database of Protected Cultural Relic Units (文物保护单位) in Shanghai</h2> -->
  <Search @searchterm="gotoBuildings"/>
  <div id='home-container'>
    <div class="column">  
      <el-p>Since the establishment of the PRC in 1949, following national heritage preservation laws and directives, the municipal government of Shanghai has been surveying historic buildings and sites in the city and granting those deemed worthy of preservation the designation of ‘protected cultural relic units’ This database contains every site in Shanghai that has been listed since 1949.</el-p>
      <h3>People</h3>
      <el-ul>
        <b>Lena Scheen: </b> project coordinator <br>
        <b>Lewei (Richard) Huang: </b> product manager <br>
        <b>Bin (Kevin) Ni: </b> database management <br>
        
        <b>Lecheng (Alan) Chao</b> database developer <br>
        <b>Yuhan (Tony) Wang</b> student assistant <br>
        <b>Xinze Li: </b> student assistant 
      </el-ul>
      <h3>Recently Updated Buildings</h3>
      <div v-if="top5Buildings.length != 0">
        <router-link :to="{name: 'BuildingDetails', params: {id: b.id}}" v-for="b in top5Buildings" :key="b.id">{{b.current_name}}<br></router-link>
      </div>
      <h3>Recently Updated Lists</h3>
      <div v-if="top5Lists.length != 0">
        <router-link :to="{name: 'ListDetails', params: {id: l.id}}"  v-for="l in top5Lists" :key="l.id">{{l.designation}}<br></router-link>
      </div> 
    </div>
    <div class="column">
      <h3 style="margin-top: 0;">Cultural Heritage Sites list incorporated</h3> <br>
      <el-ul>
      <b>上海市市级文物保护单位名单</b><br>
      <el-p>List of Shanghai Municipal Historical and Cultural Sites.</el-p> <br>
      <el-p><b>Years:</b> 1959, 1960, 1962.</el-p> <br>
      <el-p><b>Level:</b> provincial.</el-p> <br>
      </el-ul>
      <br>
      <el-ul>
      <b>上海市文物保护单位</b><br>
      <el-p>List of Shanghai Historical and Cultural Sites.</el-p> <br>
      <el-p><b>Years:</b> 1977, 1980 (81, 82, 83 updates), 1984 (85 update), 1987, 1989, 1992 (93 update), 2002, 2014.</el-p> <br>
      <el-p><b>Level:</b> provincial.</el-p> <br>
      </el-ul>
      <br>
      <el-ul>
      <b>上海市优秀历史建筑</b><br>
      <el-p>Shanghai Excellent Historical Buildings.</el-p> <br>
      <el-p><b>Years:</b> 1989, 1994, 1999, 2004, 2015.</el-p> <br>
      <el-p><b>Level:</b> municipal.</el-p> <br>
      </el-ul>
      <br>
      <el-ul>
      <b>全国重点文物保护单位名单 (only the sites in Shanghai)</b><br>
      <el-p>List of National Major Historical and Cultural Sites.</el-p> <br>
      <el-p><b>Years:</b> 1961, 1982, 1988, 1996, 2001, 2002, 2003, 2006, 2009, 2013, 2014, 2019.</el-p> <br>
      <el-p><b>Level:</b> national.</el-p> <br>
      </el-ul>



    </div>
  </div>
  
</template>

<style>
.column {
  line-height: 1.8;
  max-width: 400px;
  margin: 1em;
  margin-left: 0;  
}
#home-container {
  display: flex;
}

.p {
  margin-top: 1em;
}

h3 {
  margin-bottom: 0;
}

</style>

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
  methods: {
    gotoBuildings(t) {
      console.log(t);
      this.$router.push({name: "Buildings", params: {basicSearchTerm: t}});
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

