<template>
  <div>
    <label class="form-label">Content</label>
    <input type="text" class="form-control form-control-sm" :value="content" @input="updateContent" />
  </div>
</template>

<script>
export default {
  name: 'SHeader',
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