<template>
    <div>
		<div  class="switch">
			<h1>动作</h1>
			<hr />
			<div class="page-part page-switch-padding">
		      <hamster-switch v-on:input="test" v-model="toggle">
			      <label style="font-size:2em">{{toggleCpu}}</label>
		      </hamster-switch>
		    </div>
		</div>
		<hamster-fab 
			class="absolute-bottom-right" 
			:type="['primary']" 
			direction="up"
			v-if="toggle"
			>
	    </hamster-fab>
	</div>
</template>

<script>
	export default {
	    data() {
	        return {
	            toggle: ''
	        }
	    },
	    computed: {
	        toggleCpu() {
	            return this.toggle ? '关闭' : '开启'
	        }
	    },
	    methods: {
	        test(val) {
	            this.toggle = val
	        }
	    }
	}
</script>
