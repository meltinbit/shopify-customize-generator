<template>
  <div>
    <label class="form-label">Content</label>
    <textarea type="text" class="form-control form-control-sm" :value="content" @input="updateContent"></textarea>
  </div>
</template>

<script>
export default {
  name: 'SParagraph',
  props: {
    content: String
  },
  methods: {
    updateContent(event) {
      this.$emit('input-content', event.target.value)
    }
  }
}
</script>