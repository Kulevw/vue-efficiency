<template>
  <li v-bind="$attrs" class="ui-list-item">
    <span class="ui-list-item__label">
      <slot />
    </span>
  </li>
</template>

<script>
export default {}
</script>
