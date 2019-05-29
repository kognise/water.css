(function (ThemeSwitcher) {
  const themeSwitcher = new ThemeSwitcher('stylesheet');
  const themeSwitch = document.getElementById('theme-switch');
  const themes = {
    dark: 'dark',
    darkStandalone: 'dark.standalone',
    light: 'light',
    lightStandalone: 'light.standalone'
  };
  const getSwitchThemePath = function () {
    // Case: switch to "light.standalone.css"
    if (
      (themeSwitcher.current === themes.dark) && themeSwitcher.isDark ||
      (themeSwitcher.current === themes.light) && themeSwitcher.isDark ||
      themeSwitcher.current === themes.darkStandalone
    ) {
      return themes.lightStandalone

    // Case: switch to "dark.standalone.css"
    } else if (
      (themeSwitcher.current === themes.dark) && themeSwitcher.isLight ||
      (themeSwitcher.current === themes.light) && themeSwitcher.isLight ||
      themeSwitcher.current === themes.lightStandalone
    ) {
      return themes.darkStandalone;

    // Case: switch to "light.css"
    } else if (themeSwitcher.current === themes.dark) {
      return themes.light;

    // Case: switch to "dark.css"
    } else if (themeSwitcher.current === themes.light) {
      return themes.dark;

    // Case: switch destination is unknown
    } else {
      return themeSwitcher.current;
    }
  };

  themeSwitch.addEventListener('click', function() {
    themeSwitcher.switch(getSwitchThemePath());
  });
})(
  (function () {
    const ThemeSwitcher = function(stylesheet) {
      const darkSchemeMql = matchMedia('(prefers-color-scheme: dark)');
      const lightSchemeMql = matchMedia('(prefers-color-scheme: light)');

      this.themeDir = '../dist/';
      this.stylesheet = document.getElementById(stylesheet);
      this.current = this.getThemeName(this.stylesheet.href);
      this.isDark = darkSchemeMql.matches;
      this.isLight = lightSchemeMql.matches;
    };

    ThemeSwitcher.prototype = {
      switch: function (themeName) {
        this.stylesheet.href = this.themeDir + themeName + '.css';
        this.current = themeName;
      },
      getThemeName: function () {
        const reg = new RegExp(this.themeDir + '(|.+?).css');
        return stylesheet.getAttribute('href').replace(reg, '$1');
      }
    };

    return ThemeSwitcher;
  })()
);
