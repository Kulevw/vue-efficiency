<template>
  <component
    v-for="modal in modals"
    :key="modal.key"
    :is="modal.container.is"
    v-model:opened="modal.opened"
    v-bind="modal.container.props"
    v-on="modal.container.events"
  >
    <Transition
      appear
      name="t-modal-popup"
      v-bind="modal.transition.props"
      @after-leave="modal.remove"
      v-on="modal.transition.events"
    >
      <component
        v-show="modal.opened"
        :is="modal.component.is"
        v-bind="modal.component.props"
        v-on="modal.component.events"
      />
    </Transition>
  </component>
</template>

<script>
export default {
  props: {
    modals: {
      required: true,
      type: Array,
    },
  },
}
</script>
