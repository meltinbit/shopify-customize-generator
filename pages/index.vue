<template>
  <div class="container p-5">
    <div class="row">
      <div class="col">
        <div class="card border-primary">
          <div class="card-header d-flex justify-content-between">
            Section
            <div>
              <b-dropdown text="Add Setting" size="sm">
                <b-dropdown-item v-for="(element, index) in basicElements" :key="index" @click="addElementToSection(index)">{{ element.type }}</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
            <div class="card-body">
              <div class="mb-3">
                <label>Name</label>
                <input type="text" class="form-control form-control-sm" v-model="section.name">
              </div>
              <div class="mb-3">
                <label>Tag</label>
                <input type="text" class="form-control form-control-sm" v-model="section.tag">
              </div>
              <div class="mb-3">
                <label>Class</label>
                <input type="text" class="form-control form-control-sm" v-model="section.class">
              </div>
              <div class="mb-3">
                <label>Limit</label>
                <input type="number" min="1" max="20" step="1" class="form-control form-control-sm" v-model="section.limit">
              </div>
              
              <div v-if="section.settings.length" class="card border-primary mb-4">
                <div class="card-header">Settings</div>
                <div class="card-body">
                  <div v-for="(sectionSetting, idx) in section.settings" :key="idx">
                    <div class="card-group">
                      <div class="card card">
                        <div class="card-header">
                          <a href="#" class="" aria-label="Close" @click="removeElement(idx)">remove</a>
                        </div>
                        <div class="card-body">
                          <p @click="setSelectedElement(idx)">{{sectionSetting.type}}</p>
                        </div>
                      </div>

                      <div v-if="idx == selectedElement" class="card">
                        <div class="card-body">
                          <SText v-if="sectionSetting.type == 'text'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <SCTextarea v-if="sectionSetting.type == 'textarea'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <SCheckbox v-if="sectionSetting.type == 'checkbox'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <SNumber v-if="sectionSetting.type == 'number'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <SRadio v-if="sectionSetting.type == 'radio'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                            :options="sectionSetting.options"
                            @input-options="pushRadioOptions(idx, $event)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card border-secondary">
                <div class="card-header d-flex justify-content-between">
                  Blocks
                  <button class="btn btn-secondary btn-sm" @click="addBlock()">Add Block</button>
                </div>
                <div class="card-body">
                  <div v-if="section.blocks.length" class="mb-3">
                    <label>Max Blocks</label>
                     <input type="text" class="form-control form-control-sm" v-model="section.max_blocks" />
                  </div>
                 
                  <div v-for="(block, idx) in section.blocks" :key="idx">
                    <div class="card border-secondary mb-4">
                      <div class="card-header d-flex justify-content-between">
                        Block {{idx}}
                        <b-dropdown text="Add Setting" size="sm">
                          <b-dropdown-item v-for="(element, index) in basicElements" :key="index" @click="addSettingToBlock(idx, index)">{{ element.type }}</b-dropdown-item>
                        </b-dropdown>
                      </div>
                      <div class="card-body">
                        <div class="mb-3">
                          <label>Name</label>
                          <input type="text" class="form-control form-control-sm" v-model="block.name">
                        </div>
                        <div class="mb-3">
                          <label>Type</label> 
                          <input type="text" class="form-control form-control-sm" v-model="block.type">
                        </div>

                        <div v-if="block.settings.length" class="card border-secondary">
                          <div class="card-header">
                            Settings
                          </div>
                          <div class="card-body">
                            <div v-for="(blockSetting, index) in block.settings" :key="index">
                              <div class="card-group mb-2">
                                <div class="card card">
                                  <div class="card-header">
                                    <a href="#" class="" aria-label="Close" @click="removeElementInBlock(idx, index)">remove</a>
                                  </div>
                                  <div class="card-body">
                                    <p @click="setSelectedElementInBlock(index)">{{blockSetting.type}}</p>
                                  </div>
                                </div>

                                <div v-if="index == selectedElementInBlock" class="card">
                                  <div class="card-body">
                                    <label class="form-label">ID</label>
                                    <input type="text" class="form-control form-control-sm" v-model="blockSetting.id" />

                                    <label class="form-label">Label</label>
                                    <input type="text" class="form-control form-control-sm" v-model="blockSetting.label" />

                                    <label class="form-label">Default</label>
                                    <input type="text" class="form-control form-control-sm" v-model="blockSetting.default" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card text-white bg-success">
          <div class="card-header">
            Output Schema
          </div>
          <div class="card-body">
            <pre><code v-if="section" class="text-white">{{ section }}</code></pre>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basicElements: [
        {
          type: 'checkbox',
          id: '',
          label: '',
          default: ''
        },
        {
          type: 'number',
          id: '',
          label: '',
          default: ''
        },
        {
          type: 'radio',
          id: '',
          label: '',
          options: [],
          default: ''
        },
        {
          type: 'range'
        },
        {
          type: 'select'
        },
        {
          type: 'text',
          id: '',
          label: '',
          default: ''
        },
        {
          type: 'textarea',
          id: '',
          label: '',
          default: ''
        }
      ],
      section: {
        name: '',
        tag: 'div',
        class: '',
        limit: 10,
        settings: [],
        max_blocks: 16,
        blocks: [],
        templates: []
      },
      block: {
        name: '',
        type: '',
        settings: []
      },
      selectedElement: 0,
      selectedElementInBlock: 0
    }
  },
  methods: {
    addElementToSection(idx) {
      this.section.settings.push(JSON.parse(JSON.stringify(this.basicElements[idx])))
      this.selectedElement = this.section.settings.length - 1
    },
    setSelectedElement(idx) {
      this.selectedElement = idx
    },
    removeElement(idx) {
      this.section.settings.splice(idx, 1);
    },
    addBlock() {
      this.section.blocks.push(JSON.parse(JSON.stringify(this.block)))
    },
    setSelectedElementInBlock(idx) {
      this.selectedElementInBlock = idx
    },
    addSettingToBlock(idx, index) {
      console.log(idx, index)
      this.section.blocks[idx].settings.push(JSON.parse(JSON.stringify(this.basicElements[index])))
      this.selectedElementInBlock = this.section.blocks[idx].settings.length - 1
    },
    removeElementInBlock(idx, index) {
      this.section.blocks[idx].settings.splice(index, 1);
    },
    pushRadioOptions(idx, event) {
      this.section.settings[idx].options.push(event);
    }
  }
 
}
</script>