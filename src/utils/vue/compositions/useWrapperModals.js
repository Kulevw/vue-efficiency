import { ref, shallowReactive } from 'vue'

// eslint-disable-next-line no-unused-vars
const initComponent = component => {
  return {
    is: component.is,
    props: component.props || {},
    events: component.events || {},
  }
}

const initContainer = (container, options) => {
  if (container) {
    return {
      is: container.is || options.defaultContainer,
      props: container.props || {},
      events: container.events || {},
    }
  }
  return {
    is: options.defaultContainer,
    props: {},
    events: {},
  }
}

const initTransition = transition => {
  return {
    props: transition ? transition.props : {},
    events: transition ? transition.events : {},
  }
}

export const useWrapperModals = options => {
  let counter = 0
  const modals = ref([])
  const showModal = ({ component, container, transition }) => {
    const remove = () => {
      const index = modals.value.findIndex(m => m.key === modal.key)
      modals.value.splice(index, 1)
    }
    const modal = shallowReactive({
      key: counter++,
      opened: true,
      component: initComponent(component),
      container: initContainer(container, options),
      transition: initTransition(transition, options),
      remove,
    })
    modals.value.push(modal)
    return {
      hide: () => {
        modal.opened = false
      },
      remove,
    }
  }
  return {
    modals,
    showModal,
  }
}
