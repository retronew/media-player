# Vue3 Media Player

一个基于 Vue3 + TypeScript 的现代化视频播放器组件，使用 media-chrome 作为核心功能，UnoCSS + Wind3 preset 实现样式。

## 特性

- ✅ 基于 Vue3 + TypeScript 开发
- ✅ 使用 media-chrome 提供专业级媒体控制
- ✅ UnoCSS + Wind3 preset 样式方案
- ✅ 完全响应式设计
- ✅ 可自定义样式和控件
- ✅ 完整的 TypeScript 类型支持
- ✅ 支持所有现代浏览器

## 安装

```bash
npm install vue3-media-player
# 或
yarn add vue3-media-player
# 或
pnpm add vue3-media-player
```

## 使用

### 基本用法

```vue
<script setup lang="ts">
import { VueMediaPlayer } from 'vue3-media-player'

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

### 全局注册

```ts
import { createApp } from 'vue'
import { install as VueMediaPlayerInstall } from 'vue3-media-player'
import App from './App.vue'

const app = createApp(App)
app.use(VueMediaPlayerInstall)
app.mount('#app')
```

### 使用组件实例方法

```vue
<script setup lang="ts">
import type { MediaPlayerInstance } from 'vue3-media-player'
import { ref } from 'vue'
import { VueMediaPlayer } from 'vue3-media-player'

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
      播放
    </button>
    <button @click="pause">
      暂停
    </button>
    <button @click="seek(30)">
      跳转到30秒
    </button>
  </div>
</template>
```

## Props

| 属性                     | 类型                               | 默认值        | 描述                 |
| ------------------------ | ---------------------------------- | ------------- | -------------------- |
| `src`                    | `string`                           | -             | 视频源地址（必需）   |
| `poster`                 | `string`                           | `''`          | 封面图片地址         |
| `width`                  | `number \| string`                 | `704`         | 视频宽度             |
| `height`                 | `number \| string`                 | `528`         | 视频高度             |
| `preload`                | `'auto' \| 'metadata' \| 'none'`   | `'auto'`      | 预加载策略           |
| `muted`                  | `boolean`                          | `false`       | 是否静音             |
| `autoplay`               | `boolean`                          | `false`       | 是否自动播放         |
| `loop`                   | `boolean`                          | `false`       | 是否循环播放         |
| `crossorigin`            | `'anonymous' \| 'use-credentials'` | `'anonymous'` | 跨域设置             |
| `playsinline`            | `boolean`                          | `false`       | 是否内联播放         |
| `showControls`           | `boolean`                          | `true`        | 是否显示控制栏       |
| `showTimeDisplay`        | `boolean`                          | `true`        | 是否显示当前时间     |
| `showTimeRange`          | `boolean`                          | `true`        | 是否显示进度条       |
| `showDurationDisplay`    | `boolean`                          | `true`        | 是否显示总时长       |
| `showVolumeControls`     | `boolean`                          | `true`        | 是否显示音量控制     |
| `showVolumeRange`        | `boolean`                          | `true`        | 是否显示音量滑块     |
| `showFullscreenButton`   | `boolean`                          | `true`        | 是否显示全屏按钮     |
| `containerClass`         | `string`                           | `''`          | 容器额外样式类       |
| `videoClass`             | `string`                           | `''`          | 视频元素额外样式类   |
| `controlsContainerClass` | `string`                           | `''`          | 控制栏容器额外样式类 |
| `controlBarClass`        | `string`                           | `''`          | 控制栏额外样式类     |

## 事件

| 事件名           | 参数               | 描述                 |
| ---------------- | ------------------ | -------------------- |
| `play`           | -                  | 开始播放时触发       |
| `pause`          | -                  | 暂停播放时触发       |
| `ended`          | -                  | 播放结束时触发       |
| `timeupdate`     | `time: number`     | 播放时间更新时触发   |
| `durationchange` | `duration: number` | 视频时长变化时触发   |
| `volumechange`   | `volume: number`   | 音量变化时触发       |
| `error`          | `error: Event`     | 播放出错时触发       |
| `loadedmetadata` | -                  | 元数据加载完成时触发 |
| `seek`           | `time: number`     | 跳转播放位置时触发   |
| `mute`           | -                  | 静音时触发           |
| `unmute`         | -                  | 取消静音时触发       |
| `fullscreen`     | -                  | 进入全屏时触发       |
| `exitFullscreen` | -                  | 退出全屏时触发       |

## 实例方法

| 方法名                      | 参数                    | 描述           |
| --------------------------- | ----------------------- | -------------- |
| `play()`                    | -                       | 开始播放       |
| `pause()`                   | -                       | 暂停播放       |
| `seek(time: number)`        | `time`: 目标时间（秒）  | 跳转到指定时间 |
| `setVolume(volume: number)` | `volume`: 音量值（0-1） | 设置音量       |
| `setMuted(muted: boolean)`  | `muted`: 是否静音       | 设置静音状态   |
| `toggleFullscreen()`        | -                       | 切换全屏状态   |

## 样式自定义

### 自定义样式类

```vue
<VueMediaPlayer
  src="video.mp4"
  container-class="custom-container"
  video-class="custom-video"
  control-bar-class="custom-controls"
/>
```

## 开发

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建库
npm run build:lib

# 构建演示
npm run build
```

## 技术栈

- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- [media-chrome](https://github.com/muxinc/media-chrome) - 媒体控制组件
- [UnoCSS](https://unocss.dev/) - 原子化 CSS 引擎
- [Vite](https://vitejs.dev/) - 快速构建工具

## 许可证

MIT License
