document.getElementById('switch').addEventListener('click', function() {
  const stylesheet = document.getElementById('stylesheet')
  const ph = document.getElementById('ph')
  if (stylesheet.getAttribute('href') === 'dist/dark.css') {
    stylesheet.setAttribute('href', 'dist/light.css')
    ph.src = ph.src.replace('theme=dark', 'theme=light')
  } else {
    stylesheet.setAttribute('href', 'dist/dark.css')
    ph.src = ph.src.replace('theme=light', 'theme=dark')
  }
})