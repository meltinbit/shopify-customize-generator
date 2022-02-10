<template>
  <div>
    <div class="input-inline">
      <label class="form-label">ID</label>
      <input type="text" class="form-control form-control-sm" :value="id" @input="updateId" />
    </div>

    <div class="input-inline">
      <label class="form-label">Label</label>
      <input type="text" class="form-control form-control-sm" :value="label" @input="updateLabel" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SUrl',
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