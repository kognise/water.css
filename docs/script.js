document.getElementById('switch').addEventListener('click', () => {
  const { body } = document
  const ph = document.getElementById('ph')
  if (body.className) {
    body.className = ''
    ph.src = ph.src.replace('theme=light', 'theme=dark')
  } else {
    body.className = 'light'
    ph.src = ph.src.replace('theme=dark', 'theme=light')
  }
})