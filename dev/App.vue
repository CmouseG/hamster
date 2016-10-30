<template>
    <div id="container">
        <hamster-layout>
        	<!-- header start -->
        	<div slot="header" class="toolbar">
        		<button class="left-drawer-opener"><i>menu</i></button>
        	</div>
        	<!-- header end -->

            <!-- left drawer start -->
            <hamster-drawer>
                <div class="drawer-header">
                    <img v-bind:src="'statics/imgs/bg.jpg'">
                    <a class="avatar">
                        <img>
                    </a>
                </div>

                <div class="list">
                    <router-link class="item item-link drawer-closer" router-link to="/">
                        <i class="item-primary">home</i>
                        <div class="item-content">首页</div>
                    </router-link>
                    <router-link class="item item-link drawer-closer" router-link to="/dialog">
                        <i class="item-primary">announcement</i>
                        <div class="item-content">dialog</div>
                    </router-link>
                    <router-link class="item item-link drawer-closer" router-link to="/action-sheet">
                        <i class="item-primary">build</i>
                        <div class="item-content">action-sheet</div>
                    </router-link>
                    <router-link class="item item-link drawer-closer" router-link to="/tab">
                        <i class="item-primary">vignette</i>
                        <div class="item-content">tab</div>
                    </router-link>
                    <router-link class="item item-link drawer-closer" router-link to="/logger">
                        <i class="item-primary">face</i>
                        <div class="item-content">logger</div>
                    </router-link>
                </div>
            </hamster-drawer>
            <!-- left drawer end -->

        	<!-- content start -->
        	<router-view class="layout-view"></router-view>
        	<!-- content end -->

        	<!-- footer start -->
        	<div slot="footer" class="light">
        		<div class="row small-gutter">
                    <div class="auto">
                        <a class="avatar">
                            <img :src="'statics/imgs/angular.png'">
                        </a>
                    </div>
                    <div class="auto">
                        <a class="avatar">
                            <img :src="'statics/imgs/vue.png'">
                        </a>
                    </div>
                    <div class="auto">
                        <a class="avatar">
                            <img :src="'statics/imgs/react.png'">
                        </a>
                    </div>      
                </div>
        	</div>
        	<!-- footer end -->
        </hamster-layout>
    </div>
</template>

<script>
	export default {
	    data() {
	        return {
	            msg: 'Hello Vue, Come Here'
	        }
	    }
	}
</script>

<style lang="stylus">
    .layout-view
      padding 10px
</style>
