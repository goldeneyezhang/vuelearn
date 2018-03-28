 <template>
            <div class="uk-form">
              <div class="uk-form-controls">
                <i  uk-icon="icon: search"></i>
                <input type="search"   @keyup="$emit('search',$event.target.value)"   :value="terms" @keyup.enter="$emit('search',$event.target.value)" class="search-box" :placeholder="placeholder" style="width:300px"/></div>
              </div>
</template>
<script>
  export default {
      name:'SearchBox',
      props:['terms','placeholder']
  }
  </script>