import FormField from '@/components/form-field.js'
import Vue from 'vue'
describe('FormField',()=>{
    it('#mount',()=>{
        let vm=new Vue({
            el:document.createElement('div'),
            render(h){
                return <div>
                    <form-field label="姓名" name="name" rules="require" value="Ray">
                    </form-field>
                    </div>
            },
            components:{FormField}
        }).$mount()
        expect(vm.$el.querySelector('label').textContent).to.equal('姓名')
        expect(vm.$el.querySelector('label').getAttribute('for')).to.equal('name')
        expect(vm.$el.querySelector('input').value).to.equal('Ray')
    })
})