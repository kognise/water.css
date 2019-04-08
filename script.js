document.getElementById('switch').addEventListener('click', () => {
  const stylesheet = document.getElementById('stylesheet')
  const ph = document.getElementById('ph')
  if (stylesheet.getAttribute('href') === 'dist/dark.css') {
    stylesheet.setAttribute('href', 'dist/light.css')
    ph.src = ph.src.replace('theme=dark', 'theme=light')
  } else if (stylesheet.getAttribute('href') === 'dist/light.css') {
    stylesheet.setAttribute('href', 'dist/darker.css')
    ph.src = ph.src.replace('theme=dark', 'theme=darker')
  } else {
    stylesheet.setAttribute('href', 'dist/dark.css')
    ph.src = ph.src.replace('theme=darker', 'theme=dark')
  }
})