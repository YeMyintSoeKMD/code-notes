# Video Js
Feature rich slider library for frontend UI.
<br/><i>(In this docs, swiperjs integration will be described by Vannilla Js and Vue.js)</i>

<br/><br/>

## I. PURPOSE
To easily get a slider component with many options and features. There are many options and components to make sliders flexible.

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
#### Vannilla Js
This is a basic Vannilla Js and Video.js player implementation. 
...

#### Vue.js 3 
I am going to create a video player component file and use it in other compoent.

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
...

<br/><br/>

## VI. REFERENCE
### Official Documentation
- Main
<br/> ...

<br/><br/>

## VII. ALTERNATIVE ONES
- ...
<br/> ...
