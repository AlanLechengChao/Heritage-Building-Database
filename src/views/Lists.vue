<template>
  <h2>Designations</h2>
  <el-table :data="designations" style="width: 100%">
    <el-table-column label="Name" width="300">
      <template #default="scope">
        <i class="el-icon-files"></i>
        <span style="margin-left: 10px">
          <router-link
            :to="{ name: 'ListDetails', params: { id: scope.row.id } }"
            >{{ scope.row.designation }}</router-link
          >
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="year" label="Year" width="180"> </el-table-column>
    <el-table-column prop="level" label="Level"> </el-table-column>
  </el-table>

</template>

<script>
import { db } from "../main.js";
export default {
  name: "Lists",
  data() {
    return {
      designations: [],
    };
  },
  mounted() {
    db.collection("designations")
      .get()
      .then((result) => {
        result.forEach((d) => {
          let data = d.data();
          data.id = d.id;
          this.designations.push(data);
        });
      });
  },
};
</script>

<style>
a {
  color: #2c3e50;
}
</style>