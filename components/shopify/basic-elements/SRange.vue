<template>
  <div>
    <div class="input-inline">
      <label class="form-label">ID</label>
      <input type="text" class="form-control form-control-sm" :value="id" @input="updateId" />
    </div>

    <div class="d-flex mb-3">
      <input type="text" class="form-control form-control-sm mr-1" placeholder="min" :value="min" @input="updateMin" />
      <input type="text" class="form-control form-control-sm" placeholder="max" :value="max" @input="updateMax" />
    </div>
    
    <div class="d-flex mb-3">
      <input type="number" class="form-control form-control-sm mr-1" placeholder="step" :value="step" @input="updateStep" :min="min" :max="max" />
      <input type="text" class="form-control form-control-sm" placeholder="unit" :value="unit" @input="updateUnit" />
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
  name: 'SRange',
  props: {
    id: String,
    min: Number,
    max: Number,
    step: Number,
    unit: String,
    label: String,
    def: Number
  },
  methods: {
    updateId(event) {
      this.$emit('input-id', event.target.value)
    },
    updateMin(event) {
      this.$emit('input-min', parseInt(event.target.value))
    },
    updateMax(event) {
      this.$emit('input-max', parseInt(event.target.value))
    },
    updateStep(event) {
      this.$emit('input-step',parseInt( event.target.value))
    },
    updateUnit(event) {
      this.$emit('input-unit', event.target.value)
    },
    updateLabel(event) {
      this.$emit('input-label', event.target.value)
    },
    updateDefault(event) {
      this.$emit('input-default', parseInt(event.target.value))
    }
  }
}
</script>
