<template>
<div class="uk-block uk-block-primary uk-contrast ">
    <div class="uk-container-center">
      <h1 class="uk-heading-large">{{header}}
        <small>{{subHeader}}</small>
      </h1>
      </div>
  </div>
</template>
<script>
  export default {
      props:['header','subHeader']
  }
  </script>