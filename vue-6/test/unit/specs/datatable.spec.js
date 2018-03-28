import DataTable from '@/components/datatable.js'
import BookForm from '@/components/book-editform.vue'
import Vue from 'vue'
import BooksData from '@/fixture/items.json'
import _ from 'lodash'
import {getVM} from '../helpers'
let fields = [
    {name: 'name', title: '书名'},
    {name: 'category', title: '分类'},
    {name: 'published', title: '发布日期'}
  ]
const compileComponent = (tmpl, exts) => {
    let defaults = {
      template: tmpl,
      components: {DataTable}
    }
  
    let TestHolder = Vue.extend(exts ? _.extend(defaults, exts) : defaults)
  
    return new TestHolder({
      el: document.createElement('div'),
      data: {
        items: BooksData,
        fields: fields
      }
    }).$mount()
  }
describe('datatable',()=>{
    it('应该自动根据输入数据行与列定义输出正确的表格结构',()=>{
        let vm=compileComponent('<div><data-table :data-items="items" :date-fields="fields"></data-table></div>')
        expect(vm.$el.querySelectorAll('tbody>tr').length).to.equal(BooksData.length)
        expect(vm.$el.querySelectorAll('thead>tr>th').length).to.equal(3)
    })
    it('应该正确输出自定义序列并触发排序和行选事件',()=>{
        let sortHandler=sinon.spy()
        let selectionChangeHandler=sinon.spy()
        let linkHandler=sinon.spy()
        let vm = compileComponent(`<div>
              <data-table :data-items="items"
                          :data-fields="fields"
                          @sort = "sortHandler"
                          @selection-change="selectionChangeHandler"
                          @cell-click="linkHandler">
                <field name="name" inline-template>
                   <div>
                      <a>
                         {{ item.name }}
                      </a>
                      <p>
                        {{ item.isbn }}
                      </p>
                    </div>
                </field>
              </data-table></div>`, {
                methods: {
                  linkHandler,
                  sortHandler,
                  selectionChangeHandler
                }
    })
            expect(vm.$el.querySelectorAll('tbody>tr').length).to.equal(BooksData.length)
            expect(vm.$el.querySelectorAll('thead>tr>th').length).to.equal(3)
            expect(vm.$el.querySelectorAll('a').length).to.equal(BooksData.length)
            (vm.$el.querySelectorAll('thead>tr>th')[1]).click()
            // window.$(vm.$el.querySelectorAll('tbody>tr:first>td>input')).trigger('click')
            expect(sortHandler).to.have.been.called
            // expect(linkHandler).to.have.been.called
        // expect(selectionChangeHandler).to.have.been.called
      }),
      describe('book-form',()=>{
        it('#save',()=>{
          let formSaveHandler=sinon.spy()
          let book={}
          let vm=getVM(h=><book-form book={book} >
                  </book-form>,
                {BookForm})
        })
      })
})
