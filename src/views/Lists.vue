<template>
  <h2>Designations</h2>
  <table>
    <tr>
      <th>Name</th>
      <th>Year Published</th>
      <th>Level</th>
    </tr>
    <tr v-for="d in designations" :key="d.id">
      <td> <router-link :to='{name: "ListDetails", params: {id: d.id}}'>{{d.designation}}</router-link> </td>
      <td>{{d.year}}</td>
      <td>{{d.level}}</td>
    </tr>
  </table>
</template>

<script>
import { db } from '../main.js'
export default {
    name: 'Lists',
    data () {
      return {
        designations: []
      }
    },
    mounted () {
      db.collection('designations').get().then((result) =>{
        result.forEach((d) => {
          let data = d.data();
          data.id = d.id;
          this.designations.push(data);
        })
      })
    }
}
</script>

<style>
a {
  color: #2c3e50;
}
</style>