<template>
  <div data-app>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="buttonLabel" v-bind="{...computedProps, ...attrs}" v-on="on">
            {{ buttonLabel }}
          </v-btn>
          <slot v-else name="modalButton" :on="on" />
        </template>
        <slot :close="close" />
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  Name: 'app-modal',
  props: {
    modalVisibility: {
      type: Boolean,
      required: false
    },
    buttonLabel: {
      type: String,
      required: false,
      default: ''
    },
    buttonColor: {
      type: String,
      default: 'primary'
    },
    buttonTextStyle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    computedProps () {
      const returnValue = {
        text: this.buttonTextStyle,
        color: this.buttonColor
      }
      return returnValue
    }
  },
  methods: {
    close () {
      this.dialog = false
    }
  }
}
</script>
