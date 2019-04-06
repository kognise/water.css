document.getElementById('switch').addEventListener('click', () => {
  const stylesheet = document.getElementById('stylesheet')
  if (stylesheet.getAttribute('href') === 'dist/dark.css') {
    stylesheet.setAttribute('href', 'dist/light.css')
  } else {
    stylesheet.setAttribute('href', 'dist/dark.css')
  }
})