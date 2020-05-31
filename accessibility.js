const pa11y = require('pa11y')
const chalk = require('chalk')
const puppeteer = require('puppeteer')

const check = async (browser, theme) => {
  console.log(chalk`{bold Checking {blue ${theme}} theme...}`)

  const page = await browser.newPage()
  page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: theme }
  ])

  const results = await pa11y('./dist/docs/index.html', {
    ignore: [
      'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2' // Ignore "this form does not contain a submit button"
    ],
    browser,
    page
  })

  await page.close()
  return results
}

const log = (results, theme) => {
  if (results.issues.length === 0) {
    console.log(chalk`{blue ${theme} –} {green.bold No issues found!}`)
    return
  }

  console.log()
  console.log(chalk`{blue ${theme} –} {red.bold Errors found:}`)
  for (const issue of results.issues) {
    console.log()
    console.log(chalk`{gray -> ${issue.code}}`)
    console.log(chalk`{gray -> ${issue.selector}}`)
    console.log(chalk`{gray -> ${issue.context}}`)
  }
  console.log()
}

const go = async () => {
  try {
    const browser = await puppeteer.launch()

    const [lightResults, darkResults] = await Promise.all([check(browser, 'light'), check(browser, 'dark')])

    console.log()
    log(lightResults, '☀ Light Theme')
    log(darkResults, '🌙 Dark Theme')
    console.log()

    await browser.close()

    const errorsFound = lightResults.issues.length || darkResults.issues.length
    if (errorsFound) process.exit(1)
  } catch (error) {
    console.log()
    console.log(chalk`{red An unexpected error occured!} ${error.message}`)
  }
}

go()
