import Vue from 'vue'
export const getVM = (render, component) => {
  return new Vue({
    el: document.createElement('div'),
    render,
    components:{
      'UkButton': component
    },
  }).$mount()
}