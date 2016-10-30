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
			:click="openSheet"
			>
	    </hamster-fab>
	</div>
</template>

<script>
	import Hamster from 'hamster'
	let ActionSheet = Hamster.ActionSheet

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
	        },
	        openSheet(fromBackdrop) {
	            this.opened = !this.opened

	            if (!fromBackdrop && this.click && !this.opened) {
	                this.click()
	                return
	            }
	            ActionSheet.create({
	                title: 'Actions',
	                gallery: true,
	                actions: [
	                    {
	                        label: 'Delete',
	                        icon: 'delete',
	                        handler() {
	                            console.log('Deleting')
	                        }
	                    },
	                    {
	                        label: 'Share',
	                        icon: 'share',
	                        handler() {
	                            console.log('Sharing')
	                        }
	                    },
	                    {
	                        label: 'Play',
	                        icon: 'gamepad',
	                        handler() {
	                            console.log('Playing')
	                        }
	                    },
	                    {
	                        label: 'Favorite',
	                        icon: 'favorite',
	                        handler() {
	                            console.log('Added to favorites')
	                        }
	                    },
	                    {
	                        label: 'Cancel',
	                        icon: 'cancel',
	                        classes: 'text-primary',
	                        handler() {
	                            console.log('Cancelled...')
	                        }
	                    }
	                ]
	            })
	        }
	    }
	}
</script>
