/**
 * Type definition for the version object used throughout the code
 * @typedef {Object} VersionOptions
 * @prop {'dark' | 'light'} theme
 * @prop {boolean} isLegacy
 * @prop {boolean} isStandalone
 */

/** The base URI from where the docs page loads the CSS files. */
const DEV_BASE = '../'
/** The base URI from where instructions show to load the CSS files. */
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/kognise/water.css/dist/'

/** An object mapping the (minified + gzipped) fileSize in KB to a fileName. */
const FILE_SIZES = {
  'dark.min.css': 1.4,
  'dark.standalone.min.css': 1.31,
  'dark-legacy.min.css': 0.177 + 1.16 + 1.15,
  'dark-legacy.standalone.min.css': 1.16,
  'light.min.css': 1.4,
  'light.standalone.min.css': 1.3,
  'light-legacy.min.css': 0.178 + 1.16 + 1.15,
  'light-legacy.standalone.min.css': 1.15,
}

/** @param {VersionOptions} options */
const getFileName = ({ theme, isLegacy, isStandalone }) => {
  return `${theme}${isLegacy ? '-legacy' : ''}${isStandalone ? '.standalone' : ''}.min.css`
}

/** @param {VersionOptions} options */
const getFileSize = options => {
  return FILE_SIZES[getFileName(options)] || '...'
}

const getFilePreloadSnippet = (mainFileName, altFileName, altTheme) => {
  return `
<!-- Preload the required stylesheets (optional) -->
<link rel="preload" as="style" href="${CDN_BASE}${mainFileName}">
<link rel="preload" as="style" href="${CDN_BASE}${altFileName}" media="(prefers-color-scheme: ${altTheme})">`
}

/** @param {VersionOptions} options */
const getFileSnippet = ({ theme, isLegacy, isStandalone }) => {
  const fileName = getFileName({ theme, isLegacy, isStandalone })
  const stylesheetSnippet = `<link rel="stylesheet" href="${CDN_BASE}${fileName}">`

  if (!isLegacy || isStandalone) return stylesheetSnippet

  const altTheme = theme === 'dark' ? 'dark' : 'light'
  const mainStandaloneFile = getFileName({ theme, isLegacy: true, isStandalone: true })
  const altStandaloneFile = getFileName({ theme: altTheme, isLegacy: true, isStandalone: true })
  const preloadSnippet = getFilePreloadSnippet(mainStandaloneFile, altStandaloneFile, altTheme)

  return (preloadSnippet + '\n\n' + stylesheetSnippet).trim()
}

const externalElements = {
  _phImage: document.querySelector('#js-producthunt'),
  _stylesheet: document.querySelector('#js-stylesheet'),

  updateStylesheet(href) {
    this._stylesheet.href = href
  },
  updateProductHunt(theme) {
    this._phImage.src = this._phImage.src.replace(/dark|light/, theme)
  },
  /** @param {VersionOptions} options @param {'dark' | 'light'} [preferedColorScheme] */
  update(options, preferedColorScheme) {
    const { theme, isStandalone } = options
    const href = DEV_BASE + getFileName(options)
    const visibleTheme = isStandalone ? theme : preferedColorScheme || theme

    this.updateStylesheet(href)
    this.updateProductHunt(visibleTheme)
  },
}

const createColorSchemeListener = (theme, queryHandler) => {
  const mediaQuery = matchMedia(`(prefers-color-scheme: ${theme})`)
  mediaQuery.addListener(query => queryHandler(query.matches))
  queryHandler(mediaQuery.matches)
}

new Vue({
  el: '#installation',
  filters: { capitalize: str => str.charAt(0).toUpperCase() + str.slice(1) },
  data: {
    versionOptions: { theme: 'dark', isStandalone: false, isLegacy: false },
    preferedColorScheme: null,
    copyStatus: null,
  },
  computed: {
    selectedVersion() {
      return {
        fileName: getFileName(this.versionOptions),
        fileSize: getFileSize(this.versionOptions),
        fileSnippet: getFileSnippet(this.versionOptions),
      }
    },
  },
  created() {
    createColorSchemeListener('dark', match => match && (this.preferedColorScheme = 'dark'))
    createColorSchemeListener('light', match => match && (this.preferedColorScheme = 'light'))

    if (this.preferedColorScheme) externalElements.updateProductHunt(this.preferedColorScheme)
  },
  methods: {
    copyToClipboard() {
      Promise.resolve()
        .then(() => clipboard.writeText(this.selectedVersion.fileSnippet))
        .then(() => (this.copyStatus = 'success'))
        .catch(() => (this.copyStatus = 'failed'))
      setTimeout(() => (this.copyStatus = undefined), 1000)
    },
  },
  watch: {
    preferedColorScheme(nextScheme) {
      externalElements.update(this.versionOptions, nextScheme)
    },
    versionOptions: {
      deep: true,
      handler(nextOptions) {
        externalElements.update(nextOptions, this.preferedColorScheme)
      },
    },
  },
})

const iconModeSwitcher = faviconModeSwitcher.default
iconModeSwitcher([
  {
    element: 'link[rel="shortcut icon"]',
    href: { dark: '/icons/light-favicon.ico' },
  },
  {
    element: 'link[rel="icon"][sizes="16x16"]',
    href: { dark: '/icons/light-favicon-16x16.png' },
  },
  {
    element: 'link[rel="icon"][sizes="32x32"]',
    href: { dark: '/icons/light-favicon-32x32.png' },
  },
])
