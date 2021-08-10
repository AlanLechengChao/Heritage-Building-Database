<template>
  <h2>Buildings <span><button>Add new</button></span></h2>
    <label for="sortBy">Sort By: </label>
    <select v-model="sortBy" id="sortBy" name="sortBy" @change="sort">
        <option value="timestamp">Recently Updated</option>
        <option value="current_name">Alphabetically</option>
    </select>
    <label for="order">Order: </label>
    <select v-model="order" id="order" name="order" @change="sort">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
    </select>
  <Search @searchterm="updateTerm" @advanced="updateAdvanced"/>
  <!-- <button @click="getBuildings">by name</button> -->
  <div id='buidingsList'>
      <router-link tag="div" :to="{name: 'BuildingDetails', params: {id: building.id}}" v-for="building in currentDisplay" :key="building.id" class="buildingBox"> 
          <h4> <span>{{building.current_name}}</span> <span v-if="building.former_names.length > 0"> / </span> <span style="color: grey" v-for="former in building.former_names" :key="former"> {{former}} </span></h4>
          <h5 v-if="building.english_names.length > 0 && building.english_names[0] != ''">{{building.english_names[0]}}</h5>
          <p>{{building.id}} </p>
          <!-- <p v-if="buiding.wenbao_id">文物保护单位ID: {{building.wenbao_id}} </p> -->
      </router-link>
  </div>
  
</template>

<script>
import Search from '../components/Search.vue'
import { db } from '../main.js'
export default {
    name: 'Buildings',
    components: {Search},
    data() {
        return {
            currentDisplay: [],
            sortBy: 'timestamp',
            order: 'asc',
            basicSearchTerm: '',
            advanced: null
        }
    },
    methods: {
        updateTerm(t) {
            this.basicSearchTerm = t;
            this.sort();
        },
        updateAdvanced(t) {
            this.advanced = t;
            console.log(this.advanced);
            this.sort();
        },
        async sort() {
            // params
            //
            // {
            //    order: 
            //    filter:
            //    current_name:
            //    other advanced search fields
            // }
            //
            //
            let ref = db.collection('buildings');
            this.currentDisplay = [];
            
            if (this.basicSearchTerm != '') {
                ref = ref.where('current_name', '>=', this.basicSearchTerm);
            }
            if (this.advanced) {
                for (const [key, value] of Object.entries(this.advanced)) {
                    if (value) {
                        ref = ref.where(key, '==', value);
                    }
                }
            }
            ref = ref.orderBy(this.sortBy, this.order);
            ref = ref.limit(40);
            let result = await ref.get();
            result.docs.forEach((d) => {
                    let data = d.data();
                    data.id = d.id;
                    this.currentDisplay.push(data);
                });
        }
    },
    mounted() {
        this.sort();
    }
}
</script>

<style>

h4, h5 {
    margin-block-start: 0;
    margin-block-end: 0;
}

.buildingBox:first-child {
    margin-top: 10px;
}

a {
    display: block;
    text-decoration: none;
    color: #2c3e50;
}

select {
    margin-right: 10px;
}

.buildingBox {
    width: 70%;
    padding: 1em;
    background-color: rgb(245, 244, 244);
    border-bottom: 1px solid;
    border-color: rgb(200,200,200);
}

.buildingBox:hover {
    background-color: rgb(228, 227, 227);
}
</style>