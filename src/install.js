// import Platform from './platform'
import Events from './events'
// import {current as theme} from './theme'

// import transitionSlide from './transitions/slide'

import GridSelectedFilter from './filters/grid-selected'

import directiveAttr from './directives/attr'
import directiveGoBack from './directives/go-back'
import directiveScrollFire from './directives/scroll-fire'
import directiveScroll from './directives/scroll'
import directiveTooltip from './directives/tooltip'

import Modal from './components/modal/modal'

// function registerTransition(_Vue) {
//     _Vue.transition('slide', transitionSlide)
// }

function registerFilters(_Vue) {
    _Vue.filter('gridShowSelected', GridSelectedFilter)
}

function registerDirectives(_Vue) {
    _Vue.directive('attr', directiveAttr)
    _Vue.directive('go-back', directiveGoBack)
    _Vue.directive('scroll-fire', directiveScrollFire)
    _Vue.directive('scroll', directiveScroll)
    _Vue.directive('tooltip', directiveTooltip)
}

function registerComponents(_Vue) {
    _Vue.component('hamster-modal', Modal)
}

export let Vue

export default function(_Vue) {
    if (this.installed) {
        console.warn('hamster already installed in Vue.')
        return
    }

    Vue = _Vue

    // registerTransition(_Vue)
    registerFilters(_Vue)
    registerDirectives(_Vue)
    registerComponents(_Vue)

    Events.trigger('app:vue-ready', Vue)
}
