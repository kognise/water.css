# Water.css

## 2.1.0

### Minor Changes

- 567d2ec: Add styles for <dialog> element

### Patch Changes

- ebb4e23: Add style for color input field
- 21e1e5d: Remove sourcemap references from built files
- c23d65c: Reduce input selector specificity for display property to prevent overriding user's css. Fixes #78 and #82
- 1f1168c: Added styling for Input type Reset
- 84b57fd: Update button colors for better contrast, especially in tables
- 2fff00c: Update main package entrypoint
- 881022a: Fix color of `<code>` and `<strong>` tags inside links

## 2.0.0

### Major Changes

- Published to npm

  If you're using an old version of Water.css, you **must** see the README or you won't get new changes

- Added sourcemaps, autoprefixing, and minification

  - Cleaned up the structure of sourcemap files
  - Compatible with all major browsers including IE

- Added support for `prefers-color-scheme` to automatically set light and dark theme
  - The default theme color is light mode
  - Internet Explorer does not support this so the automatic version will always show up as light mode in IE
  - If you want to force a color scheme, use `light.css`, or `dark.css`

* Added CSS variables to allow for changing theme colors at runtime instead of build time

  IE does not support this either, but nothing should break because we provide fixed fallback colors. It is possible to compile your own theme if you must have custom colors in IE.

* Added [Code of Conduct](.github/CODE_OF_CONDUCT.md) and [Contribution Guide](.github/CONTRIBUTING.md)
* Restructured `.scss` file locations and variable names
* Added `height: auto` to `img` elements to keep aspect ratio

### Minor Changes

- Added radio and checkbox styles
- Added styles for prepending emojis to `href='mailto'`, `href='tel'`, and `href='sms'`
- `table` no longer has outer borders and `tr` elements use color striping for alternating backgorund colors
- Added `min-height` and respect `cols`/`rows` attributes on `textarea`
- Use `system-ui` font when available
- Added styles for `samp`, `time`, `var`, and `kbd` elements
- Added styling for `blockquote`, `q`, and `mark` elements
- Added print styles
- Custom scrollbar styles
- Added `cursor: not-allowed` to `select:disabled`, `button:disabled`, `textarea:disabled`
- Added styles for `::selection`

### Patch Changes

- Fixed padding, alignment, and colors on several elements
  - Modified some colors to fix accessibility issues
- `table` elements no longer overflow
- Added linter and linted entire codebase
- Fixed `max-width` of `video` element to prevent overflowing
