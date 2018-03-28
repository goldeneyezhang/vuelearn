import UkButton from '@/components/button.js'
import {getVM} from '../helpers'
import _ from 'lodash'

describe('UkButton',()=>{
    it('mount',()=>{
       
        let vm=getVM(h=><uk-button icon="disk"  active={true} size="large" onclick={clickHandler}>
        保存</uk-button>,UkButton)
          const cls=vm.$el.getAttribute('class')
          const el=vm.$el
          const clickHandler=sinon.spy(el,'click')
          console.log("clickHandler="+typeof clickHandler)
          expect(cls).to.include('uk-button-large')
          expect(cls).to.include('uk-active')
          //expect(el.querySelector('.uk-icon-edit')).to.exist
          expect(el.querySelector('.uk-icon-disk')).to.exist
          expect(_.trim(el.textContent)).to.equal('保存')
          vm.$el.click()
          expect(clickHandler).to.have.been.called
    })
  
})