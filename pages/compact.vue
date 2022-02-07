<template>
  <section>
    <div class="section-settings">
      <Container @drop="onDrop">            
        <Draggable v-for="item in items" :key="item.id">
          <div class="draggable-item section-setting">
            {{item}}
          </div>
        </Draggable>
      </Container>
    </div>
  </section>

  
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd"
import { arrayMoveImmutable } from 'array-move'

export default {
  components: { Container, Draggable },
  data() {
    return {
      items: [
        1,2,3,4,5
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
      }
    }
  },
  methods: {  
    onDrop(dropResult) {
      const reordered = arrayMoveImmutable(this.items, dropResult.removedIndex, dropResult.addedIndex)
      this.items = reordered
    }
  }
}
</script>