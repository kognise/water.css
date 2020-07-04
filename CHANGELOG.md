# water.css

## 2.0.0
### Major Changes

- Published to npm

  **TODO:** How does this impact jsdelivr?
- Added sourcemaps, autoprefixing, and minification

  **TODO:** this could use more description?
  - Strucutre of sourcemap files
  - Description of browser compatibility (?)
- Added support for `prefers-color-scheme` to automatically set light and dark theme
  
  **TODO:** Describe this more
  - What are the breaking changes?
    - What is the new default theme color?
    - How does this affect them?
  - Why did we make this change?
    - Browser support means this makes sense now?
  - How should consumers update their code?
    - Should they be using `water.css`, `light.css`, or `dark.css`?
  ```
- Changes to supported browsers
  
  **TODO:** Have we lost any browser support? Especially surrounding CSS variables
- Added [Code of Conduct](.github/CODE_OF_CONDUCT.md) and [Contribution Guide](.github/CONTRIBUTING.md)
- Added css variables to allow for changing theme colors at runtime instead of build time
- Restructured `.scss` file locations and variable names
- Added `height: auto` to `img` elements to keep aspect ratio

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
