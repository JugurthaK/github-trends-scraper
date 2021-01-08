const axios = require('axios')
const cheerio = require('cheerio')

let url = 'https://github.com/trending'

const fetchTrends = async (lang, spoken, since) => {
  if (lang) url = `${url}/${lang}`
  if (spoken) url = `${url}?spoken_language_code=${spoken}`
  if (since) url = `${url}${spoken ? '?' : '&'}since=${since}`

  const { data } = await axios.get(url)
  const $ = cheerio.load(data)
  const trends = $('article.Box-row')

  let articles = []
  trends.each(function () {
    let [author, project] = $(this).find('h1 > a').text().trim().split('/')

    const language = $(this).find('span[itemprop="programmingLanguage"]').text()
    const languageColor = $(this)
      .find('span.repo-language-color')
      .css('background-color')
    const description = $(this).find('p').text().trim()

    author = author.trim()
    project = project.trim()

    articles.push({
      author: author,
      project: project,
      description: description,
      language: language,
      color: languageColor,
      url: `https://github.com/${author}/${project}`,
    })
  })

  return articles
}

module.exports = { fetchTrends }
