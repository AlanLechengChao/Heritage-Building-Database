<template>
    <h2>Buildings <span><el-button>Add new</el-button></span></h2>
    
    <Search @searchterm="updateTerm" @advanced="updateAdvanced"/>
  <!-- <button @click="getBuildings">by name</button> -->
    <div style="display: inline; margin-right: 1em;">
        <label for="sortBy">Sort By: </label>
        <el-select v-model="sortBy" id="sortBy" name="sortBy" @change="sort">
            <el-option value="current_name">Alphabetically</el-option>
            <el-option value="timestamp">Recently Updated</el-option>
        </el-select>
    </div>
    <div style="display: inline;">
        <label style="padding: 0em 1em 0em 0em;" for="order">Order: </label>
        <el-select  v-model="order" id="order" name="order" @change="sort">
            <el-option value="asc">Ascending</el-option>
            <el-option value="desc">Descending</el-option>
        </el-select>
    </div>
    <div id='buidingsList'>

        <router-link tag="div" :to="{name: 'BuildingDetails', params: {id: building.id}}" v-for="building in currentDisplay" :key="building.id" class="buildingBox"> 
        <h4> <span>{{building.current_name}}</span> <span v-if="building.former_names.length > 0"> / </span> <span style="color: grey" v-for="former in building.former_names" :key="former"> {{former}} </span></h4>
        <h5 v-if="building.english_names.length > 0 && building.english_names[0] != ''">{{building.english_names}}</h5>
        <!-- <p>{{building.id}} </p> -->
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
            basicSearchTerm: this.$route.params.basicSearchTerm || '',
            advanced: null,
            queryMap: {'Alphabetically': 'current_name', 'Recently Updated': 'timestamp', 'Ascending': 'asc', 'Descending': 'desc'}
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
            console.log(this.basicSearchTerm)
            let ref = db.collection('buildings');
            this.currentDisplay = [];
            
            if (this.basicSearchTerm != '') {
                let l = this.basicSearchTerm.length;
                this.sortBy = 'current_name';
                // console.log(this.basicSearchTerm.slice(0, -1) + String.fromCharCode(this.basicSearchTerm.charCodeAt(l-1)+1));
                ref = ref.where('current_name', '>=', this.basicSearchTerm).where('current_name', '<=', this.basicSearchTerm.slice(0, -1) + String.fromCharCode(this.basicSearchTerm.charCodeAt(l-1)+1));
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
    margin-top: 1em;
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
    transition: 0.3s all;
    background-color: rgb(228, 227, 227);
}
</style>