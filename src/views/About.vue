<template>
  <Page>
    <div class="container">
      <RouterLink :to="{ name: 'Home' }">
        Go to home
      </RouterLink>
    </div>
  </Page>
</template>
<script>
import Page from '@/components/common/Page'

export default {
  components: { Page },
}
</script>
