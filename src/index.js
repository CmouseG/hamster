import Velocity from 'velocity-animate'
window.Velocity = Velocity
import 'velocity-animate/velocity.ui'

import install from './install'
import start from './start'
import init from './init'
import * as theme from './theme'

// import Modal from './components/modal/src/modal.js'
import Dialog from './components/dialog/src/dialog'
import ActionSheet from './components/action-sheet/src/action-sheet'

let hamster = {
    varsion: '0.1.0',
    install,
    start,
    theme,
    Dialog,
    ActionSheet
}

init(hamster)

export default hamster
