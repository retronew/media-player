import type { Emits, Instance, Props } from './components/types'
import VueMediaPlayer from './components/VueMediaPlayer.vue'
import 'virtual:uno.css'

export {
  type Emits as MediaPlayerEmits,
  type Instance as MediaPlayerInstance,
  type Props as MediaPlayerProps,
  VueMediaPlayer,
}

export default VueMediaPlayer
