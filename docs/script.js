document.getElementById('switch').addEventListener('click', function() {
  const stylesheet = document.getElementById('stylesheet');
  stylesheet.href = stylesheet.href.replace(/dark|light/, function(replaced) { return replaced === 'dark' ? 'light' : 'dark' });
});