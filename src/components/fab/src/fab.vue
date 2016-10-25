<template>
  <div
    class="fab flex inline justify-center"
    :class="{opened: opened, 'with-backdrop': click || backdrop}"
  >
    <div v-if="click || backdrop" class="backdrop" @click="toggle(true)"></div>
    <button class="circular raised" @click="toggle()" :class="typeCpu">
      <i class="fab-icon">{{icon}}</i>
      <i class="fab-active-icon">{{activeIcon}}</i>
    </button>
    <div class="fab-actions flex inline items-center" :class="[direction]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Hamster from 'hamster'
let ActionSheet = Hamster.ActionSheet

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
            type: Function
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
    methods: {
        toggle(fromBackdrop) {
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
    },
    events: {
        closeFAB() {
            this.toggle(true)
        }
    }
}
</script>
