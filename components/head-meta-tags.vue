<template>
  <div />
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false
    }
  },
  head () {
    return {
      title: this.title || process.env.npm_package_name,
      meta: [
        {
          hid: 'description', //* * to override desc global */
          name: 'description',
          content: this.description || process.env.npm_package_description
        }
      ]
    }
  }
}
</script>
