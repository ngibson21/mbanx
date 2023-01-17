# web-banking

# CI
The linter will be run on every commit.

The linter will check the js code by using the [JavaScript Standard Style](https://standardjs.com/) and html indentation.

If you want the linter to fix the formatting automatically for you, you just
have to run `npm run lint`

If you only want to see where the formatting is wrong without it being
automatically fixe you can run `npm run lint:nofix`

Whenever you merge your changes into the `develop` branch, the `web-banking` will be deployed development environment on Mbanq AWS
https://web.dev.mbanq.cloud

## Project setup
Once you cloned the project, `cd` into `web-banking` and install dependencies.
Here is a one-liner for you to start working with the project:

```bash
git clone git@gitlab.mbanq.com:x/web-banking.git && cd web-banking && npm i && npm start
```

## Run project
This is how the `.env` file is loaded
```bash
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```
We specifiy client by
```bash
#.env.kinetic
VUE_APP_CLIENT=kinetic
```


- start project: `npm start` (This will use `.env` or `.env.local` if exist)
- start in specific mode: `npm run start:[MODE]` or `MODE=[MODE] npm run start`
- build project: `npm run build`

## Run tests

```bash
npm run test:unit
```

Whenever you're writing new tests you can make `jest` watch for changes on your
files and execute the tests automatically.

```bash
npm run test:unit:watch
```

## Linting

```bash
npm run lint
```

You can also run the linter without fixing the possible issues (that's what we
use on CI for linter to fails)

```bash
npm run lint:nofix
```

## Project Structure

We try to follow certain guideline in how we structure the `Vue` projects.
If you take a look at the `src` folder: https://gitlab.mbanq.com/x/web-banking/tree/develop/src you will see 2 main folders that hold the `Vues` (I couldn't find a better word).

- `views` folder hold the top lever views of the app, e.g. `/accounts` =>
  `src/views/Accounts` folder
  - `src/views/Accounts/Index.vue` is the main accounts view
  - `src/views/Accounts/Show.vue` is the view of a certain account
- every view like `Index.vue` or `Show.vue` is composed out of components that
  live inside `src/components/Accounts`
- `Shared` components - that are used in multiple places are placed inside of
  `src/components/Shared` (yes, if we break down all the components further and
further down, we could potentially have onle `Shared` components)

# File Pipeline structure

    ├── README.md                  - The file you are reading
    ├── gitlab/                   - Gitlab CiCd pipeline components e.g. Jobs, Security, Deploy, Performance ...
    |   └── code-quality/           - CodeQuality pipeline template configuration file
    |   └── jobs/                   - Jobs pipeline template configuration file
    |   └── deployments
    |       └── mbanq.gitlab-ci.yml
    │       └── customer
    |           └── <deploy-stage>.gitlab-ci.yml   - Gitlab Pipeline templates environment be configuration files
    ├── scripts/                   - Scripts for project related tasks
    │   └── pipelines/              - Script for pipeline tasks
    │   └── setup/                 - Script to setup local machine
    └──.gitlab-ci.yml   - Gitlab Pipeline configuration files
