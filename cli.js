#!/usr/local/bin/node

const { program } = require('commander')
const { fetchTrends } = require('./scraper')

program
  .option('-l, --lang <lang>', 'Choose programing language for trends', '')
  .option(
    '-s, --spoken <lang_code>',
    'Choose spoken language for trends (ex: fr, en...)',
    ''
  )
  .option(
    '-d, --date <date_range>',
    'Choose date range, available: dayli, weekly, monthly',
    ''
  )
  .parse(process.argv)

async function main() {
  const trends = await fetchTrends(program.lang, program.spoken, program.date)

  console.log(trends)
}

main()
