<template>
    <div
      class="search"
      :class="{'search-centered': !this.focused && this.model === '', disabled: disable}"
    >
        <div class="search-input-container">
            <button class="search-icon">
                <i>{{ icon }}</i>
            </button>
            <input
              type="text"
              class="search-input no-style"
              :placeholder="placeholder"
              v-model="model"
              @focus="focused = true"
              @blur="focused = false"
              :disabled="disable"
            >
            <button
              class="search-clear"
              @click="clear()"
              :class="{hidden: this.model === ''}"
            >
                <i class="mat-only">clear</i>
            </button>
        </div>
    </div>
</template>

<script>
import Utils from '../../../utils'

export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        debounce: {
            type: Number,
            default: 300
        },
        icon: {
            type: String,
            default: 'search'
        },
        placeholder: {
            type: String,
            default: 'Search'
        },
        disable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            focused: false
        }
    },
    watch: {
        debounce(value) {
            this.__createDebouncedTrigger(value)
        }
    },
    computed: {
        model: {
            get() {
                return this.value
            },
            set(value) {
                this.__update(value)
            }
        }
    },
    methods: {
        clear() {
            if (!this.disable) {
                this.$emit('input', '')
            }
        },
        __createDebouncedTrigger(debounce) {
            this.__update = Utils.debounce(value => {
                if (this.value !== value) {
                    this.$emit('input', value)
                }
            }, debounce)
        }
    },
    created() {
        this.__createDebouncedTrigger(this.debounce)
    }
}
</script>
