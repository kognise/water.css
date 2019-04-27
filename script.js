document.getElementById('switch').addEventListener('click', function() {
  const stylesheet = document.getElementById('stylesheet')
  if (stylesheet.getAttribute('href') === 'dist/dark.min.css') {
    stylesheet.setAttribute('href', 'dist/light.min.css')
  } else {
    stylesheet.setAttribute('href', 'dist/dark.min.css')
  }
})