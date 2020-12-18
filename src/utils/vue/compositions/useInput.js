import { useUid } from '@/utils/vue/compositions/useUid'
import { useSync } from '@/utils/vue/compositions/useSync'

export const useInputProps = {
  id: {
    type: String,
    default: () => `component-${useUid()}`,
  },
  name: {
    type: String,
    default: '',
  },
  valid: {
    type: [Boolean, Function],
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
}

export const useInput = (props, ctx, options) => {
  const setValue = useSync(options.prop, ctx)
  return {
    setValue,
  }
}
