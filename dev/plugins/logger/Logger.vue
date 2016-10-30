<template>
	<hamster-modal
		ref="logger"
		class="with-backdrop logger"
		position-classes="items-end justify-center"
		transition="modal-actions"
		:content-css="css"
		>
		<!-- Material -->
		<hamster-search v-model.sync="search" :disable="serTarget === 'all'"></hamster-search>
	  	<div>
		    <!-- <input v-model="target1">
		    <input v-model="target2">
		    <input v-model="target3"> -->
	    	<div class="layout-padding">
		      <hamster-tabs :refs="refsObj" class="primary inverted" v-on:change="tabChange">
		        <hamster-tab class="color_all" :class="{active_all: true}">
		          ALL
		        </hamster-tab>
		        <hamster-tab class="color_debug" :class="{active_debug: true}" :activeTab="true">
		          DEBUG
		        </hamster-tab>
		        <hamster-tab class="color_info" :class="{active_info: true}">
		          INFO
		        </hamster-tab>
		        <hamster-tab class="color_warn" :class="{active_warn: true}">
		          WARN
		        </hamster-tab>
		        <hamster-tab class="color_error" :class="{active_error: true}">
		          ERROR
		        </hamster-tab>
		      </hamster-tabs>
		      <br>
		      <div class="logger-scroll">
			      <div class="tab" name="all">
			        <div v-for="item in all">
			        	<dt class="color_all">{{item.tag}}</dt>
                        <dd class="">
                            <p class="log-page-time">{{item.time | formatDate}}</p>
                            <p class="log-page-content ellipsis_content3">{{item.content}}</p>
                        </dd>
			        </div>
			      </div>
			      <div class="tab" name="debug">
			        <div v-for="item in debug">
			        	<dt class="color_debug" @click="copyTag(item.tag)">{{item.tag}}</dt>
                        <dd class="">
                            <p class="log-page-time">{{item.time | formatDate}}</p>
                            <p class="log-page-content ellipsis_content3">{{item.content}}</p>
                        </dd>
			        </div>
			      </div>
			      <div class="tab" name="info">
			        <div v-for="item in info">
			        	<dt class="color_info" @click="copyTag(item.tag)">{{item.tag}}</dt>
                        <dd class="">
                            <p class="log-page-time">{{item.time | formatDate}}</p>
                            <p class="log-page-content ellipsis_content3">{{item.content}}</p>
                        </dd>
			        </div>
			      </div>
			      <div class="tab" name="warn">
			        <div v-for="item in warn">
			        	<dt class="color_warn" @click="copyTag(item.tag)">{{item.tag}}</dt>
                        <dd class="">
                            <p class="log-page-time">{{item.time | formatDate}}</p>
                            <p class="log-page-content ellipsis_content3">{{item.content}}</p>
                        </dd>
			        </div>
			      </div>
			      <div class="tab" name="error">
			        <div v-for="item in error">
			        	<dt class="color_error" @click="copyTag(item.tag)">{{item.tag}}</dt>
                        <dd class="">
                            <p class="log-page-time">{{item.time | formatDate}}</p>
                            <p class="log-page-content ellipsis_content3">{{item.content}}</p>
                        </dd>
			        </div>
			      </div>
		      </div>
	    </div>
	    <hamster-fab
	    	ref="fab"
			class="absolute-bottom-right" 
			:type="['primary']" 
			direction="up"
			:click="close"
			>
	    </hamster-fab>
	</hamster-modal>
</template>

<script>
	import Hamster from 'hamster'
	import Logger from './logger.class'

	const modalCSS = {
	    mat: {
	        maxHeight: '80vh',
	        height: 'auto'
	    },
	    oth: {
	        maxHeight: '80vh',
	        height: 'auto',
	        backgroundColor: 'transparent',
	        boxShadow: 'none'
	    }
	}
	export default {
	    data() {
	        return {
	            theme: Hamster.current,
	            css: modalCSS[Hamster.current],
	            refsObj: {},
	            search: '',
	            serTarget: '',
	            all: Logger.readLog() || [],
	            debug: Logger.readLog(0) || [],
	            info: Logger.readLog(1) || [],
	            warn: Logger.readLog(2) || [],
	            error: Logger.readLog(3) || []
	        }
	    },
	    computed: {
	        opened() {
	            return this.$refs.logger.active
	        }
	    },
	    watch: {
	        search(val) {
	            let serTarget = this.serTarget
	            if (serTarget === 'all') {
	                this[serTarget] = Logger.readLog()
	                return
	            }
	            if (!val) {
	                this[serTarget] = Logger.readLog(serTarget)
	            } else {
	                this[serTarget] = Logger.readLog(serTarget, val)
	            }
	        }
	    },
	    methods: {
	        close(fn) {
	            if (!this.opened) {
	                return
	            }
	            this.$refs.logger.close(() => {
	                this.$root.$destroy()
	                if (typeof fn === 'function') {
	                    fn()
	                }
	            })
	        },
	        tabChange(val) {
	            this.serTarget = this.refsObj[val].getAttribute('name')
	            if (this.serTarget === 'all') {
	                this[this.serTarget] = Logger.readLog()
	            } else {
	                this[this.serTarget] = Logger.readLog(this.serTarget)
	            }
	            this.search = ''
	        },
	        copyTag(tag) {
	            this.search = tag
	        }
	    },
	    mounted() {
	        this.$nextTick(() => {
	            this.$refs.logger.open()
	            this.$root.hamsterClose = this.close
	        })
	    },
	    destroyed() {
	        if (document.body.contains(this.$el)) {
	            document.body.removeChild(this.$el)
	        }
	    }
	}
</script>

<style lang="stylus">
	@import './logger.styl'
	.logger
	  .layout-padding
	    padding .5rem .5rem !important
	  .logger-scroll
	    max-height: 100vh - 23rem
	    overflow-y: auto
	  .tab
	    white-space normal
	    text-transform none
	    word-break break-all
	    word-wrap break-word
	    overflow-y: auto
	    div
	      border-bottom 1px solid #ccc
</style>