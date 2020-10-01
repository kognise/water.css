# Contributing to Water.css

Water.css becomes better for everyone when people like you help make it better!

Have any questions or concerns? Did I forget an element or selector? Does something look ugly? Feel free to submit an issue or pull request.

Before contributing, please read the [code of conduct](CODE_OF_CONDUCT.md). Also, you agree that your contributions will be licensed under this project's [MIT License](../LICENSE.md).

## Overview

Please take a moment to read through the following guidelines:

- [Get started](#get-started)
- [Find issues to work on](#find-issues-to-work-on)
- [Add or change styles](#add-or-change-styles)
- [Create your pull request](#create-your-pull-request)
- [Project structure](#project-structure)

<br>

> **Quickstart**:
> 1. `yarn install` – install dependencies
> 2. `yarn dev` – start the dev server, make your changes
> 3. `yarn validate` – make sure your changes pass all tests
> 4. `yarn changeset` – describe your changes for the changelog

<br>

## Get started

1. Get a copy of the repository. It is recommended to [fork](https://github.com/kognise/water.css/fork) it first and clone to your machine using `git`.

2. Make sure that you have [yarn installed](https://classic.yarnpkg.com/en/docs/install/), then install dependencies by running:

    ```
    yarn install
    ```

3. Start the development server with live reload:

    ```
    yarn dev
    ```

4. Now you can visit [localhost:3000](http://localhost:3000) and start playing around with the framework – when you make changes to Water.css, the site will reload automatically so you can see what changed.

*Note:* A script that builds distribution ready files is also available but it is not the part of development workflow. It is designed to be triggered automatically while publishing a new version of Water.css, but if you want to inspect the minified assets meant for production, you can run it manually: `yarn build`

> Alternatively, you can develop in Repl.it, a supercool in-browser IDE! Just click this button: [![Run on Repl.it](https://repl.it/badge/github/kognise/water.css)](https://repl.it/github/kognise/water.css)

## Find issues to work on

If you are new to contributing open-source software, you can start by picking any relevant issue that is [tagged with **`good first issue`**](
https://github.com/kognise/water.css/contribute).

Also, everyone is welcome to contribute on issues [tagged with **`help wanted`**, you can find it filtered here](https://github.com/kognise/water.css/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).

## Add or change styles

There are a few rules for working in the Water.css source code:

1. The styles must not use any classes or IDs. Water.css is made entirely of basic style rules that only target HTML elements.

2. Don't specify colors directly in the source files (`src/parts/*`). Only use named variables there, which are declared in `src/variables-*.css`.

  ❌ Bad:
  ```css
  color: #fff;
  ```

  ✔ Good:
  ```css
  color: var(--text-bright);
  ```

3. Reuse existing colors where possible. Before introducing a new color to our palette, check if one of the existing colors fits your needs.

4. If you introduce a new variable, make sure to declare it both in `variables-dark.css` and `variables-light.css` so it's available in both themes. Also, add the new variable to the list of variables available for theming in the [README](../README.md#theming).

## Create your pull request

Once you're happy with your changes, you need to **commit** them, create a **changelog** and **submit a pull request**.

A few general rules of thumb about what makes a good pull request:

- Make sure that your pull request covers a small and well defined scope
- Make small commits with clear and explainful messages
- Provide a clear description about your contribution on GitHub

### Commit

When you commit code, Water.css will run some checks to make sure that your changes have no errors and match the project's coding style – a process called [**Linting**](https://www.freecodecamp.org/news/what-is-linting-and-how-can-it-save-you-time). It will also verify that all **colors are accessible**, which means they need to have enough contrast to be easily readable.

If the code you introduced has errors or some of the colors aren't accessible, you'll see an error and the commit will abort.
You can check whether your changes pass all tests before committing them by running:

```
yarn validate
```

If there are errors, you can try to fix them automatically by running:

```
yarn lint
```

<details>
  <summary>ℹ A note about puppeteer and WSL</summary>
  <br>
  <blockquote>
    The accessibility checks use puppeteer, a tool that uses Chrome to render websites "headlessly", without a visible interface. In some environments like the <a href="https://aka.ms/wsl">Windows Subsystem for Linux</a>, you'll need to manually configure and run an X-Server in order for puppeteer to work.
  </blockquote>
</details>

<br>

### Changelog

Now that your changes are commited, you'll need to **generate a changelog**:

We use a tool called [Changesets](https://github.com/atlassian/changesets) to keep track of what changes have been made between versions. Make sure to create a changelog before creating your pull request!

Just run this command for each change you made, and then answer a few questions:

```
yarn changeset
```

If you're not sure what kind of change you're making, pick "patch".

### Submit a Pull Request

Once your changes have been committed and you've created a changelog, you'll want to [submit a pull request](https://github.com/kognise/water.css/compare).

Be sure to provide a clear description of what your pull request includes. If your pull request will close an existing issue, make sure to write `Closes #[id]` in the pull request description, where `[id]` is replaced by the issue your pull request will close.

After submitting a pull request, it will need to be reviewed by a maintainer of the project before being merged. You may be asked to make some changes to your pull request.

After your change has been reviewed and merged, you can celebrate as the newest contributor to the Water.css project! 🎉

## Project structure

```
.
├── out
├── dist
└── docs
    └── icons
└── src
    ├── assets
    ├── builds
    └── parts
```

- **`out`** is ignored by git – it contains built assets for distribution

- **`dist`** contains old assets, for backwards compatibility - ignore this

- **`docs`** contains the documentation and demo page

- **`docs/icons`** contains water.css favicons used in the documentation

- **`src`** contains all the source stylesheets grouped into folders and variables

- **`src/assets`** contains images/icons used for UI element styling

- **`src/builds`** contains entry files for the different versions water.css comes in: auto, dark and light

- **`src/parts`** contains the water.css source code organized in separate files by its kind, like "forms" or "typography"
