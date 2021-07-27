<template>
  <h2>Designations</h2>
  <table>
    <tr>
      <th>Name</th>
      <th>Year Published</th>
      <th>Level</th>
    </tr>
    <tr v-for="d in designations" :key="d.id">
      <td> {{d.designation}} </td>
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

</style>