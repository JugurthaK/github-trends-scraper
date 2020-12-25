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

app.listen(PORT, () => `Listening on PORT ${PORT}`)
