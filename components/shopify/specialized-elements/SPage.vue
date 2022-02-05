<template>
  <div>
    <label class="form-label">ID</label>
    <input type="text" class="form-control form-control-sm" :value="id" @input="updateId" />

    <label class="form-label">Label</label>
    <input type="text" class="form-control form-control-sm" :value="label" @input="updateLabel" />
  </div>
</template>

<script>
export default {
  name: 'SPage',
  props: {
    id: String,
    label: String
  },
  methods: {
    updateId(event) {
      this.$emit('input-id', event.target.value)
    },
    updateLabel(event) {
      this.$emit('input-label', event.target.value)
    }
  }
}
</script>