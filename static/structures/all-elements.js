const allElements = [
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
]

export default allElements