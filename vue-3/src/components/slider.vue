<template>
    <div class="swiper-container"
         ref="slider">
        <swiper class="swiper-wrapper" :options="swiperOption">
            <div class="swiper-slide"
                 v-for="slide in slides">
                <img :src="slide.img_url"/>
            </div>
    
        <div class="swiper-pagination"
             ref="pagination"></div>
       </swiper>
    </div>
</template>
<style>
    .swiper-container {
        width: 100%;
        margin: 0;
        padding: 0;
    }
    .swiper-wrapper {
        height: 200px;
    }
    .swiper-slide img {
        max-width: 100%;
    }
    .swiper-slide {
        text-align: center;
        background: #fff;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
</style>
<script type="text/ecmascript-6">
  import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default{
        props: ['slides'],
        data(){
            return {
                swiperOption:{
                    
              }
            }
        },
        computed:{
            swiper(){
                return this.$refs.slder.swiper
            }
        },
        components:{
            swiper,
            swiperSlide
        }
    }
</script>