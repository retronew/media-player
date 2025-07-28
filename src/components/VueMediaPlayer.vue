<script setup lang="ts">
import type { Emits, Props } from './types'
import { MaximizeIcon, MinimizeIcon, PauseIcon, PlayIcon, Volume1Icon, Volume2Icon, VolumeIcon, VolumeXIcon } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import 'media-chrome'

const props = withDefaults(defineProps<Props>(), {
  poster: '',
  width: '100%',
  height: undefined,
  preload: 'auto',
  controls: true,
  muted: false,
  autoplay: false,
  loop: false,
  crossorigin: 'anonymous',
  playsinline: false,
  showTimeDisplay: true,
  showTimeRange: true,
  showDurationDisplay: true,
  showVolumeControls: true,
  showVolumeRange: true,
  showPlaybackRate: true,
  showFullscreenButton: true,
  containerClass: '',
  videoClass: '',
  controlsContainerClass: '',
  controlBarClass: '',
})

const emit = defineEmits<Emits>()

const mediaControllerRef = ref<HTMLElement>()
const videoRef = ref<HTMLVideoElement>()
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const playbackRate = ref(1)
const isPlaying = ref(false)
const isMuted = ref(false)
const isFullscreen = ref(false)

const muted = computed(() => props.muted || isMuted.value)

function handlePlay() {
  isPlaying.value = true
  emit('play')
}

function handlePause() {
  isPlaying.value = false
  emit('pause')
}

function handleSeek(event: CustomEvent) {
  const time = event.detail
  currentTime.value = time
  emit('seek', time)
}

function handleVolumeChange(event: CustomEvent) {
  const newVolume = event.detail
  volume.value = newVolume
  emit('volumechange', newVolume)
}

function handleMute() {
  isMuted.value = true
  emit('mute')
}

function handleUnmute() {
  isMuted.value = false
  emit('unmute')
}

function handleFullscreen() {
  isFullscreen.value = true
  emit('fullscreen')
}

function handleExitFullscreen() {
  isFullscreen.value = false
  emit('exitFullscreen')
}

function handleLoadedMetadata() {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
  }
  emit('loadedmetadata')
}

function handleTimeUpdate() {
  if (videoRef.value) {
    currentTime.value = videoRef.value.currentTime
  }
  emit('timeupdate', currentTime.value)
}

function handleDurationChange() {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
  }
  emit('durationchange', duration.value)
}

function handleVolumeUpdate() {
  if (videoRef.value) {
    volume.value = videoRef.value.volume
    isMuted.value = videoRef.value.muted
  }
  emit('volumechange', volume.value)
}

function handleVideoPlay() {
  isPlaying.value = true
  emit('play')
}

function handleVideoPause() {
  isPlaying.value = false
  emit('pause')
}

function handleEnded() {
  isPlaying.value = false
  emit('ended')
}

function handleError(event: Event) {
  emit('error', event)
}

function play() {
  videoRef.value?.play()
}

function pause() {
  videoRef.value?.pause()
}

function seek(time: number) {
  if (videoRef.value) {
    videoRef.value.currentTime = time
  }
}

function setVolume(vol: number) {
  if (videoRef.value) {
    videoRef.value.volume = Math.max(0, Math.min(1, vol))
  }
}

function setMuted(muted: boolean) {
  if (videoRef.value) {
    videoRef.value.muted = muted
  }
}

function toggleFullscreen() {
  if (mediaControllerRef.value) {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    else {
      mediaControllerRef.value.requestFullscreen()
    }
  }
}

defineExpose({
  play,
  pause,
  seek,
  setVolume,
  setMuted,
  toggleFullscreen,
  videoElement: videoRef,
  mediaController: mediaControllerRef,
})

function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
}
</script>

<template>
  <div
    :style="{
      width: isNumber(width) ? `${width}px` : width,
      height: isNumber(height) ? `${height}px` : height,
    }"
  >
    <media-controller
      ref="mediaControllerRef"
      class=":uno: group relative col-span-full row-span-full w-full flex overflow-hidden rounded-xl"
      :class="[
        containerClass,
      ]"
      role="region"
      aria-label="video player"
      :media-muted="muted"
      :media-volume="volume"
      :media-current-time="currentTime"
      :media-duration="duration"
      :media-playback-rate="playbackRate"
      @media-play-request="handlePlay"
      @media-pause-request="handlePause"
      @media-seek-request="handleSeek"
      @media-volume-request="handleVolumeChange"
      @media-mute-request="handleMute"
      @media-unmute-request="handleUnmute"
      @media-fullscreen-request="handleFullscreen"
      @media-fullscreen-exit-request="handleExitFullscreen"
    >
      <video
        slot="media"
        ref="videoRef"
        class=":uno: my-0"
        :class="videoClass"
        :src="src"
        :poster="poster"
        :preload="preload"
        :muted="muted"
        :autoplay="autoplay"
        :loop="loop"
        :crossorigin="crossorigin"
        :playsinline="playsinline"
        tabindex="-1"
        @loadedmetadata="handleLoadedMetadata"
        @timeupdate="handleTimeUpdate"
        @durationchange="handleDurationChange"
        @volumechange="handleVolumeUpdate"
        @play="handleVideoPlay"
        @pause="handleVideoPause"
        @ended="handleEnded"
        @error="handleError"
      />

      <div
        v-if="controls"
        class=":uno: absolute inset-x-0 bottom-0 px-4 pb-4 md:px-12"
        :class="[
          controlsContainerClass,
        ]"
      >
        <media-control-bar
          class=":uno: h-12 w-full overflow-hidden border border-border rounded-xl border-solid bg-background/98 px-1 shadow-[0_0.25rem_0.625rem_0rem_hsla(var(--mp-background)/.2)] md:px-2.5"
          :class="[
            controlBarClass,
          ]"
        >
          <media-play-button
            class=":uno: p-2.5 outline-none"
            :aria-label="isPlaying ? 'pause' : 'play'"
          >
            <PlayIcon
              slot="play"
              class=":uno: size-4 md:size-5"
            />
            <PauseIcon
              slot="pause"
              class=":uno: size-4 md:size-5"
            />
          </media-play-button>

          <media-time-display
            v-if="showTimeDisplay"
            class=":uno: min-w-10 px-0 tracking-tight outline-none md:min-w-12"
          />

          <media-time-range
            v-if="showTimeRange"
            class=":uno: flex-1 px-1 outline-none md:px-2.5"
          />

          <media-duration-display
            v-if="showDurationDisplay"
            class=":uno: min-w-12 px-0 tracking-tight outline-none"
          />

          <media-mute-button
            v-if="showVolumeControls"
            class=":uno: px-1 outline-none md:px-2.5"
            :aria-label="isMuted ? 'unmute' : 'mute'"
          >
            <VolumeIcon
              slot="low"
              class=":uno: size-4 md:size-5"
            />
            <Volume1Icon
              slot="medium"
              class=":uno: size-4 md:size-5"
            />
            <Volume2Icon
              slot="high"
              class=":uno: size-4 md:size-5"
            />
            <VolumeXIcon
              slot="off"
              class=":uno: size-4 md:size-5"
            />
          </media-mute-button>

          <media-volume-range
            v-if="showVolumeRange"
            class=":uno: hidden max-w-[5.375rem] pr-1.5 outline-none sm:block"
          />

          <media-playback-rate-button
            v-if="showPlaybackRate"
            class=":uno: min-w-12 select-none px-0 tracking-tight outline-none"
          />

          <media-fullscreen-button
            v-if="showFullscreenButton"
            class=":uno: p-2.5 outline-none"
            :aria-label="isFullscreen ? 'exit fullscreen mode' : 'enter fullscreen mode'"
          >
            <MaximizeIcon
              slot="enter"
              class=":uno: size-4 md:size-5"
            />
            <MinimizeIcon
              slot="exit"
              class=":uno: size-4 md:size-5"
            />
          </media-fullscreen-button>
        </media-control-bar>
      </div>
    </media-controller>
  </div>
</template>

<style scoped>
media-controller {
  --media-font-size: 13px;
  --media-font-weight: 500;
  --media-font-family: var(--mp-font-inter), sans-serif;
  --media-text-content-height: 1.375;
  --media-primary-color: var(--mp-foreground);
  --media-secondary-color: hsla(var(--mp-foreground) / 0.85);
  --media-control-background: transparent;
  --media-control-hover-background: transparent;
  --media-icon-color: transparent;
  --media-text-color: hsl(var(--mp-foreground));
  --media-range-background: hsl(var(--mp-foreground));
  --media-range-track-background: hsl(var(--mp-foreground) / 0.1);
  --media-time-range-buffered-color: hsl(var(--mp-foreground) / 0.1);
  --media-range-track-height: 0.375rem;
  --media-range-thumb-background: hsl(var(--mp-foreground));
  --media-range-track-border-radius: 3px;
  --media-range-bar-color: hsl(var(--mp-foreground));
  --media-preview-background: hsl(var(--mp-background));
  --media-range-padding-left: 0px;
  --media-range-padding-right: 0px;
  --media-button-padding: 10px;
}
</style>
