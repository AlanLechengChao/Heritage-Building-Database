<template>
    <div id='search'>
        <el-input v-model="basicSearchTerm" type="text" placeholder="Search" v-if="showBasic" @change="printBasic"></el-input>
        <br>
        <el-button @click="toggleAdvanced">advanced search</el-button>
        <div id='advancedSearch' v-if="showAdvanced">
            <el-form-item label="" prop="youxiu">
                优秀历史建筑ID：
                <el-input type="text" name="youxiu" v-model="advanced.youxiu_id" @change="printAdvanced"></el-input>
            </el-form-item>
            <el-form-item>
                文物保护单位ID：
                <el-input type="text" name="wenbao" v-model="advanced.wenbao_id" @change="printAdvanced"></el-input>
            </el-form-item>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showBasic: true,
            showAdvanced: false,
            basicSearchTerm: '',
            advanced: {
                youxiu_id: null,
                wenbao_id: null
            }
        }
    },
    methods: {
        toggleAdvanced() {
            this.showAdvanced = !this.showAdvanced;
        },
        printBasic() {
            this.$emit('searchterm', this.basicSearchTerm);
            // console.log(this.basicSearchTerm)
        },
        printAdvanced() {
            this.$emit('advanced', this.advanced);
        }
    }
}
</script>

<style>
    #search {
        float: right;
        width: 25%;
        margin-top: 1em;
    }
</style>