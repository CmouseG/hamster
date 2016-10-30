<template>
	<div>
		<div class="switch">
			<h1>调试</h1>
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
			:click="openLogger"
			>
	    </hamster-fab>
	</div>
</template>

<script>
	import Logger from '../plugins/logger/logger'
	export default {
	    computed: {
	        toggle() {
	            return this.$store.state.switch_logger
	        },
	        toggleCpu() {
	            return this.toggle ? '关闭' : '开启'
	        }
	    },
	    methods: {
	        test(val) {
	            // this.toggle = val
	            this.$store.dispatch('setSwitchLogger', val)
	        },
	        openLogger() {
	            Logger.create()
	        }
	    }
	}
</script>

<style lang="stylus">
	
</style>