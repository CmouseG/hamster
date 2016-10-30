import Vue from 'vue'

Vue.filter('formatDate', (timestamp) => {
    return new Date(timestamp).toLocaleString()
})

