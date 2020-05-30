'use strict'

const cdnBase = 'https://cdn.jsdelivr.net/npm/water.css@2/dist/'
const localBase = './water.css/'

const fileSizes = {
  dark: 2.3,
  light: 2.29,
  auto: 2.96
}

const themeForm = document.getElementById('theme-form')
const linkSnippet = document.getElementById('link-snippet')
const stylesheet = document.getElementById('js-stylesheet')
const startupStylesheet = document.getElementById('js-startup-stylesheet')
const productHunt = document.getElementById('product-hunt')

const table = {
  fileName: document.getElementById('table-file-name'),
  fileSize: document.getElementById('table-file-size'),
  theme: document.getElementById('table-theme'),
  browserSupport: document.getElementById('table-browser-support')
}

const updateProductHunt = (theme) => {
  productHunt.src = `https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=150490&theme=${theme}&period=daily`
}

const updateTheme = () => {
  const theme = themeForm.querySelector('input[name="theme"]:checked').value

  const fileName = `${theme === 'auto' ? 'water' : theme}.min.css`
  const cdnUrl = `${cdnBase}${fileName}`
  const localUrl = `${localBase}${fileName}`

  stylesheet.href = localUrl

  linkSnippet.innerText = `<link rel="stylesheet" href="${cdnUrl}">`
  table.fileName.innerText = fileName
  table.fileSize.innerText = `${fileSizes[theme].toFixed(2)} kb`

  if (theme === 'auto') {
    table.theme.innerHTML = `
    Defaults to dark, but respects user-defined theme settings.<br>
    (detected via <a style="--links: var(--code)" href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme" target="_blank" rel="noopener"><code>prefers-color-scheme</code></a>)
    `
    table.browserSupport.innerHTML = `
      All current browsers
      (<a href="https://caniuse.com/#feat=css-variables" target="_blank" rel="noopener">support for CSS Custom Properties</a>)
    `
  } else {
    table.theme.innerText = `Theme is forced to ${theme}.`
    table.browserSupport.innerText = 'All browsers (including Internet Explorer)'
    updateProductHunt(theme)
  }
}

themeForm.addEventListener('change', updateTheme)

const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)')
updateProductHunt(prefersColorScheme.matches ? 'light' : 'dark')
prefersColorScheme.addListener(() => {
  if (themeForm.theme.value !== 'auto') return
  updateProductHunt(prefersColorScheme.matches ? 'light' : 'dark')
})

updateTheme()
startupStylesheet.parentElement.removeChild(startupStylesheet)
