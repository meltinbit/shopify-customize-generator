<template>
<div> 
  <div class="wrapper">
    <section class="sidebar">
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
    </section>

    <main>
      <div class="card card-elements">
        <div class="card-header d-flex justify-content-between align-items-start">
          <strong><b-icon-grid1x2-fill></b-icon-grid1x2-fill>&nbsp;Section</strong>
          <div>
            <!-- <a href="#"><b-icon-arrow-bar-up v-b-modal.load-modal title="paste an existing Section JSON schema"></b-icon-arrow-bar-up></a> -->
            <a href="#"><b-icon-arrow-counterclockwise @click="sectionReset()" title="reset Section"></b-icon-arrow-counterclockwise></a>
          </div>
        </div>
        <div class="card-body">
          <!--SECTION -->
          <b-input-group size="sm" prepend="Name" class="mb-3"> 
            <b-form-input v-model="section.name" @input="setClassPreset"></b-form-input>
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
              <p class="drag-here-text" v-if="!section.settings.length">Drag&Drop elements here</p>
            </div>
          </div>
          
          <!-- SECTION BLOCKS -->
          <div class="card card-elements">
            <div class="card-header d-flex justify-content-between align-items-start">
              <span><b-icon-grid3x3-gap-fill></b-icon-grid3x3-gap-fill>&nbsp;<strong>Blocks ({{section.blocks.length}})</strong></span>
              <a href="#" title="add a Block" @click="addBlock()" class=""><b-icon-plus font-scale="1.5"></b-icon-plus></a>
            </div>
            <div class="card-body blocks">
              <p class="info" v-if="!section.blocks.length">Still no Blocks, create your first Block clicking on plus icon.</p>
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
                            <span>
                              <b-icon-grip-vertical></b-icon-grip-vertical>
                              {{ blockSetting.type }}
                            </span>
                            <a href="#" @click="removeBlockSetting(indexBlock, indexBlockSetting)"><b-icon-x></b-icon-x></a>
                          </div>
                        </draggable>
                        <p class="drag-here-text" v-if="!section.blocks[indexBlock].settings.length">Drag&Drop elements here</p>
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
    </main>

   <section class="contextual">
        <div class="card card-elements">
          <div class="card-header"><b-icon-pen-fill></b-icon-pen-fill>&nbsp;<strong>Edit Properties</strong></div>
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

            <SVideoUrl v-if="activeElement.type == 'video_url'" 
              :id="activeElement.id" 
              @input-id="activeElement.id = $event" 
              :label="activeElement.label" 
              @input-label="activeElement.label = $event"
            />

            <span v-if="!Object.keys(activeElement).length"><b-icon-info-circle></b-icon-info-circle><i>&nbsp;click on a element to edit values</i></span>

          </div>
        </div>
      </section>

      <!-- <section class="theme-browser">
        <div class="card">
          <div class="card-header">
            <span><b-icon-hdd-network-fill></b-icon-hdd-network-fill>&nbsp;Theme Browser</span>
          </div>
          <div class="card-body">
            <select class="form-control" v-model="theme_id" @change="setTheme($event)">
              <option>choose a theme</option>
              <option v-for="(theme,idx) in themes" :key="idx" :value="theme.id">{{ theme.name }}</option>
            </select>

            <div v-if="themeSections.length">
              <h6 class="mt-4 mb-2 ml-3">Sections</h6>
              <ul>
                <li v-for="(themeSection, idx) in themeSections" :key="idx">
                  {{themeSection.name}} 
                  <b-icon-folder-fill @click="getThemeAsset(themeSection.asset.theme_id, themeSection.asset.key)"></b-icon-folder-fill>
                </li>
              </ul>
            </div>
          
          </div>
        </div>
      </section> -->

      <!-- SOURCE CODE -->
      <a href="#" title="view source code" @click="toggleSource" class="displaySource"><b-icon-code-slash></b-icon-code-slash></a>
      <div v-if="displaySource" class="card source-code">
        <div class="card-header">
          <span>Output Schema</span>
          <a href="#" @click="toggleSource()" class="text-white"><b-icon-x font-scale="1.5"></b-icon-x></a>
        </div>
        <div class="card-body">
          <!-- <div class="d-flex align-items-center justify-content-center mb-3">
            <input v-model="sectionName" type="text" placeholder="choose a filename" class="form-control form-control-sm mr-2">
            <button @click="sectionSave()" :disabled="!sectionName" class="btn btn-secondary btn-sm" title="upload Section"><b-icon-cloud-upload-fill></b-icon-cloud-upload-fill></button>
          </div> -->
          
          <pre><code v-if="section" class="text-white">{{ section }}</code></pre>
        </div>
      </div>
  </div>

  <b-modal id="load-modal" title="Load Section Schema">
		<p>If you want to load an existing Section schema in the Composer to modify it. Copy and paste the code here.</p>
    <textarea v-model="loadSchema" autofocus class="form-control" style="min-height: 400px"></textarea>
    <b-button class="mt-3" variant="outline-danger" block @click="load()" :disabled="!loadSchema.length">LOAD</b-button>
  </b-modal>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import axios from 'axios'
import sectionSchema from '~/static/structures/section-schema.json'
import blockSchema from '~/static/structures/block-schema.json'
import allElements from '~/static/structures/all-elements.js'
import generateName  from '~/utils/random-name-generator.js'

export default {
  name: "clone",
  //display: "Clone",
  order: 2,
  components: {
    draggable
  },
  data() {
    return {
      displaySource: false,
      allElements: allElements,
      section: JSON.parse(JSON.stringify(sectionSchema)),
      block: JSON.parse(JSON.stringify(blockSchema)),
      activeElement: {},
      loadSchema: '',
      themes: [],
      theme_id: null,
      assets: [],
      themeSections: [],
      sectionName: '',
      sectionSchemaReset: JSON.parse(JSON.stringify(sectionSchema)),
    }
  },
  methods: {
    setClassPreset() {
      this.section.class = this.section.presets[0].name = this.sectionName = this.section.name
    },
    removeSetting(indexSetting) {
      this.section.settings.splice(indexSetting, 1)
      this.resetActiveElement()
    },
    addBlock(){
      const block = JSON.parse(JSON.stringify(this.block))
      block.name = `Block_${this.section.blocks.length}`
      block.type = `block_${this.section.blocks.length}`
      this.section.blocks.push(block)
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
    sectionReset() {
      this.section = this.sectionSchemaReset
    },
    toggleSource() {
      this.displaySource = !this.displaySource
    },
    load() {
      this.section = JSON.parse(this.loadSchema)
      this.loadSchema = ''
    },
    log(evt) {
      console.log(evt)
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
    },
    loadTheme() {
      if (process.browser){
        const theme_id = localStorage.getItem('theme_id')
        if(theme_id) {
          this.theme_id = theme_id
          this.getThemeAssets(theme_id)
        }
      }
    },
    setTheme(evt) {
      this.theme_id = evt.target.value
      localStorage.setItem('theme_id', this.theme_id)
      this.getThemeAssets(this.theme_id)
    },
    async sectionSave() {
      try {
        const response = await axios.put(`/api/asset?theme_id=${this.theme_id}`, {
          key: `sections/${this.sectionName}.liquid`,
          value: `{%schema%}${JSON.stringify(this.section, null, 2)}{%endschema%}`
        })
        const asset = response.data.asset
      } catch( err ) {
        console.log(err)
        this.$toast.error('errors')
      }
    },
    async getThemeAssets(theme_id) {
      try {
        const response = await axios.get(`/api/assets?theme_id=${theme_id}`)
        const assets = response.data.assets
        assets.forEach( asset => {
          const [type, name] = asset.key.split('/')
          if(type == 'sections') {
            this.themeSections.push({
              asset: asset,
              name: name
            })
          }
        })
        //this.assets = response.data.assets
      } catch( err ) {
        console.log(err)
      }
    },
    async getThemeAsset(theme_id, key) {
      try {
        const response = await axios.get(`/api/asset?theme_id=${theme_id}&key=${key}`)
        /* this.asset = response.data.asset
        this.schema = response.data.schema */
        this.section = response.data.schema
      } catch( err ) {
        console.log(err)
      }
    },
    getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('/api/themes')
      return {
        themes: response.data.themes
      }
    } catch( err ) {
      console.log(err)
    }
  },
  watch: {
    section: {
      handler(val) {
        //set the preset name as the name of the section
        this.section.presets.name = this.section.name
      },
      deep: true
    }
  },
  created() {
    this.loadTheme() //loads a Theme if present in localStorage
    this.section.name = generateName()
    this.setClassPreset()
  }
};
</script>
<style scoped>
.wrapper {
  display: grid;
  /* grid-template-columns: 15vw 1fr 20vw 20vw; */
	grid-template-columns: 15vw 1fr 30vw;
  grid-gap: .5rem;
}

main {
  display: grid;
  grid-gap: .5rem;
}

.sidebar,
.contextual,
.theme-browser {
  position: sticky;
  top: 100px;
  overflow-y: scroll;
  max-height: 100vh;
}

.block:hover,
.list-group-item:hover {
  cursor: pointer;
}

.card,
.list-group {
  border-radius: 0;
}

.card-body {
	background-color: var(--body-bg);
}

.list-group-item {
  z-index: 1;
}


.dragArea {
  min-height: 50px;
}

.drag-here-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: .9rem;
  color: var(--text-color);
  margin: 0;
  padding: .7rem 0;
  width: 90%;
  border: 2px dashed var(--text-color);
  border-radius: .4rem;
  background-color: var(--drag-background);
  z-index: 0;
}

.list-group-item,
.customize-element {
  background-color: var(--list-background);
  border: 2px solid var(--list-background);
  border-radius: 5rem;
  color: var(--text-color);
  margin-bottom: .5rem;
}

.customize-element:hover {
  cursor: grab;
}


.displaySource {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: var(--source-background);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}

.displaySource > svg {
  fill: var(--text-color);
}

.source-code {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
  min-width: 20vw;
  height: 100vh;
  overflow-y: scroll;
	border-left: 1px solid var(--input-background);
}

.source-code > .card-header {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info {
  text-align: center;
  font-size: .9rem;
  color: var(--text-color);
}
</style>