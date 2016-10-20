<template>
    <div id="container">
        <h1>{{msg}}</h1>
    </div>
</template>

<script>
    export default {
		data() {
			return {
				msg: 'Hello Vue!!!'
			}
		}
    }
</script>

<style lang="stylus">
	$color = orange
	#container
	  h1
	    color $color
	    display flex
</style>