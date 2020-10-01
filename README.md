<p align="center">
  <a href="https://www.npmjs.com/package/water.css"><img align="center" src="https://img.shields.io/npm/v/water.css.svg" alt="NPM page"></a>
  <a href="https://www.producthunt.com/posts/water-css"><img align="center" src="https://img.shields.io/badge/on-product%20hunt-blue.svg" alt="On Product Hunt"></a>
  <a href="https://github.com/kognise/water.css/pulls"><img align="center" src="https://img.shields.io/github/contributors-anon/kognise/water.css" alt="Contributors"></a>
  <a href="https://github.com/kognise/water.css/blob/master/LICENSE.md"><img align="center" src="https://img.shields.io/github/license/kognise/water.css.svg" alt="MIT license"></a>
</p>

<br>

<h1 align="center">Water.css</h1>
<p align="center">🌊 A drop-in collection of CSS styles to make simple websites just a little nicer</p>

[![Water.css](assets/logo.svg)](https://watercss.kognise.dev/)

<br>

## Goals

- Responsive
- Themeable
- Good browser support (works on my old kindle's browser :P)
- Tiny size
- Beautiful
- No classes

## Why?

I commonly make quick demo pages or websites with simple content. For these, I don't want to spend time styling them but don't like the ugliness of the default styles.

Water.css is a CSS framework that doesn't require any classes. You just include it in your `<head>` and forget about it, while it silently makes everything nicer.

## Who?

You might want to use Water.css if you're making a simple static page or demo website that you don't want to spend time styling.

Although it originally wasn't built for more complex websites, many developers have used Water.css as a base stylesheet and creatively applied custom styles to build out an entire app. Nothing is stopping you from doing the same!

## How?

Just stick this in your `<head>`:

### 🌙/☀ Automatic Theme:

`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css">`

### 🌙 Dark Theme:

`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css">`

### ☀ Light Theme:

`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/light.min.css">`

<br>

A **preview** of the different themes is available [on the **demo page**](https://watercss.kognise.dev/#installation)! ⚡

#### How the "Automatic Theme" works

The main `water.css` file automatically switches between light and dark mode depending on the system preferences of a user's device. This detection is made possible through a CSS media query called [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme). In browsers where the preference can't be detected, `water.css` will stick to the light theme.

If you want to avoid this behavior, use either `dark.css` or `light.css`.

#### Supporting Internet Explorer

All three distributions of Water.css support Internet Explorer 11, but the main `water.css` file **doesn't respect the user's color scheme** and will be locked to light mode due to lack of `prefers-color-scheme` support.

Be aware that IE also doesn't support [runtime theming](#theming), and fixed fallback values will be used. If you want to override the Water.css theme in a way that's compatible with IE, we recommend that you [compile your own theme](#compiling-your-own-theme).

#### Unminified builds

All versions are also available as unminified stylesheets, which can be handy during development.  
Simply remove the `.min` from the file name.

## Theming

Do you want to make some adjustments or build your own theme completely different from the official dark or light themes? Since Water.css is built with CSS variables this is super easy to do! Here's a list list of all the variables you can change to your liking:

- `--background-body`
- `--background`
- `--background-alt`
- `--selection`
- `--text-main`
- `--text-bright`
- `--text-muted`
- `--links`
- `--focus`
- `--border`
- `--code`
- `--animation-duration`
- `--button-hover`
- `--scrollbar-thumb`
- `--scrollbar-thumb-hover`
- `--form-placeholder`
- `--form-text`
- `--variable`
- `--highlight`
- `--select-arrow`

### Runtime theming

> ⚠ If you use a version with support for legacy browsers like Internet Explorer, skip to [Compiling your own theme](#compiling-your-own-theme)!

Water.css uses Custom Properties (_"CSS variables"_) to define its base styles such as colors. These can be changed and overwritten right in the browser.

Because of this, you can simply add your own stylesheet to the page and set your own CSS variables there. As long as your stylesheet comes after Water.css in the HTML, your values will override the default ones and your theme is applied!

This short example will use Water.css, but color all links red:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/water.css@2/out/water.min.css" />
<style>
  :root {
    --links: red;
  }
</style>
```

If you want to change a value for dark or light mode only, use a media query like this:

```html
<style>
  :root {
    --links: blue; /* Always applied */
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --links: yellow; /* Only applied in dark mode (overrides blue) */
    }
  }
</style>
```

### Compiling your own theme

If you are targeting browsers without support for CSS Custom Properties such as Internet Explorer, runtime theming is not an option. To apply your own theming, you'll need to make your changes in the source files themselves, then re-compile the CSS files. This works like the following:

- Clone the repository to your machine
- Run `yarn` to install dependencies
- Make the theming changes you want in `src/variables-*.css`
- Run `yarn build` to compile the CSS files
- Use the compiled files in the `out/` directory on your site

You also might want to check out the [Contributing Guide](https://github.com/kognise/water.css/tree/master/.github/CONTRIBUTING.md) as it contains further information about the build setup.

## Contributing

Water.css becomes better for everyone when people like you help make it better!

Check out our [Contributing Guide](.github/CONTRIBUTING.md) to learn how to get started.  
And thanks for taking the time to contribute! :)
