import { h } from "../src/h";
console.log('this is bussiness');
const element = h('form', { class: 'login-form', action: 'login' }, [
    h('input', { type: 'text', name: 'user' }),
    h('input', { type: 'password', name: 'pass' }),
    h('button', { on: { click: login } }, ['Log in'])
    ])

console.log(element);