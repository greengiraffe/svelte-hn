// auto-restores the scroll position after navigating back (pop)
import "delayed-scroll-restoration-polyfill"
import App from "./App.svelte"

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
}

const app = new App({
  target: document.body,
})

export default app
