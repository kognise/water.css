# Contributing to Water.css

Water.css becomes better for everyone when people like you help make it better!

Have any questions or concerns? Did I forget an element or selector? Does something look ugly? Feel free to submit an issue or pull request.

Before contributing, please read the [code of conduct](CODE_OF_CONDUCT.md). Also you agree that your contributions will be licensed under its [MIT License](./LICENSE.md).

## How to get started

1. Get a copy of repository. It is recommended to fork it first and clone to your machine using `git`.

2. Make sure that you have [yarn](https://yarnpkg.com) and install dependencies listed in `package.json` using it.

```
yarn
```

3. Then you can run development server with live reloading out of the box and play around with the framework.

```
yarn dev
```

So you can access the `index.html` in browser by visiting http://localhost:3000/index.html

More details will be provided in command line interface.

*Note.* A script that builds distribution ready files is also available but it is not the part of development workflow, it is designed to be triggered automatically while publishing a new version of a package. The script itself could be run manually:

```
yarn build
```

## How to find issues to work on

If you are new to contributing open-source software, you can starty by picking any relevant issue that is tagged with `good first issue` [there](
https://github.com/kognise/water.css/contribute).

Also everyone is welcome to contribute on issues tagged with `help wanted`, you can find it filtered [here](https://github.com/kognise/water.css/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).


## How to make a pull request

It is a few general rules of thumb about making pull requests:

* Make sure that your pull request covers a small and well defined scope

* Make small commits with clear and explainful messages

* You need to provide a clear description about your contribution on GitHub

## Directory structure

```
.
├── dist
├── icons
└── src
    ├── assets
    ├── builds
    └── parts
```

`dist` directory is ignored by git and it contains built assets for distribution

`icons` directory contains water.css favicons used in `index.html` demo/docs file

`src` directory contains all the source stylesheets groupped into folders and variables

`src/assets` directory contains images used for UI elements styling

`src/builds` directory contains base style files prepared for different kind of builds (i.e. light and dark themes, supporting legacy browsers, etc)

`src/parts` directory contains the whole source organized in separate files by its kind like forms, links, typography