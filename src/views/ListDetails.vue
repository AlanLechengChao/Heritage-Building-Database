<template>
    <h1 v-if="listData"> {{listData.designation}} </h1>
    <h2>Basic Information</h2>
  
    <div v-if="listData" id="basic-information">
        <p v-if="listData.level == 'national'">Listing Shanghai items only</p>
        <table>
            <tr>
                <th>Level</th>
                <td>{{listData.level}}</td>
            </tr>
            <tr>
                <th>Year</th>
                <td>{{listData.year}}</td>
            </tr>
            <tr>
                <th>Type</th>
                <td>{{listData.type}}</td>
            </tr>
            <tr>
                <th>Details</th>
                <td v-if="listData.description">{{listData.description}}</td>
            </tr>
        </table>
    </div>
    <h2>Buildings</h2>
    <div id='buidingsList'>

        <router-link tag="div" :to="{name: 'BuildingDetails', params: {id: building.id}}" v-for="building in buildings" :key="building.id" class="buildingBox"> 
            <h4> <span>{{building.current_name}}</span> <span v-if="building.former_names.length > 0"> / </span> <span style="color: grey" v-for="former in building.former_names" :key="former"> {{former}} </span></h4>
            <h5 v-if="building.english_names.length > 0 && building.english_names[0] != ''">{{building.english_names}}</h5>
        <!-- <p>{{building.id}} </p> -->
        <!-- <p v-if="buiding.wenbao_id">文物保护单位ID: {{building.wenbao_id}} </p> -->
        </router-link>
    </div>
    <!-- <div v-if="buildings.length != 0" id="builings">
        <router-link v-for="b in buildings" :key="b.id" :to="{name: 'BuildingDetails', params: {id: b.id}}">{{b.current_name}}<br></router-link>
        
    </div> -->
    
    <!-- until further construction -->
    <!-- <h2>Listings - Test section</h2>
    <div v-if="listItems.length != 0" id="listings">
        
        <router-link v-for="l in listItems" :key="l.id" :to="{name: 'ListItemDetails', params: {id: id, listing_id: l.id}}">{{l.list_item_name}}<br></router-link>
        
    </div> -->

</template>

<script>
import {db} from '../main.js'
export default {
    data () {
        return {
            listData: null,
            buildings: [],
            listItems: [], 
            id: this.$route.params.id
        }
    },
    async mounted () {
        // db.collection('designations').doc(this.id).get().then(result => {
        //     this.listData = result.data();
        //     this.buildings = [];
        //     this.listData.buildings.forEach(function(bI){
        //         db.collection('buildings').doc(bI).get().then(function(b){
        //             this.buildings.push(b.data());
        //         })
        //     })
        // });
        let ref = await db.collection('designations').doc(this.id).get();
    //     let alt_listData = await db.collection(`designations/${this.id}/items`).get().then((result) =>{
    //         result.forEach((d) => {
    //             let data = d.data();
    //             data.id = d.id;
    //             this.listings.push(data);
    //         })
    //   });
        let buildingsRef = await db.collection('buildings').where("designations", "array-contains", this.id).get();
        let listItemsRef = await db.collection('listitems').where("designation_id", "==", this.id).get();
        this.listData = ref.data();
        //console.log(listItemsRef); 
        
        
        buildingsRef.forEach((b) => {
            let data = b.data();
            data.id = b.id;
            this.buildings.push(data);
        })

        listItemsRef.forEach((listitem) => {
            let data = listitem.data();
            data.id = listitem.id;
            this.listItems.push(data);
        })

    }
}
</script>

<style>
#basic-information {
    /* float: right; */
    width: 60%;
}
a {
    display: block;
    text-decoration: none;
    color: #2c3e50;
}
.buildingBox:hover {
    background-color: rgb(228, 227, 227);
}
.buildingBox {
    width: 70%;
    padding: 1em;
    background-color: rgb(245, 244, 244);
    border-bottom: 1px solid;
    border-color: rgb(200,200,200);
}
</style>