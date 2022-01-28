<template>
  <h2>Database of Protected Cultural Relic Units (文物保护单位) in Shanghai</h2>
  <Search @searchterm="gotoBuildings"/>
  <div id='home-container'>
    <div class="column">  
      <el-p>Since the establishment of the PRC in 1949, following national heritage preservation laws and directives, the municipal government of Shanghai has been surveying historic buildings and sites in the city and granting those deemed worthy of preservation the designation of ‘protected cultural relic units’ This database contains every site in Shanghai that has been listed since 1949.</el-p>
      <h3>People</h3>
      <el-ul>
        <li>Lena Scheen (project coordinator) </li>
        <li>Lewei (Richard) Huang (database development)</li>
        <li>Bin (Kevin) Ni (student assistant)</li>
        <li>Xinze Li (student assistant)</li>
        <li>Lecheng (Alan) Chao (student assistant)</li>
        <li>Yuhan (Tony) Wang (student assistant)</li>
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
      <h3 style="margin-top: 0;">Cultural Heritage Sites list incorporated</h3>
      <el-p>
      <b>上海市市级文物保护单位名单</b><br>
      <li>List of Shanghai Municipal Historical and Cultural Sites.</li>
      <li>Years: 1959, 1960, 1962.</li>
      <li>Level: provincial.</li>
      </el-p>
      <br>
      <el-p>
      <b>上海市文物保护单位 (before 2002: 上海市建筑保护单位的优秀近代建筑）</b><br>
      <li>List of Shanghai Historical and Cultural Sites.</li>
      <li>Years: 1977, 1980 (81, 82, 83 updates), 1984 (85 update), 1987, 1989, 1992 (93 update), 2002, 2014.</li>
      <li>Level: provincial.</li>
      </el-p>
      <br>
      <el-p>
      <b>上海市优秀历史建筑</b><br>
      <li>Shanghai Excellent Historical Buildings.</li>
      <li>Years: 1989, 1994, 1999, 2004, 2015.</li>
      <li>Level: municipal.</li>
      </el-p>
      <br>
      <el-p>
      <b>全国重点文物保护单位名单 (only the sites in Shanghai)</b><br>
      <li>List of National Major Historical and Cultural Sites.</li>
      <li>Years: 1961, 1982, 1988, 1996, 2001, 2002, 2003, 2006, 2009, 2013, 2014, 2019.</li>
      <li>Level: national.</li>
      </el-p>



    </div>
  </div>
  
</template>

<style>
.column {
  line-height: 1.8;
  max-width: 400px;
  margin: 1em;  
}
#home-container {
  display: flex;
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

