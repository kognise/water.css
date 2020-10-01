// Water.css Bookmarklet
// ---------------------

const $$ = (selector) => document.querySelectorAll(selector)
const createElement = (tagName, properties) => Object.assign(document.createElement(tagName), properties)

// Remove all CSS stylesheets, external and internal
$$('link[rel="stylesheet"],style').forEach((el) => el.remove())

// Remove all inline styles
$$('*').forEach((el) => (el.style = ''))

// Add water.css and responsive viewport (if necessary)
document.head.append(
  createElement('link', {
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css'
  }),
  !$$('meta[name="viewport"]').length && createElement('meta', {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1.0'
  })
)
