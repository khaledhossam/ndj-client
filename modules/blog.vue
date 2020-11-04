<template>
  <div>
    <h1>welcome blog wrapper</h1>
    <nuxt-child />
  </div>
</template>
<script>
export default {
  // layout: 'custom-layout'
  layout (context) {
    return 'custom-layout'
  }
}
</script>
