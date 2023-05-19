# cosmonote

![lint](https://github.com/notesum/notesum/workflows/lint/badge.svg)

The simplest PDF summarization tool, hosted at [cosmonote.space](https://cosmonote.space).

```sh
gh repo clone notesum/notesum
cd notesum
yarn
```

Several [`yarn`](https://yarnpkg.com/) commands are available
(see [`package.json`](https://github.com/notesum/notesum/blob/master/package.json)),
including:

* `build` (build from scratch)
* `dev` (build and run)
* `preview` (deploy to preview channel)
* `live` (merge preview channel into production)

Required dependencies:

* [`node`](https://nodejs.org)
* [`yarn`](https://yarnpkg.com)
* [`firebase`](https://firebase.google.com/docs/cli) (dev)
* [`git`](https://git-scm.com/) and/or [`gh`](https://cli.github.com/) (dev)

[`homebrew`](https://brew.sh/) (MacOS): `git node yarn gh firebase-cli`  
[`winget`](https://learn.microsoft.com/windows/package-manager/winget) (Windows):
`Git.Git OpenJS.NodeJS Yarn.Yarn GitHub.cli Google.FirebaseCLI`

Ensure that you have logged into both [`gh`](https://cli.github.com/)
and [`firebase`](https://firebase.google.com/docs/cli):
```sh
gh auth login
firebase login
```
