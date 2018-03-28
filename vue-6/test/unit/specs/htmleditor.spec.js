import Vue from 'vue'
import UIkit from 'uikit';
import {getVM} from '../helpers'
import HtmlEditor from '@/components/HtmlEditor'
import 'chance'

Vue.use(UIkit)
describe('htmleditor',()=>{
    const valueChangeHandler=sinon.spy()
    const orginalContent=Chance().paragraph()
    const editingContent=Chance().paragraph()
    let vm=getVM(h=>(<html-editor value={originalContent} on-change={valuechangedHandler}></html-editor>),{HtmlEditor})
    let editor=vm.$children[0]
    //取得HtmlEditor生成的textarea元素
    let textarea=editor.$el.querySelector('textarea')
    expect(textarea.textContent).to.equal(originalContent)
    editor.value=editingContent
    $(textarea).trigger('input')
    expect(valueChangeHandler).to.have.been.called
    }

)