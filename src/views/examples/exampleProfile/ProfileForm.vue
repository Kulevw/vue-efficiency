<template>
  <div class="row gx-2">
    <div class="col-xl-8 col-lg-10 col-12">
      <div class="row gx-2 mb-2">
        <div class="col-md-4 col-12 mb-md-0 mb-2">
          <UIInput v-model:value="profile.lastName" label="Фамилия" placeholder="Иванов" disabled />
        </div>
        <div class="col-md-4 col-12 mb-md-0 mb-2">
          <UIInput v-model:value="profile.firstName" label="Имя" placeholder="Иван" />
        </div>
        <div class="col-md-4 col-12 mb-md-0">
          <UIInput v-model:value="profile.middleName" label="Отчество" placeholder="Иванович" />
        </div>
      </div>
      <div class="row gx-2">
        <div class="col-md-6 col mb-2">
          <UIDateInput
            v-model:value="profile.birthDate"
            label="Дата рождения"
            :offsets-year="[-5, -90]"
          />
        </div>
        <div class="col-12"></div>
        <div class="col-auto">
          <p class="ui-input-label">
            <label :for="`profile-name-${profile.male}`">Пол</label>
          </p>
          <template v-for="m in malesList" :key="`profile-name-${m.option}`">
            <UIRadio
              v-model:value="profile.male"
              class="mb-1 mr-2"
              :id="`profile-name-${m.option}`"
              :label="m.label"
              :option="m.option"
              name="profile-male"
            />
          </template>
        </div>
      </div>
      <div class="row gx-2 mt-3">
        <div class="col-md-auto col-12">
          <UIBtn type="submit" :disabled="!hasChanged" @click="submit">
            Сохранить изменения
          </UIBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import _cloneDeep from 'lodash/cloneDeep'
import { useSync } from '@/utils/vue/compositions/useSync'
import UIInput from '@/components/ui/UIInput'
import UIRadio from '@/components/ui/UIRadio'
import UIDateInput from '@/components/ui/UIDateInput'
import UIBtn from '@/components/ui/UIBtn'

export default {
  components: {
    UIBtn,
    UIDateInput,
    UIRadio,
    UIInput,
  },
  props: {
    originalProfile: {
      required: true,
      type: Object,
    },
    hasChanged: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, ctx) {
    const malesList = [
      { option: true, label: 'Мужской' },
      { option: false, label: 'Женский' },
      { option: null, label: 'Другой' },
    ]
    const setHasChanged = useSync('hasChanged', ctx)
    const profile = ref(null)
    const originalProfileChanged = () => {
      profile.value = reactive(_cloneDeep(props.originalProfile))
      const unwatchProfile = watch(
        () => profile.value,
        () => {
          setHasChanged(true)
          unwatchProfile()
        },
        { deep: true }
      )
    }
    watch(() => props.originalProfile, originalProfileChanged, { immediate: true })
    const submit = () => ctx.emit('submit', _cloneDeep(profile.value))
    return {
      profile,
      malesList,
      submit,
    }
  },
}
</script>
