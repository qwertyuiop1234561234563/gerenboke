
<template>
  
  <div class="swiper-container">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :navigation="true"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide><img src="@/assets/img/fg1.jpg" alt="风景1"></swiper-slide>
      <swiper-slide><img src="@/assets/img/fengjing2.jpg" alt="风景2"></swiper-slide>
      <swiper-slide><img src="@/assets/img/fengjing3.jpg" alt="风景3"></swiper-slide>
      <swiper-slide><img src="@/assets/img/fg2.jpg" alt="风景4"></swiper-slide>
      <swiper-slide><img src="@/assets/img/fengjing5.jpg" alt="风景5"></swiper-slide>
      <swiper-slide><img src="@/assets/img/fengjing6.jpg" alt="风景6"></swiper-slide>
    </swiper>
  </div>
  <div class="bottom">
    <div class="about">
      <img src="@/assets/img/touXiang.jpg" alt="头像">
      <h3>忘记你</h3>
    </div>
    <div>
      <p>蜉蝣一生，沧海一栗</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const modules = [Navigation, Pagination, Autoplay]

const onSwiper = (swiper: any) => {
  console.log(swiper)
}
const onSlideChange = () => {
  console.log('slide change')
}
</script>

<style>

.swiper-pagination {
  position: absolute;
  bottom: 20px !important;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  margin: 0 8px !important;
  background: #d8d8d8;
  opacity: 1;
  transition: all 0.3s;
}

.swiper-pagination-bullet-active {
  background: #919191 !important;
  width: 40px;
  border-radius: 4px;
}
</style>

<style scoped>
.swiper-container {
  width: 1335px;
  height: 760px;
  /* margin-top: 90px; */
  position: relative;
}

.swiper-slide {
  width: 100%;
  height: 100%;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}
.about{
  display: flex;
}
.about img{
  
    border-radius: 50%;
    height: 60px;
}
.bottom{
  margin-left: 20px;
}

</style>
