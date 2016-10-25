<template>
    <div class="group">
        <button class="primary" @click="alert()">Alert</button>
        <button class="primary" @click="prompt()">Prompt</button>
        <button class="primary" @click="confirm()">Confirm</button>
    </div>
</template>

<script>
import hamster from 'hamster'
let Dialog = hamster.Dialog
export default {
    methods: {
        alert() {
            Dialog.create({
                title: 'Alert',
                message: 'Modern HTML5 Single Page Application front-end framework on steroids.'
            })
        },
        prompt() {
            Dialog.create({
                title: 'Prompt',
                message: 'Modern HTML5 Single Page Application front-end framework on steroids.',
                inputs: [
                    {
                        name: 'input1',
                        label: 'Placeholder 1'
                    },
                    {
                        name: 'input2',
                        label: 'Placeholder 2'
                    }
                ],
                buttons: [
                    'Cancel',
                    {
                        label: 'Ok',
                        handler(data) {
                            console.log('OK!', data)
                        }
                    }
                ]
            })
        },
        confirm() {
            Dialog.create({
                title: 'Confirm',
                message: 'Modern HTML5 Single Page Application front-end framework on steroids.',
                buttons: [
                    {
                        label: 'Disagree',
                        handler() {
                            console.log('Disagreed...')
                        }
                    },
                    {
                        label: 'Agree',
                        handler() {
                            console.log('Agreed!')
                        }
                    }
                ]
            })
        }
    }
}
</script>
