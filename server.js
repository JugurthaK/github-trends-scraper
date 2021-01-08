const express = require('express')
const cors = require('cors')
const { fetchTrends } = require('./scraper')

const PORT = process.env.PORT || 9999

const app = express()
app.use(cors())

app.get('/', async (req, res) => {
  const trends = await fetchTrends()
  res.send(trends)
})

app.get('/trends', async (req, res) => {
  const { lang, spoken, since } = req.query
  const trends = await fetchTrends(lang, spoken, since)
  res.send(trends)
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
