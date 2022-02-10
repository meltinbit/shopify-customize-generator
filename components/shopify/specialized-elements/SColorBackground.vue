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

    <div class="input-inline">
      <label class="form-label">Default</label>
      <input type="text" class="form-control form-control-sm" :value="def" @input="updateDefault"   />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SColorBackground',
  props: {
    id: String,
    label: String,
    def: String
  },
  methods: {
    updateId(event) {
      this.$emit('input-id', event.target.value)
    },
    updateLabel(event) {
      this.$emit('input-label', event.target.value)
    },
    updateDefault(event) {
      this.$emit('input-default', event.target.value)
    }
  }
}
</script>
