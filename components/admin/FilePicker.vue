<template>
  <b-field class="file">
    <b-upload v-model="file" :accept="accept" :multiple="multiple" @input="upload">
      <a class="button is-primary">
        <b-icon icon="upload" custom-size="default" />
        <span>{{ buttonLabel }}</span>
      </a>
    </b-upload>
    <span v-if="file" class="file-name">{{ file.name }}</span>
  </b-field>
</template>

<script>
export default {
  name: 'FilePicker',
  props: {
    accept: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      file: null,
      uploadPercent: 0
    }
  },
  computed: {
    buttonLabel () {
      return !this.file ? this.$t('admin.pick_file') : this.$t('admin.pick_another_file')
    }
  },
  methods: {
    upload (file) {
      this.$EventBus.$emit('handle-uploader', file)
      // Use this as an example for handling file uploads
      // const formData = new FormData()
      // formData.append('image', file)
      // formData.append('path', 'admin/avatar')

      // this.$axios
      //   .$post('/admin/uploader', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     },
      //     onUploadProgress: this.progressEvent
      //   })
      //   .then((res) => {
      //     this.file = { file: res.response }
      //     this.$emit('uploadedFile', { file: res.response })
      //     console.log('fireEvent', { file: res.response })
      //   })
      //   .catch((err) => {
      //     this.$buefy.snackbar.open({
      //       message: `Error: ${err.response.data.error}`,
      //       type: 'is-danger'
      //     })
      //   })
    },
    progressEvent (progressEvent) {
      this.uploadPercent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
    }
  }
}
</script>
