<template>
  <client-only>
    <div>
      <v-btn @click="$emit('endEdit')">Speichern!</v-btn>
      <editor v-bind="$attrs" v-on="$listeners" ref="editor" @change="change" />
    </div>
  </client-only>
</template>
<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

const editor = process.server ?  {
      render() {return null}
    }: require('@toast-ui/vue-editor').Editor

export default {
  components: {
    editor
  },
  props: {
    value: String,
    // isEditing: Boolean
  },
  data() {
    return {
      file: ""
    };
  },
  watch: {
    value() {
      if(this.value != this.file) {
        this.$refs.editor.invoke('setMarkdown', this.value)
        this.file = this.value;
      }
    }
  },
  methods: {
    change() {
      this.file = this.$refs.editor.invoke('getMarkdown')
      this.$emit('input', this.file)
    }
  }
};
</script>
