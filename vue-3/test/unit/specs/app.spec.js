import Vue from 'vue';
import app from '../../../src/Test.vue'
var expect=require('chai').expect;
describe('test app.vue',()=>{
    it('组件加载后，title是Hello World',()=>{
        const Constructor = Vue.extend(app)
        const vm = new Constructor().$mount()
        console.log(vm.$el)
        expect(vm.$el.innerHTML).to.be.equal('Hello World')
    })
})