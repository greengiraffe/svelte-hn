import svelte from "rollup-plugin-svelte"
import sveltePreprocess from "svelte-preprocess"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import commonjs from "@rollup/plugin-commonjs"
import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"
import { config } from "dotenv"
import { generateSW } from "rollup-plugin-workbox"

const production = !process.env.ROLLUP_WATCH

// Load environment variables from .env for local development,
// in production retrieve them from Node. The variables are used by
// the rollup replace plugin lateron.
const envVars = {
  ...config().parsed,
  API_URL: process.env.API_URL,
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write("public/build/bundle.css", !production)
      },
      preprocess: [sveltePreprocess({ scss: true })],
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    // Generate a service worker using workbox
    generateSW({
      swDest: "public/service-worker.js",
      sourcemap: !production,
      globDirectory: "public",
      globPatterns: ["**/*.{html,js,css,woff2}"],
      runtimeCaching: [
        {
          urlPattern: /\.(png|ico|jpg|svg)$/,
          handler: "CacheFirst",
        },
      ],
    }),

    // Process environment variables
    replace({
      __ENV_VARS__: JSON.stringify({
        ...envVars,
      }),
    }),
  ],
  watch: {
    clearScreen: false,
  },
}

function serve() {
  let started = false

  return {
    writeBundle() {
      if (!started) {
        started = true

        require("child_process").spawn(
          "yarn",
          ["run", "start", "--", "--dev"],
          {
            stdio: ["ignore", "inherit", "inherit"],
            shell: true,
          }
        )
      }
    },
  }
}
