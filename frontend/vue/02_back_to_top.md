# Vue.js 3 Back to Top Feature

## Script
```js
<script setup>
import { ArrowUpIcon } from '@heroicons/vue/24/outline';
import { onMounted, onUnmounted, ref } from 'vue';

const backToTopVisible = ref(false);
const handleScroll = () => {
    backToTopVisible.value = window.scrollY > 800; // Show the button after scrolling 200px
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>
```

## Template
```html
<template>
    <div>
        <transition name="btt-transition">
            <button v-if="backToTopVisible" @click="scrollToTop"
                class="fixed bottom-2 md:bottom-5 right-2 md:right-5 z-50 px-2 md:px-3 py-4 md:py-5 bg-color-1 rounded-lg text-white">
                <ArrowUpIcon class="size-5" />
            </button>
        </transition>
    </div>
</template>
```

## Style
```css
<style scoped>
.btt-transition-enter-active,
.btt-transition-leave-active {
    transition: opacity 0.5s;
}

.btt-transition-enter-from,
.btt-transition-leave-to {
    opacity: 0;
}
</style>
```
