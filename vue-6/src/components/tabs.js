
export const Tab = {
        name: 'Tab',
        props:{
            label:{
                type:String,
                default:'Tab'
            }
        },
        template:'<li><slot></slot></li>'
    };
export const Tabs={
    name:'Tabs',
    data(){
        return {
            tabItems:[]
        }
    },
    beforeMount(){
        this.tabItems=this.$slots.default.filter(node=>
            //通过名称取出叫tab的所有组件
            node.componentOptions&&node.componentOptions.tag==='tab'
        ).map((node,index)=>{
            //读取每个tab的索引号
            const data=node.componentOptions.propsData
            data.index=index
            return node
        })
    },
    render (h) {
       // let tabID = uuid.v4()
       let tabID=100
        let tabJSON = `{ active:${this.active},connect:'#${tabID}'}`
        return (
          <div>
            <ul class="uk-tab"
                data-uk-tab={tabJSON}>
              {
                this.tabItems.map(tab => (
                    <li>
                      <a href="">{ tab.componentOptions.propsData.label }</a>
                    </li>
                  )
                )
              }
            </ul>
            <ul class="uk-switcher uk-margin"
                id={tabID}>
              {
                this.tabItems.map(tab => (
                  <li>
                    {
                      tab.componentOptions.children
                    }
                  </li>
                ))
              }
            </ul>
          </div>
        )
    }
    
}