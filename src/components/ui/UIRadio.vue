<template>
  <div class="ui-radio">
    <input
      :id="id"
      :name="name"
      :readonly="readonly"
      :disabled="disabled"
      :autofocus="autofocus"
      :value="option"
      :checked="checked"
      class="visibility-hidden"
      type="radio"
      @change="setValue(option)"
    />
    <label class="ui-radio__box" :for="id">
      <span class="ui-radio__focus"></span>
    </label>
    <label class="ui-radio__label" :for="id">
      <slot>
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useInput, useInputProps } from '@/utils/vue/compositions/useInput'

export default {
  props: {
    ...useInputProps,
    value: {
      default: null,
    },
    option: {
      required: true,
    },
    label: {},
  },
  setup(props, ctx) {
    const input = useInput(props, ctx, { prop: 'value' })
    const checked = computed(() => props.option === props.value)
    return {
      checked,
      ...input,
    }
  },
}
</script>
