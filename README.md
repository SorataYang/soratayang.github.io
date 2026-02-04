# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## License

This project uses a dual license approach:

- **Code License (MIT)**: The Docusaurus configuration, theme customizations, and build scripts are licensed under the [MIT License](./LICENSE).
- **Documentation License (CC BY 4.0)**: All documentation content in the `docs/` and `i18n/` directories is licensed under the [Creative Commons Attribution 4.0 International License](./LICENSE-DOCS). This means you're free to use, modify, and share it (even for commercial purposes and AI training) as long as you provide attribution.

### Contributing

We welcome contributions! Feel free to:
- Report issues or typos
- Suggest improvements
- Submit pull requests

Your contributions help improve this documentation for everyone.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
