export interface Props {
  src: string
  poster?: string
  width?: number | string
  height?: number | string
  preload?: 'auto' | 'metadata' | 'none'
  controls?: boolean
  muted?: boolean
  autoplay?: boolean
  loop?: boolean
  crossorigin?: 'anonymous' | 'use-credentials'
  playsinline?: boolean
  showTimeDisplay?: boolean
  showTimeRange?: boolean
  showDurationDisplay?: boolean
  showVolumeControls?: boolean
  showVolumeRange?: boolean
  showPlaybackRate?: boolean
  showFullscreenButton?: boolean
  containerClass?: string
  videoClass?: string
  controlsContainerClass?: string
  controlBarClass?: string
}

export interface Emits {
  play: []
  pause: []
  ended: []
  timeupdate: [time: number]
  durationchange: [duration: number]
  volumechange: [volume: number]
  error: [error: Event]
  loadedmetadata: []
  seek: [time: number]
  mute: []
  unmute: []
  fullscreen: []
  exitFullscreen: []
}

export interface Instance {
  play: () => void
  pause: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  setMuted: (muted: boolean) => void
  toggleFullscreen: () => void
  videoElement: HTMLVideoElement
  mediaController: HTMLElement
}
