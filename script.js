(function () {
  const switchBtn = document.getElementById('switch');
  const stylesheet = document.getElementById('stylesheet');
  const mql = matchMedia('(prefers-color-scheme: dark)');
  const themes = {
    dark: '../dist/dark.css',
    darkStandalone: '../dist/dark.standalone.css',
    light: '../dist/light.css',
    lightStandalone: '../dist/light.standalone.css'
  };

  switchBtn.addEventListener('click', function() {
    switch (stylesheet.getAttribute('href')) {
      case themes.dark:
        stylesheet.href = mql.matches ? themes.lightStandalone : themes.darkStandalone;
        break;
      case themes.darkStandalone:
        stylesheet.href = themes.lightStandalone;
        break;
      case themes.light || themes.lightStandalone:
        stylesheet.href = mql.matches ? themes.lightStandalone : themes.darkStandalone;
        break;
      case themes.lightStandalone:
        stylesheet.href = themes.darkStandalone;
        break;
    }
  });

  mql.addListener(function (mql) {
    if (mql.matches) {
      stylesheet.href = themes.dark;
    } else {
      stylesheet.href = themes.light;
    }
  })
})();
