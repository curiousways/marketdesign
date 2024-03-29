# MARKET DESIGN

<p>
  <a aria-label="Next js logo" href="https://nextjs.org">
    <img src="https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-logo.png" height="28">
  </a>
    <a aria-label="Typescript logo" href="https://www.typescriptlang.org/" style="margin-left:10px">
    <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/typescript_original_logo_icon_146317.png" height="28">
  </a>
  <a aria-label="Tailwindcss logo" href="https://tailwindcss.com/" style="margin-left:10px">
    <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.79614a5f61617ba49a0891494521226b.svg" height="28">
  </a>
</p>

This project is bootstrapped using [Next.js](https://nextjs.org/docs), [Typescript](https://www.typescriptlang.org/) and [TailwindCSS](https://tailwindcss.com/).

To get started, clone this repo using `git clone https://github.com/Curious-Ways/marketdesign.git`. Next run `npm i` or `npm install` to install all required dependencies (you need Node JS installed on your machine to run `npm` commands. [See here](https://nodejs.org/en/download/) to download and install Node JS on your machine).

After the installation is complete:

Run `npm run dev` to start the development server on <http://localhost:3000>

## Table of contents

- [Project folder structure](#project-folder-structure)
- [Styling](#styling)
- [Analytics](#page-analytics)
- [SEO setup](#seo)
- [Sitemap](#sitemap-generation)
- [Prettier](#prettier)
- [env variables](#env-variables)
- [Configuring walkthroughs](#configuring-walkthroughs)
- [Configuring the market sandbox](#configuring-the-market-sandbox)

### Project folder structure

- **_Pages directory_**: Since Next.js's router is file-system based, The folder _Pages_ is a Next-specific directory to place routes or pages. For each route, you will have a separate file, which is named as the route. For example the file _about.tsx_ in the pages directory will create the following route: <https://domain.com/about>. [See docs](https://nextjs.org/docs/routing/introduction) for more details.

- **_Public directory_**: Next.js uses this directory to statically serve files like the robots.txt or the favicon.ico. For more information on how to include these files here: [official docs](https://nextjs.org/docs/basic-features/static-file-serving).

- **_Components directory_**: Contains React components which can be reused across multiple pages.

### Styling

- [TailwindCSS](https://tailwindcss.com/docs/installation). A utility-first CSS framework with pre-configured classes to create an API for the projects design system.

### Page Analytics

We use [Fathom](https://usefathom.com/) for page analytics. Add the Fathom Analytics ID to the `next.config.js` file as an environmental variable. Use identifier/key `FATHOM_ANALYTICS_ID` as an env variable.

### SEO

We setup default seo using the [next-seo package](https://github.com/garmeeh/next-seo). You can add your site name, site title and site url as environmental variables under the `next.config.js` file. See [the documentation](https://github.com/garmeeh/next-seo) on how to add seo bits on a per page basis.

### Sitemap Generation

We use the [next-sitemap package](https://www.npmjs.com/package/next-sitemap) to generate sitemap for different pages.

### Prettier

Prettier is a code formatter. It removes all original styling and ensures that all outputted code conforms to a consistent style.
It'll do things like adding a semicolon to the end of every statement, or make sure your indentation is consistent. The `.prettierrc` file at the project's root is in charge of customising Prettier and how it works. We recommend that you should not touch this file, to keep this configuration consistent through out the period of this project. VScode also has a Prettier extension, see how to install it [here](https://www.educative.io/answers/how-to-set-up-prettier-and-automatic-formatting-on-vs-code).

### env variables

Create a `.env.local` file in your root folder and add your sensitive environmental variables to this file. For less sensitive environmental variables (like site URL and title), add them under the `next.config.js` file.

NB: Prefixing a env variable with `NEXT_PUBLIC_` exposes it to the browser. See [Next.js documentation](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser).

### Configuring walkthroughs

The walkthroughs can be configured via the configuration files stored in the
`data/walkthroughs` directory.

Each walkthrough comprises one or more scenarios, where each scenario comprises
one or more stages. Each scenario is also associated with a role
(seller, buyer or generic), which dictates how the current user's projects are
displayed.

Stages are iterated through by the user clicking the "next stage" button, the
form "Submit" button, or the "Solve market" button. For the first two the stage
number will be incremented by one with each click. When the "Solve market" button
is clicked we increment through six stages automatically, where each stage is
used to represent an aspect of the market outcome being calculated.

Whenever a stage is incremented a scenario function is called that returns the
data for that stage. The function for each scenario can be found at:

```text
data/walkthroughs/<role>/<scenario-number>/index.ts
```

for example:

```text
data/walkthroughs/buyer/1.1/index.ts
```

These functions each return an object with the following properties:

- `myProjects`: The current user's projects, which will be displayed in the
details box at the top left of the walkthrough.
- `buyerProjects`: The projects being bidded for by developers.
- `sellerProjects`: The projects being offered by landholders.
- `sidebarContent`: An object that maps stage numbers to the content to be
displayed in the sidebar.
- `options`: An object used to conditionally enable features, generally based on
the stage number (e.g. enable the form at stage 3).

To create a new scenario for an existing walkthrough create a scenario function
using the existing functions as an example and add that function to the index
file for the relevant role (e.g. `data/walkthroughs/buyer/index.ts`). The
scenario can be associated with an existing walkthrough, or an entirely new one.
If using a new walkthrough this will show up automatically on the "How it works"
index page.

### Configuring the market sandbox

To add more scenarios for the market sandbox drop JSON files into the
[data/demo](./data/demo) folder. These scenarios will appear on the Market
Sandbox index page.
