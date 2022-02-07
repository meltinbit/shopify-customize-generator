<template>
  <div class="row">
    <div class="col-3">
      <h3>Elements</h3>
      <draggable
        class="dragArea list-group"
        :list="allElements"
        :group="{ name: 'sectionSettings', pull: 'clone', put: false }"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="(element, index) in allElements"
          :key="index"
        >
          {{ element.type }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Section</h3>
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
      <h3>Settings</h3>
      <draggable
        class="dragArea list-group"
        :list="section.settings"
        group="sectionSettings"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="(element, index) in section.settings"
          :key="index"
        >
          {{ element.type }}
        </div>
      </draggable>
    </div>

    <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" /> -->

    <!-- <rawDisplayer class="col-3" :value="section.settings" title="List 2" /> -->
    <pre><code v-if="section" class="">{{ section }}</code></pre>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import rawDisplayer from "vuedraggable";

export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable,
    rawDisplayer
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
        settings: [
          {
            type: "url",
            id: "button_link",
            label: "Button link"
          }
        ],
        max_blocks: 16,
        blocks: [],
        templates: []
      }
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
<style scoped></style>