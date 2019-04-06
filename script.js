document.getElementById('switch').addEventListener('click', () => {
  const css = document.getElementById('watercss');
  if (css.getAttribute('href') == 'dist/water-dark.css') {
    css.setAttribute('href', 'dist/water-light.css')
  } else {
    css.setAttribute('href', 'dist/water-dark.css')
  }
})