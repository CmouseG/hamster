<template>
	<div class="switch">
		<input class="switch-input" type="checkbox" v-model="toggle">
		<span class="switch-core"></span>
		<div class="switch-label">
			<slot></slot>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                toggle: this.value
            }
        },
        props: {
            value: ''
        },
        watch: {
            toggle(newVal, oldVal) {
                this.$emit('input', newVal)
            }
        }
    }
</script>
