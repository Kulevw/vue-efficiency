<template>
  <div>
    <p class="ui-input-label">
      <label v-if="label && !hideLabel" :for="id">{{ label }}</label>
    </p>
    <label v-bind="$attrs" class="ui-input" :class="inputClass" @mousedown.prevent="focus">
      <span class="ui-input__inner">
        <input
          :id="id"
          ref="refInput"
          class="ui-input__input"
          type="text"
          :placeholder="placeholder"
          :value="value"
          :disabled="disabled"
          @input="e => setValue(e.target.value)"
          @mousedown.stop
        />
        <span class="ui-input__focus"></span>
      </span>
    </label>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRefFocusManagement } from '@/utils/vue/compositions/useRefFocusManagement'
import { useInputProps } from '@/utils/vue/compositions/useInput'

export default {
  props: {
    ...useInputProps,
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      default: '',
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    value: {
      default: '',
    },
  },
  setup(props, ctx) {
    const { ref: refInput, focus, blur } = useRefFocusManagement()
    const setValue = v => ctx.emit('update:value', v)
    const inputClass = computed(() => {
      return {
        'ui-input--disabled': props.disabled,
      }
    })
    return {
      refInput,
      inputClass,
      focus,
      blur,
      setValue,
    }
  },
}
</script>
