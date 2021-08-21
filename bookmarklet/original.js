// Water.css Bookmarklet
// ---------------------

const $$ = (selector) => document.querySelectorAll(selector)
const createElement = (tagName, properties) => Object.assign(document.createElement(tagName), properties)

// Remove all CSS stylesheets, external and internal
$$('link[rel="stylesheet"],style').forEach((el) => el.remove())

// Remove all inline styles
$$('*').forEach((el) => (el.style = ''))

const linkElm = createElement('link', {
  rel: 'stylesheet',
  href: 'https://cdn.jsdelivr.net/npm/water.css@2/out/light.css'
})

// Add water.css and responsive viewport (if necessary)
document.head.append(
  linkElm,
  !$$('meta[name="viewport"]').length && createElement('meta', {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1.0'
  })
)

// Theme switching icons
const moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
const sunSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'

// Theme toggling logic
const toggleBtn = createElement('button', {
  innerHTML: sunSVG,
  ariaLabel: 'Switch theme',
  style: `
    position: fixed;
    top: 50px;
    right: 50px;
    margin: 0;
    padding: 10px;
    line-height: 1;
  `
})

let theme = 'light'
const toggleTheme = () => {
  if (theme === 'light') {
    theme = 'dark'
    toggleBtn.innerHTML = moonSVG
    linkElm.href = 'https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css'
  } else {
    theme = 'light'
    linkElm.href = 'https://cdn.jsdelivr.net/npm/water.css@2/out/light.css'
    toggleBtn.innerHTML = sunSVG
  }
}

toggleBtn.addEventListener('click', toggleTheme)
document.body.append(toggleBtn)
