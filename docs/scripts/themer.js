'use strict'

const localBase = './water.css/'

const fileSizes = {
  dark: 2.57,
  light: 2.55,
  auto: 3.27
}

const themeForm = document.getElementById('theme-form')
const stylesheet = document.getElementById('js-stylesheet')
const startupStylesheet = document.getElementById('js-startup-stylesheet')
const productHunt = document.querySelector('#product-hunt > img')
const linkSnippets = [...document.querySelectorAll('#link-snippet-container > pre')]

const table = {
  fileName: document.getElementById('table-file-name'),
  fileSize: document.getElementById('table-file-size'),
  theme: document.getElementById('table-theme')
}

const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)')

const updateProductHunt = (theme) => {
  if (!productHunt) return
  theme = theme || (prefersColorScheme.matches ? 'light' : 'dark')
  productHunt.src = `https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=150490&theme=${theme}&period=daily`
}

const updateTheme = () => {
  const theme = document.querySelector('input[name="theme"]:checked').value
  localStorage.setItem('theme', theme)

  const fileName = `${theme === 'auto' ? 'water' : theme}.min.css`
  const localUrl = `${localBase}${fileName}`

  stylesheet.href = localUrl

  for (const snippet of linkSnippets) {
    snippet.hidden = snippet.id.indexOf(theme) === -1
  }

  if (table.theme) {
    table.fileName.innerText = fileName
    table.fileSize.innerText = `${fileSizes[theme].toFixed(2)} kb`

    if (theme === 'auto') {
      updateProductHunt()
      table.theme.innerHTML = `
        Respects user-defined theme settings using <a style="--links: var(--code)" href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme" target="_blank" rel="noopener"><code>prefers-color-scheme</code></a>.<br>
        Light in browsers where the theme settings can't be detected.
      `
    } else {
      updateProductHunt(theme)
      table.theme.innerText = `Theme is forced to ${theme}.`
    }
  }
}

const storedTheme = localStorage.getItem('theme')
if (storedTheme) {
  themeForm.querySelector(`input[name="theme"][value="${storedTheme}"]`).checked = true
}

updateTheme()
themeForm.addEventListener('change', updateTheme)
startupStylesheet.parentElement.removeChild(startupStylesheet)

prefersColorScheme.addListener(() => {
  if (themeForm.theme.value !== 'auto') return
  updateProductHunt()
})
