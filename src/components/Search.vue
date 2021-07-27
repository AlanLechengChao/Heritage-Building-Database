<template>
    <div id='search'>
        <input v-model="basicSearchTerm" type="text" placeholder="Search" v-if="showBasic" @change="printBasic">
        <br>
        <button @click="toggleAdvanced">advanced search</button>
        <div id='advancedSearch' v-if="showAdvanced">
            <label for="youxiu">优秀历史建筑ID：</label>
            <input type="text" name="youxiu" v-model="advanced.youxiu_id" @change="printAdvanced">
            <br>
            <label for="wenbao">文物保护单位ID：</label>
            <input type="text" name="wenbao" v-model="advanced.wenbao_id" @change="printAdvanced">
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
    }
</style>