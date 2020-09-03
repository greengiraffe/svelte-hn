import App from "./App.svelte"

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
}

if (window.history && window.history.scrollRestoration) {
  window.history.scrollRestoration = "manual"
}

const app = new App({
  target: document.body,
})

export default app
