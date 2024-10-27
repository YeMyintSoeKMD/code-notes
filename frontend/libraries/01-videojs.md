# Video Js
Video player for video streaming feature. 
<br/><i>(In this docs, Videojs integration will be described by Vannilla Js and Vue.js)</i>

<br/><br/>

## I. PURPOSE
To enhance video player for seamless video streaming service. There are many options, theme and plugins to make video player flexible.

<br/><br/>

## II. SETUP
Videojs package can be installed by CDN or NPM. 

### CDN
For CDN link, see the official docs. https://videojs.com/getting-started

### NPM

- To install Videojs

```
npm install --save-dev video.js
```

- To install a plugin <i>(Optional, but required if you want to use a plugin)</i>

```
yarn add videojs-hotkeys

# or npm

npm i videojs-hotkeys --save
```

<br/><br/>

## III. CODE
### Basic Integration
#### Vannilla Js
This is a basic Vannilla Js and Video.js player implementation. 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Js</title>
    <!-- video js style CDN -->
    <link href="https://vjs.zencdn.net/8.16.1/video-js.css" rel="stylesheet" />
    <style>
        /* some video-js styles will go here*/
    </style>
</head>
<body>
    <video
    id="videoPlayer"
    class="video-js"
    data-setup="{}">
    <source src="video/test.mp4" type="video/mp4" />
    <source src="video/test.mp4" type="video/webm" />
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank"
        >supports HTML5 video</a
      >
    </p>
  </video>
  <!-- videojs script CDN -->
  <script src="https://vjs.zencdn.net/8.16.1/video.min.js"></script>
  <!-- Plugin CDN -->
  <script src="https://cdn.sc.gl/videojs-hotkeys/0.2/videojs.hotkeys.min.js"></script>
  <script>
    let player = videojs('videoPlayer', {
        controls: true,
        poster: 'images/test.png',
        loop: true,
        playsinline: true,
        responsive: true,
        playbackRates: [0.25, 0.5, 1, 1.5, 2, 3],
        plugins: {
            hotkeys: {
                seekStep: 5,
            }
        }
    })
  </script>
</body>
</html>
```

#### Vue.js 3 
I am going to create a video player component file and use it in other compoent.

This is a basic Vue.js 3 and Video.js player implementation. This example component instantiates the player on ```onMounted``` and destroys it on ```onUnmounted```:

```html
<!-- VideoPlayer.vue -->

<template>
    <div>
        <video ref="videoPlayer" class="video-js vjs-fluid"></video>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import videojs from 'video.js';
import "videojs-hotkeys";

// some prop those must be passed from parent component
const props = defineProps({
    src: {
        type: String,
        required: true
    },
    autoPlay: {
        type: Boolean,
    }
});

// video element ref
const videoPlayer = ref(null);
let player = null;

// initialize videojs with some basic options
onMounted(() => {
    player = videojs(videoPlayer.value, {
        sources: [{ src: props.src, type: 'video/mp4' }],
        controls: true,
        autoplay: props.autoPlay,
        playsinline: true,
        responsive: true,
        playbackRates: [0.25, 0.5, 1, 1.25, 1.5, 2],
        plugins: {
            hotkeys: {
                volumeStep: 0.1,
                seekStep: 5,
            },
        },
    });
    player.on('ended', () => {
        // do some stuff as soon as video is ended
    })
});

// remove player after closed component
onUnmounted(() => {
    if (player) player.dispose()
});

// pause the video
const pauseVideo = () => {
    if (player) player.pause()
}

// expose the function to be able to invoke from parent component just in case
defineExpose({ pauseVideo });
</script>

<style>
/* Videojs styles */
@import 'video.js/dist/video-js.css';

/* some video-js styles will go here*/
</style>
```

Finally, use the component like this

```html
<!-- App.vue -->
<template>
    <VideoPlayer src="videos/test.mp4" :autoPlay="true" />
</template>

<script setup>
    import VideoPlayer from "./Components/VideoPlayer.vue";
</script>
```

<br/><br/>

## IV. STYLING
These are the basic and ready to use styles for both Vannilla and Vue.js setup
```css
/* Change the border of the big play button. */
.video-js .vjs-big-play-button {
    background-color: rgb(15, 118, 110);
    border: none;
    border-radius: 4px;
}

/* Change the bg color of the big play button when hover */
.video-js .vjs-big-play-button:hover {
    background-color: rgb(15, 118, 110);
}

/* Change the color of various "bars". */
.video-js .vjs-volume-level,
.video-js .vjs-play-progress,
.video-js .vjs-slider-bar {
    background-color: #0f766e;
}

/* Make big play button visible when paused */
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
}

```

<br/><br/>

## V. SIDENOTE
In Vue.js integration, there are some issue you have to know. 

- In the component, ```video``` tag must be wrapped by a ```div``` for some reason like for responsive.
```html
    <div>
        <video ...></video>
    </div>
```

- In the script section, the function to pause is expose like this to be able to called or invoked from the parent component

```js
defineExpose({ pauseVideo });
```

This function can be invoked or called from the parent like this
```js
<template>
    <VideoPlayer ref="videoPlayer" src="videos/test.png" />
</template>

<script setup>
    import VideoPlayer from './Components/VideoPlayer.vue';

    const videoPlayer = ref(null);

    const closeTestModal = () => {
        if (videoPlayer.value) videoPlayer.value.pauseVideo();
    }
</script>
``` 

## REFERENCE
### Official Documentation
- Main Docs
<br/> https://videojs.com

- Vannilla Js Integration
<br/> https://videojs.com/getting-started

- Vue.js Integration
<br/> https://videojs.com/guides/vue

- All Guide
<br/> https://videojs.com/guides

- Video Option
<br/> https://videojs.com/guides/options/

- Plugins 
<br/> https://videojs.com/plugins







