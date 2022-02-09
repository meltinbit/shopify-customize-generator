<template>
  <div>
    <label class="form-label">ID</label>
    <input type="text" class="form-control form-control-sm" :value="id" @input="updateId" />

    <label class="form-label">Label</label>
    <input type="text" class="form-control form-control-sm" :value="label" @input="updateLabel" />

    <label class="form-label">Options</label>
    <div v-for="(option, index) in options" :key="index" class="d-flex mb-3">
      <input type="text" placeholder="value" class="form-control form-control-sm mr-1" :value="option.value"> 
      <input type="text" placeholder="label" class="form-control form-control-sm" :value="option.label">
      <button @click="delOption(index)" class="btn btn-secondary btn-sm">del</button>
    </div>
    <div class="d-flex mb-3">
      <input type="text" placeholder="value" class="form-control form-control-sm mr-1" v-model="newOption.value"> 
      <input type="text" placeholder="label" class="form-control form-control-sm" v-model="newOption.label">
      <button @click="addOption()" :disabled="!newOption.value || !newOption.label" class="btn btn-secondary btn-sm">add</button>
    </div>

    <label class="form-label">Default</label>
    <select class="form-control" :value="def" @change="updateDefault">
      <option v-for="(option, index) in options" :key="index" :value="option.value">{{option.label}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SSelect',
  data() {
    return {
      newOption: {
        value: '',
        label: ''
      }
    }
  },
  props: {
    id: String,
    label: String,
    def: String,
    options: Array
  },
  methods: {
    updateId(event) {
      this.$emit('input-id', event.target.value)
    },
    updateLabel(event) {
      this.$emit('input-label', event.target.value)
    },
    updateDefault(event) {
      console.log(event.target.value)
      this.$emit('input-default', event.target.value)
    },
    addOption() {
      if(this.newOption.value != '' && this.newOption.label != '') {
        this.$emit('input-options', {
          value: this.newOption.value,
          label: this.newOption.label
        })
        this.newOption.value = ''
        this.newOption.label = ''
      }
    },
    delOption(index) {
      this.options.splice(index, 1)
    }
  }
}
</script>
