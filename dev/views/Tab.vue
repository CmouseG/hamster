<template>
    <div>
	    <hamster-search :model.sync="search"></hamster-search>
	  	<div>
		    <!-- <input v-model="target1">
		    <input v-model="target2">
		    <input v-model="target3"> -->
	    	<div class="layout-padding">
		      <hamster-tabs class="primary inverted">
		        <hamster-tab icon="mail">
		          Tab 1
		        </hamster-tab>
		        <hamster-tab icon="mail" :activeTab="true">
		          Tab 2
		        </hamster-tab>
		        <hamster-tab icon="mail">
		          Tab 3
		        </hamster-tab>
		      </hamster-tabs>
		      <br>

		      <div class="tab">
		        <div v-for="n in 5">Tab 1</div>
		      </div>
		      <div class="tab">
		        <div v-for="n in 10">Tab 2</div>
		      </div>
		      <div class="tab">
		        <div v-for="n in 7">Tab 3</div>
		      </div>
	    </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            search: '',
            target1: '#tab-1',
            target2: '#tab-2',
            target3: '#tab-3'
        }
    }
}
</script>

<style scoped>
	div.tab {
	    margin-top: 20px;
	}
	.tabs:not([slot='navigation']) {
    	border-bottom: 1px solid #e0e0e0;
	}
</style>
