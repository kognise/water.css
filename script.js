/* global matchMedia, faviconModeSwitcher */

(function () {
  const iconModeSwitcher = window.faviconModeSwitcher && faviconModeSwitcher.default
  if (!iconModeSwitcher) return
  iconModeSwitcher([
    {
      element: 'link[rel="shortcut icon"]',
      href: { dark: 'icons/light-favicon.ico' }
    },
    {
      element: 'link[rel="icon"][sizes="16x16"]',
      href: { dark: 'icons/light-favicon-16x16.png' }
    },
    {
      element: 'link[rel="icon"][sizes="32x32"]',
      href: { dark: 'icons/light-favicon-32x32.png' }
    }
  ])
})()

;(function (ThemeSwitcher) {
  const themeSwitcher = new ThemeSwitcher('stylesheet')
  const themeSwitchBtn = document.getElementById('switch')
  const themes = {
    dark: 'dark',
    darkStandalone: 'dark.standalone',
    light: 'light',
    lightStandalone: 'light.standalone'
  }
  const getSwitchThemeName = function () {
    // Case: switch to "light.standalone.css"
    if (
      ((themeSwitcher.current === themes.dark) && themeSwitcher.isDark) ||
      ((themeSwitcher.current === themes.light) && themeSwitcher.isDark) ||
      themeSwitcher.current === themes.darkStandalone
    ) {
      return themes.lightStandalone

    // Case: switch to "dark.standalone.css"
    } else if (
      ((themeSwitcher.current === themes.dark) && themeSwitcher.isLight) ||
      ((themeSwitcher.current === themes.light) && themeSwitcher.isLight) ||
      themeSwitcher.current === themes.lightStandalone
    ) {
      return themes.darkStandalone

    // Case: switch to "light.css"
    } else if (themeSwitcher.current === themes.dark) {
      return themes.light

    // Case: switch to "dark.css"
    } else if (themeSwitcher.current === themes.light) {
      return themes.dark

    // Case: switch destination is unknown
    } else {
      return themeSwitcher.current
    }
  }
  const getGeneralThemeName = function () {
    return themeSwitcher.current.replace(/\.standalone/g, '')
  }

  themeSwitchBtn.addEventListener('click', function () {
    themeSwitcher.switch(getSwitchThemeName())
  })

  themeSwitcher.onChangeDark = function () {
    themeSwitcher.switch(getGeneralThemeName())
  }

  themeSwitcher.onChangeLight = function () {
    themeSwitcher.switch(getGeneralThemeName())
  }
})(
  (function () {
    const ThemeSwitcher = function (stylesheet) {
      const darkSchemeMql = matchMedia('(prefers-color-scheme: dark)')
      const lightSchemeMql = matchMedia('(prefers-color-scheme: light)')
      const that = this

      this.themeDir = 'dist/'
      this.stylesheet = document.getElementById(stylesheet)
      this.current = this.getThemeName(this.stylesheet.href)
      this.isDark = darkSchemeMql.matches
      this.isLight = lightSchemeMql.matches

      darkSchemeMql.addListener(function (mql) {
        if (mql.matches && typeof that.onChangeDark === 'function') {
          that.onChangeDark()
        }
      })

      lightSchemeMql.addListener(function (mql) {
        if (mql.matches && typeof that.onChangeLight === 'function') {
          that.onChangeLight()
        }
      })
    }

    ThemeSwitcher.prototype = {
      switch: function (themeName) {
        this.stylesheet.href = this.themeDir + themeName + '.css'
        this.current = themeName
      },
      getThemeName: function () {
        const reg = new RegExp(this.themeDir + '(|.+?).css')
        return this.stylesheet.getAttribute('href').replace(reg, '$1')
      },
      onChangeDark: null,
      onChangeLight: null
    }

    return ThemeSwitcher
  })()
)
