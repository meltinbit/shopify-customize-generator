<template>
 <div class="container-fluid p-3">
  <div class="row">
    <div class="col-md-2">
      <draggable
        class="dragArea list-group-flush"
        :list="allElements"
        :group="{ name: 'sectionSettings', pull: 'clone', put: false }"
        @change="log"
        :clone="handleClone"
      >
        <div
          class="list-group-item customize-element"
          v-for="(element, index) in allElements"
          :key="index"
        >
          <b-icon-grip-vertical></b-icon-grip-vertical>
          {{ element.type }}
        </div>
      </draggable>
    </div>

    <div class="col-md-5">
      <div class="card card-elements">
        <div class="card-header"><strong><b-icon-grid1x2-fill></b-icon-grid1x2-fill>&nbsp;Section</strong></div>
        <div class="card-body">
          <!--SECTION -->
          <b-input-group size="sm" prepend="Name" class="mb-3"> 
            <b-form-input v-model="section.name"></b-form-input>
          </b-input-group>

          <b-input-group size="sm" prepend="Tag" class="mb-3">
            <b-form-input v-model="section.tag"></b-form-input>
          </b-input-group>

          <b-input-group size="sm" prepend="Class" class="mb-3">
            <b-form-input v-model="section.class"></b-form-input>
          </b-input-group>

          <b-input-group size="sm" prepend="Limit" class="mb-3">
            <b-form-input v-model="section.limit" type="number" min="1" max=20></b-form-input>
          </b-input-group>

          <!-- SECTION SETTINGS -->
          <div class="card card-elements mb-3">
            <div class="card-header"><b-icon-gear-fill></b-icon-gear-fill>&nbsp;<strong>Settings ({{section.settings.length}})</strong></div>
            <div class="card-body">
              <draggable
                class="dragArea list-group"
                :list="section.settings"
                group="sectionSettings"
                @change="log"
              >
                <div
                  class="list-group-item d-flex justify-content-between align-items-start"
                  v-for="(element, indexSetting) in section.settings"
                  :key="indexSetting"
                >
                  <span>
                    <b-icon-grip-vertical></b-icon-grip-vertical>
                    {{ element.type }}
                  </span>
                  <a href="#" @click="removeSetting(indexSetting)"><b-icon-x font-scale="1.2"></b-icon-x></a>
                </div>
              </draggable>
            </div>
          </div>
          
          <!-- SECTION BLOCKS -->
          <div class="card card-elements">
            <div class="card-header d-flex justify-content-between align-items-start">
              <span><b-icon-grid></b-icon-grid>&nbsp;<strong>Blocks ({{section.blocks.length}})</strong></span>
              <a href="#" @click="addBlock()" class=""><b-icon-plus font-scale="1.5"></b-icon-plus></a>
            </div>
            <div class="card-body">
              <draggable
                :list="section.blocks"
                class="list-group"
                ghost-class="ghost"
                @start="dragging = true"
                @end="dragging = false"
              >
                <div
                  class=""
                  v-for="(block, indexBlock) in section.blocks"
                  :key="indexBlock"
                >

                <div class="card card-elements mb-3">
                  <div class="card-header d-flex justify-content-between align-items-start">
                    <span><b-icon-grip-vertical></b-icon-grip-vertical>&nbsp;<strong>Block <span v-if="block.name">{{ block.name }}</span></strong></span>
                    <a href="#" @click="removeBlock(indexBlock)" class=""><b-icon-x font-scale="1.2"></b-icon-x></a>
                  </div>
                  <div class="card-body">
                    <b-input-group size="sm" prepend="Name" class="mb-3"> 
                      <b-form-input v-model="block.name"></b-form-input>
                    </b-input-group>
                    <b-input-group size="sm" prepend="Type" class="mb-3"> 
                      <b-form-input v-model="block.type"></b-form-input>
                    </b-input-group>
                    
                    <!-- SECTION BLOCK SETTINGS -->
                    <div class="card card-elements">
                      <div class="card-header"><b-icon-gear-fill></b-icon-gear-fill>&nbsp;Settings ({{section.blocks[indexBlock].settings.length}})</div>
                      <div class="card-body">
                        <draggable
                          class="dragArea list-group"
                          :list="section.blocks[indexBlock].settings"
                          group="sectionSettings"
                          @change="log"
                        >
                          <div
                            class="list-group-item d-flex justify-content-between align-items-start"
                            v-for="(blockSetting, indexBlockSetting) in section.blocks[indexBlock].settings"
                            :key="indexBlockSetting"
                          >
                            <span>{{ blockSetting.type }}</span>
                            <a href="#" @click="removeBlockSetting(indexBlock, indexBlockSetting)"><b-icon-x></b-icon-x></a>
                          </div>
                        </draggable>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-2">

    </div>


    <div class="col-md-3">
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
import draggable from "vuedraggable";

export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable
  },
  data() {
    return {
      allElements: [
        {
          type: 'header',
          content: 'Header text'
        },
        {
          type: 'paragraph',
          content: 'Paragraph text'
        },
        {
          type: 'checkbox',
          id: 'checkbox',
          label: 'Checkbox',
          default: true
        },
        {
          type: 'number',
          id: 'number',
          label: 'Number',
          default: 10
        },
        {
          type: 'radio',
          id: 'radio',
          label: 'Radio',
          options: [
            {
              value: 'left',
              label: 'Left',
            },
            {
              value: 'center',
              label: 'Center',
            },
            {
              value: 'right',
              label: 'Right',
            }
          ],
          default: 'center'
        },
        {
          type: 'range',
          id: 'range',
          min: 10,
          max: 50,
          step: 1,
          unit: 'px',
          label: 'Range',
          default: 15 
        },
        {
          type: 'select',
          id: 'select',
          label: 'Select',
          options: [
            {
              "value": "top",
              "label": "Top"
            },
            {
              "value": "middle",
              "label": "Middle"
            },
            {
              "value": "bottom",
              "label": "Bottom"
            }
          ],
          default: 'middle'
        },
        {
          type: 'text',
          id: 'text',
          label: 'Text',
          default: 'This is text input'
        },
        {
          type: 'textarea',
          id: 'textarea',
          label: 'Textarea',
          default: 'This is a textarea'
        },
        {
          type: "article",
          id: "article",
          label: "Article"
        },
        {
          type: "blog",
          id: "blog",
          label: "Blog"
        },
        {
          type: "collection",
          id: "collection",
          label: "Collection"
        },
        {
          type: "color",
          id: "body_text",
          label: "Body text",
          default: "#000000"
        },
        {
          type: "color_background",
          id: "background",
          label: "Background",
          default: "linear-gradient(#ffffff, #000000)"
        },
        {
          type: "font_picker",
          id: "heading_font",
          label: "Heading font",
          default: "helvetica_n4"
        },
        {
          type: "html",
          id: "video_embed",
          label: "Video embed"
        },
        {
          type: "image_picker",
          id: "logo_image",
          label: "Logo image"
        },
        {
          type: "link_list",
          id: "menu",
          label: "Menu"
        },
        {
          type: "liquid",
          id: "message",
          label: "Message",
          default: "Hello , welcome to our shop."
        },
        {
          type: "page",
          id: "page",
          label: "Page"
        },
        {
          type: "product",
          id: "product",
          label: "Product"
        },
        {
          type: "richtext",
          id: "paragraph",
          label: "Paragraph"
        },
        {
          type: "url",
          id: "button_link",
          label: "Button link"
        },
        {
          type: "video_url",
          id: "product_description_video",
          label: "Product description video",
          accept: [
            'youtube',
            'vimeo'
          ]
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
        type: 'block',
        settings: []
      }
    }
  },
  methods: {
    removeSetting(indexSetting) {
      this.section.settings.splice(indexSetting, 1)
    },
    addBlock(){
      this.section.blocks.push(JSON.parse(JSON.stringify(this.block)))
    },
    removeBlock(index) {
      this.section.blocks.splice(index, 1)
    },
    removeBlockSetting(indexBlock, indexBlockSetting) {
      this.section.blocks[indexBlock].settings.splice(indexBlockSetting, 1)
    },
    handleClone(item) {
      let cloneMe = JSON.parse(JSON.stringify(item))
      return cloneMe
    },
    log: function(evt) {
      let x = 0
      this.section.settings.forEach( (setting, index) => {
        if(setting.type != 'header' && setting.type != 'paragraph') {
          setting.id = `${setting.type}_${x}`
          x++
        }
      })
      
      this.section.blocks.forEach( block => {
        let y = 0
        block.settings.forEach((setting, index) => {
          if(setting.type != 'header' && setting.type != 'paragraph') {
            setting.id = `${setting.type}_${y}`
            y++
          }
        })
        
      })
      localStorage.setItem('section', JSON.stringify(this.section))
    }
  }
};
</script>
<style scoped>
a:link,
a:visited {
  color: black;
}

.block:hover,
.list-group-item:hover {
  cursor: pointer;
}

.card,
.list-group {
  border-radius: 0;
}

.input-group-text {
  border-radius: 0 !important;
  border-color: #82CFDC;
  background-color: #E3F5F7;
}

.list-group-item,
.customize-element {
  background-color: #E3F5F7;
  border: 1px solid #82CFDC;
  margin-bottom: .5rem;
}

.customize-element:hover {
  cursor: grab;
}

.card-elements {
  border: 1px solid #85BDC2;
}

.card-elements >.card-header {
  background-color: #B9DFD8;
}
</style>