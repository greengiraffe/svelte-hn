import { get, set } from "idb-keyval"
import { savedStories, darkMode } from "../store"

/**
 * Retrieve values from IndexedDB and update the svelte
 * stores accordingly.
 */
export function initStoresFromIDB() {
  // 1. load saved stories from IndexedDB (idb-keyval)
  get("savedStories").then((stories) => {
    if (stories !== undefined) savedStories.set(stories)
  })
  get("darkMode").then((isDarkMode) => {
    if (isDarkMode !== undefined) darkMode.set(isDarkMode)
  })
}

/**
 * Subscribe to all stores that are cached in IndexedDB
 * @return a function that unsubscribes from all stores
 */
export function subscribeStoresFromIDB() {
  const unsubscribeFunctions = []
  unsubscribeFunctions.push(
    savedStories.subscribe((val) => {
      set("savedStories", val)
    })
  )
  unsubscribeFunctions.push(
    darkMode.subscribe((val) => {
      set("darkMode", val)
    })
  )
  return () => {
    unsubscribeFunctions.forEach((fn) => fn())
  }
}
