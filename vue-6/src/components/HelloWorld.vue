<template>
 <div id="app">
    <view-page title="图书"
        sub-title="Vue CRUD示例">
  <!--页面正文-->
    <!--工具栏-->
          <!--图书统计-->
          <div slot="counting">
            <counting-status :total="books.length" :selection="selection.length" ></counting-status>
          </div>
          <!--图书统计-->
          <!--搜索框-->
          <div slot="search">
         <search-box placeholder="请输入你要搜索的书名" :terms="terms" @search="terms=$event"></search-box>
         </div>
          <!--搜索框-->
          <div slot="buttons">
            <button title="删除已选中的图书" class="uk-button uk-button-danger" v-if="hasSelection" id="btn-delete"><i uk-icon="icon: trash"></i>
            </button>
            <button class="uk-button uk-button-primary">
              <i uk-icon="icon: plus"></i> <span>添加</span>
            </button>
          </div>
    <!--工具栏-->
    <!--图书数据表格-->
     <div slot="footer">
    <table class="uk-table uk-table-striped" v-if="bookFilter.length">
      <thead>
        <tr>
          <th class="uk-text-center disable-select" :class="{'sorting':sorted('name')}" data-col="name" @click="sortBy('name')">
            <div>书名
              <span v-if="sortingKey=='name'">
              <span uk-icon="icon:triangle-up" v-show="direction=='asc'" class="asc">
              </span>
               <span uk-icon="icon:triangle-down" v-show="direction=='desc'" class="desc">
              </span>
              </span></div>
            </th>
          <th class="uk-text-center uk-width-1-6 disable-select" :class="{'sorting':sorted('category')}" data-col="category" @click="sortBy('category')">
          <div>类别
              <span v-if="sortingKey=='category'">
              <span uk-icon="icon:triangle-up" v-show="direction=='asc'"  class="asc">
              </span>
               <span uk-icon="icon:triangle-down" v-show="direction=='desc'" class="desc">
              </span>
              </span></div>
            </th>
          <th class="uk-text-center uk-width-1-5 disable-select" :class="{'sorting':sorted('published')}" data-col="published" @click="sortBy('published')">
             <div>出版日期
               <span v-if="sortingKey=='published'">
              <span uk-icon="icon:triangle-up" v-show="direction=='asc'"  class="asc">
              </span>
               <span uk-icon="icon:triangle-down" v-show="direction=='desc'" class="desc">
              </span>
              </span></div>
          </th>
        </tr>
      </thead>
      <tbody>
         <tr v-for="book in bookFilter" :class="{'book-selected':book.selected}" :data-isbn="book.isbn" :key="book.isbn">
          <td class="book-name uk-form uk-grid">
            <div class="uk-width-1-5">
              <input type="checkbox" class="uk-margin-right cb-book" v-model="book.selected" :data-isbn="book.isbn" @change="selectionChanged(book,$event)"/>
            </div>
            <div class="uk-width-3-5">
              <a class="uk-h3" href="javascript:void(0)" :title="book.name" @click.prevent="editBook(book)">{{book.name}}</a>
              <p class="authors uk-text-muted uk-text-small">{{book.authors}}</p>
            </div>
          </td>
          <td class="small">{{book.category}}</td>
          <td class="published uk-text-center">{{book.published}}</td>
        </tr>
      </tbody>
    </table>
    <div class="pages" v-show="bookFilter.length>0">                        
     <ul class="pagination" >
            <li v-show="currentPage !=1" @click="currentPage--&& page(currentPage)" ><a href="#">上一页</a></li>
            <li v-for="index in pages" @click="page(index)" :class="{'active':currentPage == index}" :key="index">
              <a href="#" >{{index}}</a>
            </li>
            <li v-show="pageCount != currentPage && pageCount != 0 " @click="currentPage++&&page(currentPage)"><a href="#" >下一页</a></li>
        </ul>
    </div>
    <div class="uk-text-muted uk-text-large uk-text-center empty-holder" v-if="bookFilter.length==0">抱歉，尚没有找到任何如何条件的图书</div>
    <!--图书数据表格-->
  </div>
  <!--页面正文-->
  <!--对话框-->
  <!--图书编辑/新建 数据表单-->
  <!--对话框-->
  <modal ref="modal" :headerText="statusText" @dialogClose="current=undefined">
        <book-edit-form :book="current"
                        ref="form" v-if="current">
        </book-edit-form>

        <div slot="footer"
             class="uk-modal-footer uk-text-right">
          <uk-button color="primary"
                     @click="save">保存</uk-button>
          <uk-button color="danger"
                     @click="$refs.modal.close()">关闭</uk-button>
        </div>
</modal>
    </view-page>
  </div>
</template>

<script>
import "../assets/site.less"
import BookData from "../fixture/books.json"
import SearchBox from './SearchBox.vue'
import CountingStatus from './CountingStatus.vue'
import ViewPage from './viewpage.vue'
import Modal from './dialog.vue'
import UkButton from './button.js'
 import BookEditForm from './book-editform.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      terms:'',
      books:[],
      selection:[],
      sortingKey:'',
      direction:'asc',
      statusText:'',
      current: undefined,
      totalBooks:0,
      currentPage:1,
      pageSize:10,
      pageCount:4
    }
  },
  components:{
    SearchBox,
    CountingStatus,
    ViewPage,
    BookEditForm,
    Modal,
    UkButton
  },
  computed:{
    bookFilter(){
      //用函数式将书名包名含有terms内容的图书都筛选出来，如果没有则返回原数组
      return this.terms.length?this.books.filter(x=>x.name.indexOf(this.terms)>-1):this.books
    },
    hasSelection (){
      return this.selection.length>0
    },
    pages(){
      var pag = [];
     for(var i=1;i<=this.pageCount;i++)
     {
       pag.push(i);
     }
      return pag
    }
  },
  methods:{
    page(index){
      //点击翻页    
      this.currentPage=index;             
      this.fetchBooks()
        },
    selectionChanged(book,e){
      if(e.target.checked){
        this.selection.push(book.isbn)
        //取唯一值
        this.selection=_.uniq(this.selection)
      }else{
        //排除符合条件的数据并返回新的数组
        this.selection=_.reject(this.selection,b=>book.isbn===b)
      }
    },
    sorted(key){
      return key===this.sortingKey
    },
    sortBy(key){
      if(key===this.sortingKey){
        //对排序方向进行互斥式交换
        this.direction=this.direction==='asc'?'desc':'asc'
      }
      this.sortingKey=key
      
      this.fetchBooks()
      //this.books=_.orderBy(this.books,key,this.direction)
    },
      save () {
        //this.bookService.save(this.current)
        //this.refreshBooks()
        if(this.isEditing){
          this.bookService.update({id:this.current.isbn},this.current)
        }else{
          this.bookService.save(this.current)
        }
        this.fetchBooks()
      },
      editBook (book) {
        // 与实例拖钩进行克隆
        this.current = _.extend({}, book)
        this.statusText = `编辑${book.name}`
        console.log(this.$refs.modal)
        this.$refs.modal.open()
      },
      fetchBooks(options){
        var defaults={
          pageIndex:this.currentPage,
          pageSize:this.pageSize,
          filter:this.terms,
          sort:this.sortingKey,
          dir:this.direction
        }
        console.log(defaults.pageIndex)
        return this.bookService
        .query(options?_.extend({},defaults,options):defaults)
        .then((res)=>{
          console.log(res.body)
          this.books=res.body.data
          this.pageCount=res.body.total_pages
        },(error)=>{
          console.log(error)
        })
      },
      removeBooks(){
        this.$ui.confirm('真的要删除所选中的图书吗？',()=>{
          //将要删除的selection数组作为对象写入到HTTP body内
          this.$http.delete('/api/books',{body:this.selection})
          .then((res)=>{
            this.selection=[]
            this.refreshBooks()
          })
        })
      }
  },
  created(){
    
    this.bookService=this.$resource('/api/books')

    this.fetchBooks()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.pagination {
  position: relative;
}
.pagination li{
  display: inline-block;
  margin:0 5px;
}
.pagination li a{
  padding:.5rem 1rem;
  display:inline-block;
  border:1px solid #ddd;
  background:#fff;

  color:#0E90D2;
}
.pagination li a:hover{
  background:#eee;
}
.pagination li.active a{
  background:#0E90D2;
  color:#fff;
}
</style>
