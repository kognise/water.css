# Water.css

[![Water.css](logo.svg)](https://watercss.netlify.com/)

*A just-add-css collection of styles to make simple websites just a little nicer*

[![On reddit](https://img.shields.io/badge/on-reddit-orange.svg)](https://www.reddit.com/r/webdev/comments/b9m6mv/watercss_a_collection_of_neat_styles_for_simple/)
[![On product hunt](https://img.shields.io/badge/on-product%20hunt-red.svg)](https://www.producthunt.com/posts/water-css)
[![MIT license](https://img.shields.io/github/license/kognise/water.css.svg)](https://github.com/kognise/water.css/blob/master/LICENSE.md)

## Goals

 - Responsive
 - Good code quality
 - Good browser support (works on my old kindle's browser :P)
 - Small size (&lt; 2kb)
 - Beautiful
 - No classes

## Why?

I commonly make quick demo pages or websites with simple content. For these, I don't want to spend time styling them but don't like the ugliness of the default styles.

Water.css is a css framework that doesn't require any classes. You just include it in your `<head>` and forget about it, while it silently makes everything nicer.

## Who?

You might want to use Water.css if you're making a simple static or demo website that you don't want to spend time styling.

You probably don't want to use it for a production app or something that has more than a simple document. Rule of thumb: if your site has a navbar, don't use Water.css. It's just not meant for that kind of content.

## How?

Just stick this in your head:

```html
<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css'>
```

Well, there's a dark theme and a light theme. If you want the light theme, use `light.min.css` instead of `dark.min.css`. See [Theming](#theming) to make your own theme!

No other classes or code is required to make Water.css work. If you want a specific version, you can replace `@latest` with `@version`. See [all the versions](https://github.com/kognise/water.css/releases). You can also get rid of the `.min.css` and replace it with just `.css` if you want an unminified version.

**Oh, you want a demo you say?** Cheeky fellah! [Well, here's your demo.](https://watercss.netlify.com/)

Don't like how it looks? Feel free to submit an issue or PR with suggestions.

## Contributing

Water.css becomes better for everyone when people like you help make it better!

Have any questions or concerns? Did I forget an element or selector? Does something look ugly? Feel free to submit an issue or pull request.

If you decide to contribute, after downloading a copy of the repository make sure to run `yarn` to install dependencies useful for development. Then, you can just run the following to start a server of the demo with live reloading and automatic Sass compiling.

```
$ yarn dev
```

And make sure to run `yarn build` before pushing any changes! Thanks for taking the time to contribute :)

## Theming

Do you want to make your own theme different from the light or dark themes? Since Water.css is built with Sass this is super easy to do. There are two methods. Also, here's a list of variables to set:

- `$background`
- `$background-alt`
- `$text-main`
- `$text-bright`
- `$links`
- `$focus`
- `$border`
- `$code`
- `$button-hover`
- `$animation-duration`
- `$scrollbar-thumb`
- `$scrollbar-thumb-hover`
- `$form-placeholder`
- `$form-text`

Wanna quickly try out theming without installing anything or just explore our build environment?

[![Try on repl.it](https://repl-badge.jajoosam.repl.co/edit.png)](https://repl.it/github/https://github.com/amasad/water.css?lang=nodejs&ref=button)

### Based on an existing theme

You can base your theme off of the existing light or dark themes, which already have some variables predefined to make it easier for you.

Here's some simple Sass that'll just use the dark theme but color all links red. Of course, you can change any variables you want.

```scss
$links: #ff0000;
@import 'dark.scss';
```

### From scratch

You can also make your theme from scratch. This is less recommended, but feel free to! You just have to define all of the variables.

For example, here's an example of a really ugly theme, made from scratch. **Ouch!**

```scss
$background: #ff48c2 !default;
$background-alt: #00ff00 !default;

$text-main: #dbdbdb !default;
$text-bright: #ffffff !default;

$links: #ff0022 !default;
$focus: #ffc400 !default;
$border: #00ffff !default;
$code: #001aff !default;

$button-hover: #324759 !default;
$animation-duration: 0.1s !default;

$form-placeholder: #a9a9a9 !default;
$form-text: #ffffff !default;

@import 'parts/core';
```

You can also only import parts you want, but this is not recommended. See the `src/parts/` folder for a list of parts.

## Todos

- Add screenshots
- [Jekyll theme](https://github.com/kognise/water.css/issues/18)
- [NPM package](https://github.com/kognise/water.css/issues/41)
