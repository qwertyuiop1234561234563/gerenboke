<template>
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
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    ...
  </swiper>
</template>

 <script setup lang="ts" name="Home">
 import { Navigation, Pagination, Autoplay} from 'swiper/modules';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/autoplay';

  const modules = [Navigation, Pagination, Autoplay];

      // Event handlers
  const onSwiper = (swiper:any) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      
</script>
<style scoped>
.swiper {
  width: 100%;
  height: 400px;
}

/* 覆盖默认分页器样式 */
:deep(.swiper-pagination-bullet-active) {
  background: #505050;
}

/* 导航按钮样式 */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.swiper-slide {
  width: 100% !important;
  height: 600px;
}
</style>