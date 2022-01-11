import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import { config } from "dotenv"
import css from 'rollup-plugin-css-only'
import del from "rollup-plugin-delete"
import livereload from "rollup-plugin-livereload"
import svelte from "rollup-plugin-svelte"
import { terser } from "rollup-plugin-terser"
import { generateSW } from "rollup-plugin-workbox"
import sveltePreprocess from "svelte-preprocess"

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
      compilerOptions: {
        dev: !production
      },
      preprocess: [sveltePreprocess({ scss: true })],
    }),
    
    // Process environment variables
    replace({
      preventAssignment: false,
      "process.env.API_URL": JSON.stringify(envVars.API_URL)
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

    // Extract CSS into a separate file
    css({ output: "bundle.css" }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    // Generate a service worker using workbox for production
    generateSW({
      swDest: "public/service-worker.js",
      mode: production ? "production" : "dev",
      sourcemap: !production,
      globDirectory: "public",
      globPatterns: ["**/*.{html,js,css,woff2}"],
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(png|ico|jpg|svg)$/,
          handler: "CacheFirst",
        },
      ],
    }),

    // make sure the service-worker is removed when developing to
    // avoid running into caching issues when live-reloading is active
    !production &&
      del({
        targets: "public/service-worker.js",
      })
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
