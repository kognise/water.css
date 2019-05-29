(function () {
  const switchBtn = document.getElementById('switch');
  const stylesheet = document.getElementById('stylesheet');
  const darkMql = matchMedia('(prefers-color-scheme: dark)');
  const lightMql = matchMedia('(prefers-color-scheme: light)');
  const themes = {
    dark: '../dist/dark.css',
    darkStandalone: '../dist/dark.standalone.css',
    light: '../dist/light.css',
    lightStandalone: '../dist/light.standalone.css'
  };

  switchBtn.addEventListener('click', function() {
    const readTheme = stylesheet.getAttribute('href');
    if (readTheme === themes.dark) {
      if (darkMql.matches) {
        stylesheet.href = themes.lightStandalone
      } else if (lightMql.matches) {
        stylesheet.href = themes.darkStandalone
      } else {
        stylesheet.href = themes.light
      }
    } else if (readTheme === themes.darkStandalone) {
      stylesheet.href = themes.lightStandalone
    } else if (readTheme === themes.light) {
      if (darkMql.matches) {
        stylesheet.href = themes.lightStandalone
      } else if (lightMql.matches) {
        stylesheet.href = themes.darkStandalone
      } else {
        stylesheet.href = themes.dark
      }
    } else if (readTheme === themes.lightStandalone) {
      stylesheet.href = themes.darkStandalone
    }
  });

  darkMql.addListener(function (mql) {
    if (mql.matches) {
      stylesheet.href = themes.dark;
    } else {
      stylesheet.href = themes.light;
    }
  })
})();
