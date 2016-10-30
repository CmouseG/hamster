<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
const prefixCls = 'hamster-affix'

function getScroll(target, top) {
    const prop = top ? 'pageYOffset' : 'pageXOffset'
    const method = top ? 'scrollTop' : 'scrollLeft'

    let ret = target[prop]

    if (typeof ret !== 'number') {
        ret = target[method]
    }
    return ret
}

function getOffset(element, target) {
    const rect = element.getBoundingClientRect()

    const scrollTop = getScroll(target, true)
    const scrollLeft = getScroll(target)

    const docEl = target
    const clientTop = docEl.clientTop || 0
    const clientLeft = docEl.clientLeft || 0
    console.log(rect)
    console.log('scrollTop' + scrollTop)
    console.log('clientTop' + clientTop)

    return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft
    }
}

export default {
    props: {
        offsetTop: {
            type: Number,
            default: 0
        },
        offsetBottom: {
            type: Number
        }
    },
    data() {
        return {
            affix: false,
            styles: {}
        }
    },
    computed: {
        offsetType() {
            let type = 'top'
            if (this.offsetBottom >= 0) {
                type = 'bottom'
            }
            return type
        },
        classes() {
            return [
                {
                    [`${prefixCls}`]: this.affix
                }
            ]
        }
    },
    mounted() {
        this.target = document.querySelector('div[class*=modal-logger-scroll]')
        this.target.addEventListener('scroll', this.handleScroll, false)
        window.addEventListener('resize', this.handleScroll, false)
    },
    beforeDestroy() {
        this.target.removeEventListener('scroll', this.handleScroll, false)
        window.removeEventListener('resize', this.handleScroll, false)
    },
    methods: {
        handleScroll() {
            console.log(this.affix)
            const affix = this.affix
            const scrollTop = getScroll(this.target, true)
            const elOffset = getOffset(this.$el, this.target)
            const windowHeight = this.target.offsetHeight
            const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight
            console.log('scrollTop:' + scrollTop)
            console.log(elOffset)
            console.log('windowHeight:' + windowHeight)
            console.log('elHeight:' + elHeight)
            console.log('offsetTop:' + this.offsetTop)

            // fixed top
            if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType === 'top' && !affix) {
                this.affix = true
                this.styles = {
                    top: `${this.offsetTop}px`,
                    left: `${elOffset.left}px`,
                    width: `${this.$el.offsetWidth}px`
                }
                this.$emit('on-change', true)
            } else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType === 'top' && affix) {
                this.affix = false
                this.styles = null
                this.$emit('on-change', false)
            }

             // fixed bottom
            if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType === 'bottom' && !affix) {
                this.affix = true
                this.styles = {
                    bottom: `${this.offsetBottom}px`,
                    left: `${elOffset.left}px`,
                    width: `${this.$el.offsetWidth}px`
                }
                this.$emit('on-change', true)
            } else if ((elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType === 'bottom' && affix) {
                this.affix = false
                this.styles = null

                this.$emit('on-change', false)
            }
        }
    }
}
</script>

<style lang="stylus">
	.hamster-affix
	  position fixed
	  z-index 12
</style>