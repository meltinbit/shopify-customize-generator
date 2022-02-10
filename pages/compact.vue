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

    <div class="col-md-7">
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
                  @click=handleElementEdit(element)
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
              <span><b-icon-grid3x3-gap-fill></b-icon-grid3x3-gap-fill>&nbsp;<strong>Blocks ({{section.blocks.length}})</strong></span>
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
                      <div class="card-header"><b-icon-gear-fill></b-icon-gear-fill>&nbsp;<strong>Settings ({{section.blocks[indexBlock].settings.length}})</strong></div>
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
                            @click=handleElementEdit(blockSetting)
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

    <div class="col-md-3">
      <div class="card card-elements">
        <div class="card-header"><b-icon-pen-fill></b-icon-pen-fill><strong>Edit Properties</strong></div>
        <div class="card-body">
          <SHeader v-if="activeElement.type == 'header'" 
            :content="activeElement.content" 
            @input-content="activeElement.content = $event" 
          />
          <SParagraph v-if="activeElement.type == 'paragraph'" 
            :content="activeElement.content" 
            @input-content="activeElement.content = $event" 
          />

          <SText v-if="activeElement.type == 'text'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
          />

          <STextarea v-if="activeElement.type == 'textarea'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
          />

          <SCheckbox v-if="activeElement.type == 'checkbox'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
          />

          <SNumber v-if="activeElement.type == 'number'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
          />
          <SRadio v-if="activeElement.type == 'radio'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
            :options="activeElement.options"
            @input-options="pushOptions(activeElement, $event)"
          />

          <SRange v-if="activeElement.type == 'range'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :min="activeElement.min" 
            @input-min="activeElement.min = $event"
            :max="activeElement.max" 
            @input-max="activeElement.max = $event"
            :step="activeElement.step" 
            @input-step="activeElement.step = $event"
            :unit="activeElement.unit" 
            @input-unit="activeElement.unit = $event"
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
          />

          <SSelect v-if="activeElement.type == 'select'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
            :options="activeElement.options"
            @input-options="pushOptions(activeElement, $event)"
          />

          <SArticle v-if="activeElement.type == 'article'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />

          <SBlog v-if="activeElement.type == 'blog'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />

          <SCollection v-if="activeElement.type == 'collection'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />

          <SColor v-if="activeElement.type == 'color'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
          />

          <SColorBackground v-if="activeElement.type == 'color_background'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
          />

          <SFontPicker v-if="activeElement.type == 'font_picker'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
          />

          <SHtml v-if="activeElement.type == 'html'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />

            <SImagePicker v-if="activeElement.type == 'image_picker'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />

          <SLinkList v-if="activeElement.type == 'link_list'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />

          <SLiquid v-if="activeElement.type == 'liquid'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
            :def="activeElement.default" 
            @input-default="activeElement.default = $event"
          />

          <SPage v-if="activeElement.type == 'page'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />

          <SProduct v-if="activeElement.type == 'product'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />

          <SRichtext v-if="activeElement.type == 'richtext'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />

          <SUrl v-if="activeElement.type == 'url'" 
            :id="activeElement.id" 
            @input-id="activeElement.id = $event" 
            :label="activeElement.label" 
            @input-label="activeElement.label = $event"
          />
          <span v-else>click on a element to edit values</span>

        </div>
      </div>
    </div>
  </div>

  <a href="#" @click="toggleSource" class="displaySource"><b-icon-code-slash></b-icon-code-slash></a>
  <div v-if="displaySource" class="card text-white bg-success source-code">
    <div class="card-header d-flex justify-content-between align-items-start">
      <span>Output Schema</span>
      <a href="#" @click="toggleSource()"><b-icon-x font-scale="1.5"></b-icon-x></a>
    </div>
    <div class="card-body">
      <pre><code v-if="section" class="text-white">{{ section }}</code></pre>
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
      displaySource: false,
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
      },
      activeElement: {}
    }
  },
  methods: {
    removeSetting(indexSetting) {
      this.section.settings.splice(indexSetting, 1)
      this.resetActiveElement()
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
    handleElementEdit(element) {
      this.activeElement = element
    },
    pushOptions(element, event) {
      element.options.push(event);
    },
    resetActiveElement() {
      for (const key in this.activeElement) {
        delete this.activeElement[key];
      }
    },
    toggleSource() {
      this.displaySource = !this.displaySource
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

.form-control {
  border: 1px solid #82CFDC;
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

.displaySource {
  position: absolute;
  top: 0;
  right: 0;
  background-color:#000;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}

.displaySource > svg {
  fill: #fff;
}

.source-code {
  position: absolute;
  top: 0;
  right: 0;
}
</style>