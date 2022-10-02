import pa11y from 'pa11y'
import chalkTemplate from 'chalk-template'
import puppeteer from 'puppeteer'

const check = async (browser, theme) => {
  console.log(chalkTemplate`{bold Checking {blue ${theme}} theme...}`)

  const page = await browser.newPage()
  page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: theme }
  ])

  const results = await pa11y('./out/docs/index.html', {
    ignore: [
      'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2' // Ignore "this form does not contain a submit button"
    ],
    browser,
    page
  })

  if (results.issues.length === 0) {
    await page.close()
    console.log(chalkTemplate`{green No issues found!}`)
    return false
  }

  for (const issue of results.issues) {
    console.log()
    console.log(chalkTemplate`{red Error:} ${issue.message}`)
    console.log(chalkTemplate`{gray -> ${issue.code}}`)
    console.log(chalkTemplate`{gray -> ${issue.selector}}`)
    console.log(chalkTemplate`{gray -> ${issue.context}}`)
  }

  await page.close()
  return true
}

const go = async () => {
  try {
    const browser = await puppeteer.launch()

    const lightResult = await check(browser, 'light')
    console.log()
    const darkResult = await check(browser, 'dark')

    await browser.close()
    if (lightResult || darkResult) process.exit(1)
  } catch (error) {
    console.log()
    console.log(chalkTemplate`{red An unexpected error occured!} ${error.message}`)
  }
}

go()
