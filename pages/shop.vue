<template>
  <div>
    <h1>SHOP</h1>
    <ul v-if="themes.length">
      <li v-for="(theme, idx) in themes" :key="idx">
        {{theme.name}} [<a href="#" @click="getThemeAssets(theme.id)">get assets</a>]
      </li>
    </ul>

    <ul v-if="assets.length">
      <li v-for="(asset, idx) in assets" :key="idx">
        {{asset.name}} [<a href="#" @click="getThemeAsset(asset.theme_id, asset.key)">{{asset.key}}</a>]
      </li>
    </ul>
    <div v-if="schema">
      {{schema}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      themes: [],
      assets: [],
      asset: {},
      schema: ''
    }
  },
  methods: {
    async getThemeAssets(theme_id) {
      try {
        const response = await axios.get(`/api/assets?theme_id=${theme_id}`)
        this.assets = response.data.assets
      } catch( err ) {
        console.log(err)
      }
    },
    async getThemeAsset(theme_id, key) {
      try {
        const response = await axios.get(`/api/asset?theme_id=${theme_id}&key=${key}`)
        this.asset = response.data.asset
        this.schema = response.data.schema
      } catch( err ) {
        console.log(err)
      }
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
  }
}
</script>
