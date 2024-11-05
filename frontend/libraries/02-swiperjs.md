# SwiperJs
Feature rich slider library for frontend UI.
<br/><i>(In this docs, swiperjs integration will be described by Vue.js 3)</i>

<br/><br/>

## I. PURPOSE
To easily implement a flexible slider feature with many options.

<br/><br/>

## II. SETUP
SwiperJs package can be installed by CDN or NPM. 

### CDN
For CDN link, see the official docs. https://swiperjs.com/get-started

### NPM

- To install SwiperJs

```
npm install swiper
```

<br/><br/>

## III. CODE
### Basic Integration
#### Vue.js 3 
This is a basic Vue.js 3 and SwiperJs implementation.

```html
<template>
<div class="swiper mySwiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      ...
    </div>
    <div class="swiper-slide">
      ...
    </div>
    <div class="swiper-slide">
      ...
    </div>
    <div class="swiper-slide">
      ...
    </div>
  </div>
  <div class="swiper-pagination"></div>
</div>
</template>

<script setup>
import { onMounted } from "vue";
// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

onMounted(() => {
  new Swiper(".swiper", {
    modules: [Pagination, Navigation],
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
</script>
```
For advanced feature, see this https://swiperjs.com/element#usage-with-vue

<br/><br/>

## IV. STYLING
These are the basic and ready to use styles
```css
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:global(.swiper-pagination-bullet) {
  @apply bg-orange-500;
}
:global(.swiper-pagination-bullet-active) {
  @apply bg-red-600;
}
.swiper-button-next,
.swiper-button-prev {
  @apply text-red-500; /* Navigation button color */
}
```

<br/><br/>

## V. SIDENOTE
SwiperJs is the frontend slider that can be used in any frontend frameworks. But SwiperJs is recommended one both Core app and Vue app.

<br/><br/>

## VI. REFERENCE
### Official Documentation
- Main Docs
<br/> https://swiperjs.com/element

- With Vue (But this is not recommended, so use element in vue app)
<br/> https://swiperjs.com/vue

<br/><br/>

## VII. ALTERNATIVE ONES
- Vue Splide
<br/> https://splidejs.com/integration/vue-splide/
