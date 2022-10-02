const copyButton = document.getElementById('copy-button')
const copyButtonFeedback = document.getElementById('copy-button-feedback')
const themeForm = document.getElementById('theme-form')

copyButton.addEventListener('click', () => {
  const clipboard = navigator.clipboard || window.clipboard
  const theme = themeForm.querySelector('input[name="theme"]:checked').value
  const snippetText = document.querySelector(`#link-snippet-${theme} code`).textContent

  clipboard.writeText(snippetText)
    .then(() => { copyButtonFeedback.textContent = '✅' })
    .catch(() => { copyButtonFeedback.textContent = '❌' })
    .then(() => setTimeout(() => { copyButtonFeedback.textContent = '' }, 1000))
})
