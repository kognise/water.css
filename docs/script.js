// @ts-check
/** @typedef {'dark' | 'light'} Theme */
/** @typedef {keyof typeof FILE_SIZES} FileName */
/** @typedef {'success' | 'failed'} CopyStatus */
/** @typedef {{ Vue: typeof import('vue').default, clipboard: Clipboard }} Libraries */
/** @typedef {{ theme: Theme, isLegacy: boolean, isStandalone: boolean }} VersionOptions */

/** @typedef {Object} VueData State used by the version picker
 * @prop {VersionOptions} versionOptions
 * @prop {?CopyStatus} copyStatus
 * @prop {?Theme} preferedColorScheme
 */

/** Reference to global window, but with properties for loaded libraries. */
const w = /** @type {Window & Libraries} */ (window)
const queryParams = new URLSearchParams(w.location.search)
const supportsCssVars = typeof CSS !== 'undefined' && CSS.supports('color', 'var(--clr)')

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

/** Takes in version options and returns the respective CSS file name. */
const getFileName = (/** @type {VersionOptions} */ { theme, isLegacy, isStandalone }) => {
  const legacySuffix = isLegacy ? '-legacy' : ''
  const standaloneExt = isStandalone ? '.standalone' : ''
  return /** @type {FileName} */ (`${theme}${legacySuffix}${standaloneExt}.min.css`)
}

/** Takes in version options and returns the corresponding file size in KB. */
const getFileSize = (/** @type {VersionOptions} */ options) => FILE_SIZES[getFileName(options)] || 0

/** Takes in version options and returns an HTML snippet that preloads the main stylesheet and
 *  conditionally preloads the alternative stylesheet (if the alternative theme is active). */
const getFilePreloadSnippet = (/** @type {VersionOptions} */ { theme, isLegacy, isStandalone }) => {
  const alternativeTheme = theme === 'dark' ? 'light' : 'dark'
  const alternativeFile = getFileName({ theme: alternativeTheme, isLegacy, isStandalone })

  return `
<!-- Preload the required stylesheets (optional) -->
<link rel="preload" as="style" href="${CDN_BASE}${getFileName({ theme, isLegacy, isStandalone })}">
<link rel="preload" as="style" href="${CDN_BASE}${alternativeFile}" media="(prefers-color-scheme: ${alternativeTheme})">`
}

/** Takes in version options and returns the code snippet instructing users how to load the file. */
const getFileSnippet = (/** @type {VersionOptions} */ { theme, isLegacy, isStandalone }) => {
  const fileName = getFileName({ theme, isLegacy, isStandalone })
  const stylesheetSnippet = `<link rel="stylesheet" href="${CDN_BASE}${fileName}">`

  if (!isLegacy || isStandalone) return stylesheetSnippet

  const preloadSnippet = getFilePreloadSnippet({ theme, isLegacy, isStandalone: true })
  return (preloadSnippet + '\n\n' + stylesheetSnippet).trim()
}

/** Handles elements external to the version picker that still need to be kept
 *  up to date with the current version, e.g. switching images from dark to light. */
const externalElements = {
  _productHunt: /** @type {HTMLImageElement} */ (document.querySelector('#js-producthunt')),
  _stylesheet: /** @type {HTMLLinkElement} */ (document.querySelector('#js-stylesheet')),
  _removeStartupStylesheet() {
    const startupStylesheet = document.head.querySelector('#js-startup-stylesheet')
    if (startupStylesheet) document.head.removeChild(startupStylesheet)
  },
  _updateProductHunt(/** @type {Theme} */ theme) {
    this._productHunt.src = this._productHunt.src.replace(/dark|light/, theme)
  },
  _updateStylesheet(/** @type {FileName} */ fileName) {
    this._stylesheet.href = DEV_BASE + fileName
  },

  /** Sets up listener to remove startup version of water.css when right one loads, then updates */
  init(/** @type {VersionOptions} */ options, /** @type {?Theme} */ preferedTheme) {
    this._stylesheet.addEventListener('load', this._removeStartupStylesheet)
    this.update(options, preferedTheme)
  },
  /** Takes current version + the user's prefered scheme and updates all external elements. */
  update(/** @type {VersionOptions} */ options, /** @type {?Theme} */ preferedTheme) {
    const displayedTheme = options.isStandalone ? options.theme : preferedTheme || options.theme

    this._updateStylesheet(getFileName(options))
    this._updateProductHunt(displayedTheme)
  },
}

/**
 * Sets up a media query for the given color scheme and runs the callback on change.
 * @param {Theme} scheme
 * @param {(matches: boolean) => any} queryHandler
 */
const createColorSchemeListener = (scheme, queryHandler) => {
  const mediaQuery = w.matchMedia(`(prefers-color-scheme: ${scheme})`)
  mediaQuery.addListener(query => queryHandler(query.matches))
  queryHandler(mediaQuery.matches)
}

const themeFromParams = queryParams.get('theme')
const initialVersionOptions = {
  theme: /** @type {Theme} */ (/dark|light/.test(themeFromParams) ? themeFromParams : 'dark'),
  isLegacy: queryParams.has('legacy') || !supportsCssVars,
  isStandalone: queryParams.has('standalone'),
}

new w.Vue({
  el: '#installation',
  filters: {
    capitalize: (/** @type {string} */ str) => str.charAt(0).toUpperCase() + str.slice(1),
  },
  /** @type {VueData} */
  data: {
    versionOptions: initialVersionOptions,
    preferedColorScheme: null,
    copyStatus: null,
  },
  computed: {
    /** @returns {{ fileName: string, fileSize: string, fileSnippet: string }} */
    selectedVersion() {
      return {
        fileName: getFileName(this.versionOptions),
        fileSize: getFileSize(this.versionOptions).toFixed(2),
        fileSnippet: getFileSnippet(this.versionOptions),
      }
    },
  },
  created() {
    createColorSchemeListener('dark', match => match && (this.preferedColorScheme = 'dark'))
    createColorSchemeListener('light', match => match && (this.preferedColorScheme = 'light'))

    externalElements.init(this.versionOptions, this.preferedColorScheme)
  },
  methods: {
    copyToClipboard() {
      Promise.resolve()
        .then(() => w.clipboard.writeText(this.selectedVersion.fileSnippet))
        .then(() => (this.copyStatus = 'success'))
        .catch(() => (this.copyStatus = 'failed'))
      setTimeout(() => (this.copyStatus = null), 1000)
    },
  },
  watch: {
    preferedColorScheme(/** @type {Theme} */ nextScheme) {
      externalElements.update(this.versionOptions, nextScheme)
    },
    versionOptions: {
      deep: true,
      handler(/** @type {VersionOptions} */ nextOptions) {
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
