<template>
  <div id="main" class="container-fluid p-5">
    <div class="row">
      <div class="col">
        <div class="card border-primary">
          <div class="card-header d-flex justify-content-between">
            Section
            <div>
              <b-dropdown text="Add Setting" size="sm">
                <b-dropdown-item v-for="(basicElement, index) in basicElements" :key="index" @click="addElementToSection(index, 'basic')">{{ basicElement.type }}</b-dropdown-item>
                <li><hr class="dropdown-divider"></li>
                <b-dropdown-item v-for="(specializedElement, index) in specializedElements" :key="index" @click="addElementToSection(index, 'specialized')">{{ specializedElement.type }}</b-dropdown-item>
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
                          <p @click="setSelectedElement(idx)">
                            <img :src="'./all-elements/' + sectionSetting.type + '.png'" class="img-fluid" />
                          </p>
                        </div>
                      </div>

                      <div v-if="idx == selectedElement" class="card">
                        <div class="card-body">
                          <SHeader v-if="sectionSetting.type == 'header'" 
                            :content="sectionSetting.content" 
                            @input-content="sectionSetting.content = $event" 
                          />

                          <SParagraph v-if="sectionSetting.type == 'paragraph'" 
                            :content="sectionSetting.content" 
                            @input-content="sectionSetting.content = $event" 
                          />

                          <SText v-if="sectionSetting.type == 'text'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <STextarea v-if="sectionSetting.type == 'textarea'" 
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
                            @input-options="pushOptions(idx, $event)"
                          />

                          <SRange v-if="sectionSetting.type == 'range'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :min="sectionSetting.min" 
                            @input-min="sectionSetting.min = $event"
                            :max="sectionSetting.max" 
                            @input-max="sectionSetting.max = $event"
                            :step="sectionSetting.step" 
                            @input-step="sectionSetting.step = $event"
                            :unit="sectionSetting.unit" 
                            @input-unit="sectionSetting.unit = $event"
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <SSelect v-if="sectionSetting.type == 'select'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                            :options="sectionSetting.options"
                            @input-options="pushOptions(idx, $event)"
                          />

                          <SArticle v-if="sectionSetting.type == 'article'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                          />

                          <SBlog v-if="sectionSetting.type == 'blog'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                          />

                          <SCollection v-if="sectionSetting.type == 'collection'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                          />

                          <SColor v-if="sectionSetting.type == 'color'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <SColorBackground v-if="sectionSetting.type == 'color_background'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <SFontPicker v-if="sectionSetting.type == 'font_picker'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <SHtml v-if="sectionSetting.type == 'html'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                          />

                           <SImagePicker v-if="sectionSetting.type == 'image_picker'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                          />

                          <SLinkList v-if="sectionSetting.type == 'link_list'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                          />

                          <SLiquid v-if="sectionSetting.type == 'liquid'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                            :def="sectionSetting.default" 
                            @input-default="sectionSetting.default = $event"
                          />

                          <SPage v-if="sectionSetting.type == 'page'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                          />

                          <SProduct v-if="sectionSetting.type == 'product'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                          />

                          <SRichtext v-if="sectionSetting.type == 'richtext'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
                          />

                          <SUrl v-if="sectionSetting.type == 'url'" 
                            :id="sectionSetting.id" 
                            @input-id="sectionSetting.id = $event" 
                            :label="sectionSetting.label" 
                            @input-label="sectionSetting.label = $event"
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
                          <b-dropdown-item v-for="(basicElement, index) in basicElements" :key="index" @click="addSettingToBlock(idx, index, 'basic')">{{ basicElement.type }}</b-dropdown-item>
                          <li><hr class="dropdown-divider"></li>
                          <b-dropdown-item v-for="(specializedElement, index) in specializedElements" :key="index" @click="addSettingToBlock(idx, index, 'specialized')">{{ specializedElement.type }}</b-dropdown-item>
                        </b-dropdown>
                      </div>
                      <div class="card-body">
                        <div class="mb-3">
                          <label>Name</label>
                          <input type="text" class="form-control form-control-sm" v-model="block.name">
                        </div>
                        <div class="mb-3">
                          <label>Type</label> 
                          <input type="text" class="form-control form-control-sm" placeholder="choose the type you want" v-model="block.type">
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
                                    <p @click="setSelectedElementInBlock(index)">
                                      <img :src="'./all-elements/' + blockSetting.type + '.png'" class="img-fluid" />
                                    </p>
                                  </div>
                                </div>

                                <div v-if="index == selectedElementInBlock" class="card">
                                  <div class="card-body">

                                    <SHeader v-if="blockSetting.type == 'header'" 
                                        :content="blockSetting.content" 
                                        @input-content="blockSetting.content = $event" 
                                      />

                                      <SParagraph v-if="blockSetting.type == 'paragraph'" 
                                        :content="blockSetting.content" 
                                        @input-content="blockSetting.content = $event" 
                                      />

                                     <SText v-if="blockSetting.type == 'text'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <STextarea v-if="blockSetting.type == 'textarea'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <SCheckbox v-if="blockSetting.type == 'checkbox'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <SNumber v-if="blockSetting.type == 'number'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <SRadio v-if="blockSetting.type == 'radio'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                        :options="blockSetting.options"
                                        @input-options="pushBlockOptions(idx, index, $event)"
                                      />

                                      <SRange v-if="blockSetting.type == 'range'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :min="blockSetting.min" 
                                        @input-min="blockSetting.min = $event"
                                        :max="blockSetting.max" 
                                        @input-max="blockSetting.max = $event"
                                        :step="blockSetting.step" 
                                        @input-step="blockSetting.step = $event"
                                        :unit="blockSetting.unit" 
                                        @input-unit="blockSetting.unit = $event"
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <SSelect v-if="blockSetting.type == 'select'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                        :options="blockSetting.options"
                                        @input-options="pushBlockOptions(idx, index, $event)"
                                      />

                                      <SArticle v-if="blockSetting.type == 'article'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <SBlog v-if="blockSetting.type == 'blog'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                      />

                                      <SCollection v-if="blockSetting.type == 'collection'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                      />

                                      <SColor v-if="blockSetting.type == 'color'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <SColorBackground v-if="blockSetting.type == 'color_background'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <SFontPicker v-if="blockSetting.type == 'font_picker'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <SHtml v-if="blockSetting.type == 'html'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                      />

                                      <SImagePicker v-if="blockSetting.type == 'image_picker'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                      />

                                      <SLinkList v-if="blockSetting.type == 'link_list'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                      />

                                      <SLiquid v-if="blockSetting.type == 'liquid'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                        :def="blockSetting.default" 
                                        @input-default="blockSetting.default = $event"
                                      />

                                      <SPage v-if="blockSetting.type == 'page'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                      />

                                      <SProduct v-if="blockSetting.type == 'product'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                      />

                                      <SRichtext v-if="blockSetting.type == 'richtext'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                      />

                                      <SUrl v-if="blockSetting.type == 'url'" 
                                        :id="blockSetting.id" 
                                        @input-id="blockSetting.id = $event" 
                                        :label="blockSetting.label" 
                                        @input-label="blockSetting.label = $event"
                                      />
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
        }
      ],
      specializedElements: [
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
        },
        {
          type: "checkbox",
          id: "enable_payment_button",
          label: "Show dynamic checkout button",
          info: "Each customer will see their preferred payment method from those available on your store, such as PayPal or Apple Pay. [Learn more](https://help.shopify.com/manual/online-store/themes/dynamic-checkout)",
          default: true
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
    addElementToSection(idx, type) {
      if(type == 'basic') {
        this.section.settings.push(JSON.parse(JSON.stringify(this.basicElements[idx])))
      }
      if(type == 'specialized') {
        this.section.settings.push(JSON.parse(JSON.stringify(this.specializedElements[idx])))
      }
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
    addSettingToBlock(idx, index, type) {
      if(type == 'basic') {
        this.section.blocks[idx].settings.push(JSON.parse(JSON.stringify(this.basicElements[index])))
      }
      if(type == 'specialized') {
        this.section.blocks[idx].settings.push(JSON.parse(JSON.stringify(this.specializedElements[index])))
      }
      this.selectedElementInBlock = this.section.blocks[idx].settings.length - 1
    },
    removeElementInBlock(idx, index) {
      this.section.blocks[idx].settings.splice(index, 1);
    },
    pushOptions(idx, event) {
      this.section.settings[idx].options.push(event);
    },
    pushBlockOptions(idx, index, event) {
      this.section.blocks[idx].settings[index].options.push(event);
    }
  }
 
}
</script>

<style scoped>
#main {
  font-size: .9rem;
}

img {
  max-width: 300px;
}

img:hover {
  cursor: pointer;
}
</style>