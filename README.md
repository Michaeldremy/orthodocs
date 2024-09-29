# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Environment Setup

This project uses environment variables to manage sensitive information. Follow these steps to set up your environment:

1. Copy the `.env.example` file and rename it to `.env`
2. Replace the placeholder values in `.env` with your actual Firebase configuration
3. Ensure that `.env` is listed in your `.gitignore` file to prevent committing sensitive information

Note: Never commit your actual `.env` file to the repository.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
