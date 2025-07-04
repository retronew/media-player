<script setup lang="ts">
import type { Instance } from './components/types'
import { ref } from 'vue'
import VueMediaPlayer from './components/VueMediaPlayer.vue'

const playerRef = ref<Instance>()
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const isMuted = ref(false)
const isPlaying = ref(false)

function onPlay() {
  console.log('Video started playing')
  isPlaying.value = true
}

function onPause() {
  console.log('Video paused')
  isPlaying.value = false
}

function onTimeUpdate(time: number) {
  currentTime.value = time
}

function onDurationChange(dur: number) {
  duration.value = dur
}

function onVolumeChange(vol: number) {
  volume.value = vol
}

function onError(error: Event) {
  console.error('Video error:', error)
}

function play() {
  playerRef.value?.play()
}

function pause() {
  playerRef.value?.pause()
}

function seek(time: number) {
  playerRef.value?.seek(time)
}

function toggleMute() {
  isMuted.value = !isMuted.value
  playerRef.value?.setMuted(isMuted.value)
}

function setVolume50() {
  playerRef.value?.setVolume(0.5)
}
</script>

<template>
  <div class="mx-auto max-w-4xl p-8">
    <h1 class="mb-8 text-3xl font-bold">
      Media Player Demo
    </h1>

    <div class="mb-8">
      <VueMediaPlayer
        ref="playerRef"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
        :width="896"
        :height="504"
        :autoplay="false"
        :muted="false"
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeUpdate"
        @durationchange="onDurationChange"
        @volumechange="onVolumeChange"
        @error="onError"
      />
    </div>

    <div class="space-y-4">
      <div class="flex flex-wrap gap-4">
        <button
          class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          @click="play"
        >
          Play
        </button>
        <button
          class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          @click="pause"
        >
          Pause
        </button>
        <button
          class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          @click="seek(30)"
        >
          Seek to 30s
        </button>
        <button
          class="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          @click="toggleMute"
        >
          {{ isMuted ? 'Unmute' : 'Mute' }}
        </button>
        <button
          class="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
          @click="setVolume50"
        >
          Volume 50%
        </button>
      </div>

      <div class="rounded bg-gray-100 p-4">
        <h3 class="mb-2 font-semibold">
          Player Status:
        </h3>
        <p>Current Time: {{ currentTime.toFixed(2) }}s</p>
        <p>Duration: {{ duration.toFixed(2) }}s</p>
        <p>Volume: {{ (volume * 100).toFixed(0) }}%</p>
        <p>Muted: {{ isMuted ? 'Yes' : 'No' }}</p>
        <p>Playing: {{ isPlaying ? 'Yes' : 'No' }}</p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
