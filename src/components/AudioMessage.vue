<template>
  <div class="audio-message">
    <label class="audio-message__button">
      <input class="visibility-hidden" type="checkbox" v-model="play" />
      <span class="audio-message__button-state"></span>
      <span class="audio-message__button-focus"></span>
    </label>
    <audio
      ref="refAudio"
      :src="audio"
      @timeupdate="progress"
      @loadeddata="loadedData"
      @pause="play = false"
    />
    <label class="audio-message__progress">
      <input
        :value="currentTime"
        type="range"
        :step="1"
        :min="0"
        :max="duration"
        @input="rangeUpdateTime"
      />
      <span class="audio-message__progress-focus"></span>
    </label>
    <div class="audio-message__right-panel">
      <div class="audio-message__time">{{ formatTime }}</div>
      <label class="audio-message__speed" @click.prevent="nextSpeed">
        <input
          v-for="s in speeds"
          :key="`speed-value-${s.value}`"
          v-model="currentSpeed"
          :value="s"
          class="visibility-hidden"
          type="radio"
          name="audioMessageSpeed"
        />
        <span>{{ currentSpeed.value }}x</span>
        <span class="audio-message__speed-focus"></span>
      </label>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import formatDuration from 'format-duration'

export default {
  setup() {
    const speeds = ref([
      {
        value: 1,
        next: 1,
      },
      {
        value: 1.5,
        next: 2,
      },
      {
        value: 2,
        next: 0,
      },
    ])
    const play = ref(false)
    const currentSpeed = ref(speeds.value[0])
    const refAudio = ref(null)
    const currentTime = ref(0)
    const duration = ref(0)
    const nextSpeed = () => {
      currentSpeed.value = speeds.value[currentSpeed.value.next]
    }
    const loadedData = e => {
      duration.value = e.target.duration
      currentTime.value = e.target.currentTime
    }
    const progress = e => {
      currentTime.value = e.target.currentTime
    }
    const rangeUpdateTime = e => {
      refAudio.value.currentTime = e.target.value
    }
    const intTime = computed(() => parseInt(currentTime.value))
    const formatTime = computed(() => formatDuration(intTime.value * 1000))
    watch(
      () => currentSpeed.value,
      speed => {
        refAudio.value.playbackRate = speed.value
      }
    )
    watch(
      () => play.value,
      play => {
        play ? refAudio.value.play() : refAudio.value.pause()
      }
    )
    return {
      audio: require('@/assets/audio/example.mp3'),
      play,
      refAudio,
      speeds,
      duration,
      currentTime,
      currentSpeed,
      intTime,
      formatTime,
      nextSpeed,
      rangeUpdateTime,
      progress,
      loadedData,
    }
  },
}
</script>
