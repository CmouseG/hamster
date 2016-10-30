<template>
  <div
    class="fab flex inline justify-center"
    :class="{opened: opened, 'with-backdrop': click || backdrop}"
  >
    <div v-if="click || backdrop" class="backdrop" @click="click"></div>
    <button class="circular raised" @click="click" :class="typeCpu">
      <i class="fab-icon">{{icon}}</i>
      <i class="fab-active-icon">{{activeIcon}}</i>
    </button>
    <div class="fab-actions flex inline items-center" :class="[direction]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        type: {
            type: Array,
            default() {
                return ['primary']
            }
        },
        icon: {
            type: String,
            default: 'add'
        },
        activeIcon: {
            type: String,
            default: 'close'
        },
        direction: {
            type: String,
            default: 'right'
        },
        click: {
            type: Function,
            default: function() {}
        },
        backdrop: {
            type: Boolean
        }
    },
    data() {
        return {
            opened: false
        }
    },
    computed: {
        typeCpu: function() {
            return Array.isArray(this.type) || typeof value === 'undefined' ? this.type : this.type.split(' ')
        }
    },
    methods: {},
    events: {
        closeFAB() {
            this.toggle(true)
        }
    }
}
</script>
