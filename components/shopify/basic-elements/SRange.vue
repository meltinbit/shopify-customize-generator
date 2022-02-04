<template>
  <div>
    <label class="form-label">ID</label>
    <input type="text" class="form-control form-control-sm mb-3" :value="id" @input="updateId" />

    <div class="d-flex mb-3">
      <input type="text" class="form-control form-control-sm mr-1" placeholder="min" :value="min" @input="updateMin" />
      <input type="text" class="form-control form-control-sm" placeholder="max" :value="max" @input="updateMax" />
    </div>
    
    <div class="d-flex mb-3">
      <input type="number" class="form-control form-control-sm mr-1" placeholder="step" :value="step" @input="updateStep" :min="min" :max="max" />
      <input type="text" class="form-control form-control-sm" placeholder="unit" :value="unit" @input="updateUnit" />
    </div>

    <label class="form-label">Label</label>
    <input type="text" class="form-control form-control-sm" :value="label" @input="updateLabel" />

    <label class="form-label">Default</label>
    <input type="text" class="form-control form-control-sm" :value="def" @input="updateDefault"   />
  </div>
</template>

<script>
export default {
  name: 'SRange',
  props: {
    id: String,
    min: String,
    max: String,
    step: String,
    unit: String,
    label: String,
    def: String
  },
  methods: {
    updateId(event) {
      this.$emit('input-id', event.target.value)
    },
    updateMin(event) {
      this.$emit('input-min', event.target.value)
    },
    updateMax(event) {
      this.$emit('input-max', event.target.value)
    },
    updateStep(event) {
      this.$emit('input-step', event.target.value)
    },
    updateUnit(event) {
      this.$emit('input-unit', event.target.value)
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
