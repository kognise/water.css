document.getElementById('switch').addEventListener('click', () => {
  const stylesheet = document.getElementById('stylesheet')
  if (stylesheet.getAttribute('href') === 'dist/water-dark.css') {
    stylesheet.setAttribute('href', 'dist/water-light.css')
  } else {
    stylesheet.setAttribute('href', 'dist/water-dark.css')
  }
})