document.getElementById('switch').addEventListener('click', () => {
  const { body } = document
  const ph = document.getElementById('ph')
  if (body.classList.contains('light')) {
    body.classList.remove('light')
    ph.src = ph.src.replace('theme=light', 'theme=dark')
  } else {
    body.classList.add('light')
    ph.src = ph.src.replace('theme=dark', 'theme=light')
  }
})