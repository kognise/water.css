> 💡 TODO: Add contributing guide

Contribution Guidelines

Contents

    Getting started
    Writing code
    Opening a pull request
    Code of conduct

Getting started

    Start by exploring the repository. Take a look at how the algorithms are implemented, how tests are written, and which files go where.

    Before beginning your contribution, create an issue. In your issue's description, please describe the addition or change you wish to make. This helps us guide your contribution, and it lets others know what you're working on.

    Fork the repo, clone your fork, and configure the remotes:

    # Clone your fork of the repo into the current directory
    git clone https://github.com/<your-username>/water.css.git
    # Navigate to the newly cloned directory
    cd water.css
    # Assign the original repo to a remote called "upstream"
    git remote add upstream https://github.com/kognise/water.css.git

    Create a new branch to contain your code by the following command:

    git checkout -b <branch-name>

Writing code

    Commit your changes in logical chunks.

    Before you push your changes to GitHub, make sure that your code runs without any errors or warnings.

Opening a pull request

Follow these steps when you're ready to submit your code:

    Locally merge (or rebase) the upstream development branch into your branch:

    git pull [--rebase] upstream master

    Push your branch up to your fork:

    git push origin <branch-name>

    Open a pull request with a clear title and description against the master branch. Your pull request should reference the same issue you created above.

    Once your pull request has been opened, we'll review it and go from there. 😄

Code of Conduct

This project has a Code of Conduct. Please follow it in all your interactions with the project.