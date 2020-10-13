# Svelte HN

Another inofficial Hacker News client made with Svelte. It uses [my fork of node-hnapi](https://github.com/greengiraffe/node-hnapi) as a backend.

## Development

The initial project template was based on the [https://github.com/sveltejs/template](official Svelte template). This means [rollup.js](https://rollupjs.org/) is used for JS bundling and [sirv](https://github.com/lukeed/sirv) serves the project locally.

```bash
# install dependencies
yarn install

# start the app (defaults to localhost:5000)
yarn start

# build for production (to /public folder)
yarn build

# lint files with eslint
yarn lint

# format files with prettier
yarn format
```

### License

Licensed under the MIT license (see LICENSE.txt).
