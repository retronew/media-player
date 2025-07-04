# Vue3 Media Player

A modern video player component based on Vue3 + TypeScript, using media-chrome for core functionality and UnoCSS + Wind3 preset for styling.

## Features

- 💻 Developed with Vue3 + TypeScript
- 🎛️ Uses media-chrome for professional-grade media controls
- 🎨 Styled with UnoCSS + Wind3 preset
- 📱💻 Fully responsive design
- ⚙️ Customizable styles and controls
- 🛡️ Complete TypeScript type support
- 🌐 Supports all modern browsers

## Installation

```bash
npm install @retronew/media-player
# or
yarn add @retronew/media-player
# or
pnpm add @retronew/media-player
```

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import { VueMediaPlayer } from '@retronew/media-player'

function onPlay() {
  console.log('Video started playing')
}

function onPause() {
  console.log('Video paused')
}
</script>

<template>
  <VueMediaPlayer
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
    :width="800"
    :height="450"
    @play="onPlay"
    @pause="onPause"
  />
</template>
```

### Using Component Instance Methods

```vue
<script setup lang="ts">
import type { MediaPlayerInstance } from '@retronew/media-player'
import { VueMediaPlayer } from '@retronew/media-player'
import { ref } from 'vue'

const playerRef = ref<MediaPlayerInstance>()

function play() {
  playerRef.value?.play()
}

function pause() {
  playerRef.value?.pause()
}

function seek(time: number) {
  playerRef.value?.seek(time)
}
</script>

<template>
  <div>
    <VueMediaPlayer
      ref="playerRef"
      src="https://example.com/video.mp4"
    />
    <button @click="play">
      Play
    </button>
    <button @click="pause">
      Pause
    </button>
    <button @click="seek(30)">
      Seek to 30s
    </button>
  </div>
</template>
```

## Props

| Attribute                | Type                               | Default Value | Description                            |
| :----------------------- | :--------------------------------- | :------------ | :------------------------------------- |
| `src`                    | `string`                           | -             | Video source URL (required)            |
| `poster`                 | `string`                           | `''`          | Poster image URL                       |
| `width`                  | `number \| string`                 | `704`         | Video width                            |
| `height`                 | `number \| string`                 | `528`         | Video height                           |
| `preload`                | `'auto' \| 'metadata' \| 'none'`   | `'auto'`      | Preload strategy                       |
| `muted`                  | `boolean`                          | `false`       | Whether the video is muted             |
| `autoplay`               | `boolean`                          | `false`       | Whether to autoplay the video          |
| `loop`                   | `boolean`                          | `false`       | Whether to loop the video              |
| `crossorigin`            | `'anonymous' \| 'use-credentials'` | `'anonymous'` | Cross-origin setting                   |
| `playsinline`            | `boolean`                          | `false`       | Whether to play inline                 |
| `showControls`           | `boolean`                          | `true`        | Whether to show the control bar        |
| `showTimeDisplay`        | `boolean`                          | `true`        | Whether to show the current time       |
| `showTimeRange`          | `boolean`                          | `true`        | Whether to show the progress bar       |
| `showDurationDisplay`    | `boolean`                          | `true`        | Whether to show the total duration     |
| `showVolumeControls`     | `boolean`                          | `true`        | Whether to show volume controls        |
| `showVolumeRange`        | `boolean`                          | `true`        | Whether to show the volume slider      |
| `showFullscreenButton`   | `boolean`                          | `true`        | Whether to show the fullscreen button  |
| `containerClass`         | `string`                           | `''`          | Extra class for the container          |
| `videoClass`             | `string`                           | `''`          | Extra class for the video element      |
| `controlsContainerClass` | `string`                           | `''`          | Extra class for the controls container |
| `controlBarClass`        | `string`                           | `''`          | Extra class for the control bar        |

## Events

| Event Name       | Parameters         | Description                           |
| :--------------- | :----------------- | :------------------------------------ |
| `play`           | -                  | Fired when playback begins            |
| `pause`          | -                  | Fired when playback is paused         |
| `ended`          | -                  | Fired when playback ends              |
| `timeupdate`     | `time: number`     | Fired when the playback time updates  |
| `durationchange` | `duration: number` | Fired when the video duration changes |
| `volumechange`   | `volume: number`   | Fired when the volume changes         |
| `error`          | `error: Event`     | Fired when a playback error occurs    |
| `loadedmetadata` | -                  | Fired when metadata has been loaded   |
| `seek`           | `time: number`     | Fired when a seek operation completes |
| `mute`           | -                  | Fired when the video is muted         |
| `unmute`         | -                  | Fired when the video is unmuted       |
| `fullscreen`     | -                  | Fired when entering fullscreen mode   |
| `exitFullscreen` | -                  | Fired when exiting fullscreen mode    |

## Instance Methods

| Method Name                 | Parameters              | Description                  |
| :-------------------------- | :---------------------- | :--------------------------- |
| `play()`                    | -                       | Starts playback              |
| `pause()`                   | -                       | Pauses playback              |
| `seek(time: number)`        | `time`: target time (s) | Seeks to a specific time     |
| `setVolume(volume: number)` | `volume`: value (0-1)   | Sets the volume              |
| `setMuted(muted: boolean)`  | `muted`: is muted       | Sets the muted state         |
| `toggleFullscreen()`        | -                       | Toggles the fullscreen state |

## Style Customization

### Custom CSS Classes

```vue
<VueMediaPlayer
  src="video.mp4"
  container-class="custom-container"
  video-class="custom-video"
  control-bar-class="custom-controls"
/>
```

## Development

```bash
# Clone the project
git clone <repository-url>

# Install dependencies
npm install

# Start the development server
npm run dev

# Build the library
npm run build:lib

# Build the demo
npm run build
```

## Tech Stack

- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [media-chrome](https://github.com/muxinc/media-chrome) - Media controls components
- [UnoCSS](https://unocss.dev/) - The instant atomic CSS engine
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

## License

MIT License
