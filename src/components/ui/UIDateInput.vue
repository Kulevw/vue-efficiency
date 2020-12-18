<template>
  <div>
    <p v-if="label && !hideLabel" class="ui-input-label">
      <label :for="labelForId">
        {{ label }}
      </label>
    </p>
    <div class="ui-date-input">
      <UISelect
        :id="makeId('date')"
        class="ui-date-input__date"
        content-class="ui-date-input__date-content"
        v-model:value="date"
        v-model:query="dateQuery"
        :placeholder="datePlaceholder"
        :placeholder-query="datePlaceholder"
        :options="datesList"
        :key-of-option="valueOfOption"
        :value-of-option="valueOfOption"
        :equals="equals"
      />
      <UISelect
        :id="makeId('month')"
        class="ui-date-input__month"
        content-class="ui-date-input__month-content"
        v-model:value="month"
        v-model:query="monthQuery"
        :placeholder="monthPlaceholder"
        :placeholder-query="monthPlaceholder"
        :options="monthsList"
        :key-of-option="valueOfOption"
        :value-of-option="valueOfOption"
        :equals="equals"
      />
      <UISelect
        :id="makeId('year')"
        class="ui-date-input__year"
        content-class="ui-date-input__year-content"
        v-model:value="year"
        v-model:query="yearQuery"
        :placeholder="yearPlaceholder"
        :placeholder-query="yearPlaceholder"
        :options="yearsList"
        :key-of-option="valueOfOption"
        :value-of-option="valueOfOption"
        :equals="equals"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import _isNil from 'lodash/isNil'
import moment from 'moment'
import UISelect from '@/components/ui/UISelect'

const monthsLabels = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
]

const daysInMonth = ({ year, month }) => {
  return moment({ month, year, date: 1 }).daysInMonth()
}

const currentYear = () => {
  return new Date().getFullYear()
}

const arrayFromLength = (length, cb) => {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push(cb(i))
  }
  return result
}

const arrayFromToLength = (from, to, cb) => {
  const result = []
  if (from <= to) {
    for (let i = from; i < to; i++) {
      result.push(cb(i))
    }
  } else {
    for (let i = -from; i < -to; i++) {
      result.push(cb(-i))
    }
  }
  return result
}

export default {
  components: {
    UISelect,
  },
  props: {
    value: {
      type: Object,
      default: () => ({ date: null, month: null, year: null }),
    },
    offsetsYear: {
      type: Array,
      default: () => [3, -3],
    },
    reverseYears: {
      type: Boolean,
      default: false,
    },
    label: {
      default: '',
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const dateQuery = ref('')
    const monthQuery = ref('')
    const yearQuery = ref('')

    const labelForId = computed(() => {
      const { value } = props
      if (_isNil(value.date)) {
        return makeId('date')
      }
      if (_isNil(value.month)) {
        return makeId('month')
      }
      if (_isNil(value.year)) {
        return makeId('year')
      }
      return makeId('date')
    })
    const momentDate = value => {
      return moment({
        date: value.date || 1,
        month: value.month || 0,
        year: value.year || currentYear(),
      })
    }
    const datePlaceholder = computed(() => {
      if (!props.value.date) {
        return datesList.value[0].label
      }
      return datesList.value.find(opt => opt.key === props.value.date).label
    })
    const monthPlaceholder = computed(() => {
      if (!props.value.month) {
        return monthsList.value[0].label
      }
      return monthsList.value.find(opt => opt.key === props.value.month).label
    })
    const yearPlaceholder = computed(() => {
      if (!props.value.year) {
        return yearsList.value[0].label
      }
      return yearsList.value.find(opt => opt.key === props.value.year).label
    })

    const date = computed({
      get: () => props.value.date,
      set: date => updateValue({ date }),
    })
    const month = computed({
      get: () => props.value.month,
      set: month => updateValue({ month }),
    })
    const year = computed({
      get: () => props.value.year,
      set: year => updateValue({ year }),
    })

    const datesList = computed(() => {
      const days = daysInMonth({
        year: props.value.year || currentYear(),
        month: props.value.month || 0,
      })
      return arrayFromLength(days, i => ({ key: i + 1, label: `${i + 1}` }))
    })
    const monthsList = computed(() => {
      return monthsLabels.map((label, key) => ({ key, label }))
    })
    const yearsList = computed(() => {
      const [from, to] = props.offsetsYear
      const year = currentYear()
      return arrayFromToLength(from, to, i => ({
        key: year + i,
        label: `${year + i}`,
      }))
    })

    const updateValue = value => {
      const checkDate = { ...props.value, ...value, date: 1 }
      if (momentDate(checkDate).daysInMonth() < props.value.date) {
        return ctx.emit('update:value', checkDate)
      }
      ctx.emit('update:value', { ...props.value, ...value })
    }
    const makeId = suffix => `${props.id}-${suffix}`

    const valueOfOption = opt => opt.key
    const equals = (value, opt) => value === valueOfOption(opt)

    return {
      dateQuery,
      monthQuery,
      yearQuery,
      date,
      month,
      year,
      datesList,
      monthsList,
      yearsList,
      labelForId,
      datePlaceholder,
      monthPlaceholder,
      yearPlaceholder,
      valueOfOption,
      equals,
      makeId,
    }
  },
}
</script>
