const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios')

const ENDPOINT = process.env.SHOPIFY_API_ENDPOINT
const HEADERS = {
  common: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_API_SECRET
  }
}

app.use(bodyParser.json())

/**
 * Get all Themes
 */
app.get('/themes', async (req, res) => {
  const url = `${ENDPOINT}/themes.json`
  let themes = []
  try {
    const result = await axios.get(url, {headers: HEADERS})
    themes = result.data.themes
    res.json({ themes: themes })
  } catch( err ) {
    console.log(err.response.data)
    res.json({ errors: err.response.data.errors })
  }
  
})

/**
 * Get all theme Assets
 */
app.get('/assets', async (req, res) => {
  const url = `${ENDPOINT}/themes/${req.query.theme_id}/assets.json`
  let assets = []
  try {
    const result = await axios.get(url, {headers: HEADERS})
    assets = result.data.assets
    res.json({ assets: assets })
  } catch( err ) {
    console.log(err.response.data)
    res.json({ errors: err.response.data.errors })
  }
})

/**
 * Get a single Asset
 */
app.get('/asset', async (req, res) => {
  const url = `${ENDPOINT}/themes/${req.query.theme_id}/assets.json?asset[key]=${req.query.key}`
  let asset = {}
  try {
    const result = await axios.get(url, {headers: HEADERS})
    asset = result.data.asset
    const clean = asset.value.replace(/\s/g, "")
    const schema = clean.split('{%schema%}').pop().split('{%endschema%}')[0];
    res.json({ asset: asset, schema: JSON.parse(schema) })
  } catch( err ) {
    console.log(err.response.data)
    res.json({ errors: err.response.data.errors })
  }
})

/**
 * Create/Update a single Asset
 */
 app.put('/asset', async (req, res) => {
  const url = `${ENDPOINT}/themes/${req.query.theme_id}/assets.json`
  let asset = {}
  const data = {
    asset: {
      key: req.body.key,
      value: req.body.value
    }
  }
  //console.log(data.asset)
  try {
    const result = await axios.put(url, data, { 
      headers: HEADERS,
    })
    asset = result.data.asset
    res.json({ asset: asset })
  } catch( err ) {
    console.log(err.response.data.errors)
    res.json({ errors: err.response.data.errors })
  }
})

module.exports = app