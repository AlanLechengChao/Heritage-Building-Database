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
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel gravida enim. Donec mi nulla, sagittis at rutrum et, ultricies vitae sem. Integer euismod eros egestas quam scelerisque vestibulum. Aliquam sed feugiat justo. Aenean mollis molestie velit. Cras bibendum, velit nec luctus dapibus, orci justo aliquam purus, ut varius nulla lorem nec lorem. Maecenas eget nunc quis velit condimentum placerat. In euismod vestibulum augue id interdum. Vestibulum sed aliquet massa.</td>
            </tr>
        </table>
    </div>
    <h2>Buildings</h2>
    <div v-if="buildings.length != 0" id="builings">
        <router-link v-for="b in buildings" :key="b.id" :to="{name: 'BuildingDetails', params: {id: b.id}}">{{b.current_name}}<br></router-link>
        
    </div>
    
    <h2>Listings - Test section</h2>
    <div v-if="listings.length != 0" id="listings">
        <!--router-link v-for="(listing, index) in listData.listings" :key="`listitem-${index}`" :to="{name: 'BuildingDetails', params: {id: listing.buildings[0]}}">{{listing.listed_name}}<br></router-link-->
        <router-link v-for="l in listings" :key="l.id" :to="{name: 'ListingDetails', params: {id: id, listing_id: l.id}}">{{l.listed_name}}<br></router-link>
        
    </div>

</template>

<script>
import {db} from '../main.js'
export default {
    data () {
        return {
            listData: null,
            buildings: [],
            listings: [], 
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
        let alt_listData = await db.collection(`designations/${this.id}/items`).get().then((result) =>{
            result.forEach((d) => {
                let data = d.data();
                data.id = d.id;
                this.listings.push(data);
            })
      });
        let buildingsRef = await db.collection('buildings').where("designations", "array-contains", this.id).get();
        this.listData = ref.data();
        
        
        buildingsRef.forEach((b) => {
            let data = b.data();
            data.id = b.id;
            this.buildings.push(data);
        })

    }
}
</script>

<style>

</style>