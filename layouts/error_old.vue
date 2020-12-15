<template>
  <h1 class="text-center">
    {{ error.message }}
  </h1>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
      required: false
    }
  }
}
</script>
