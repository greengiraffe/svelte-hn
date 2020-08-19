import { get, set } from "idb-keyval"
import { savedStories, darkMode, expandAllComments } from "../store"

const idbManagedStores = {
  savedStories,
  darkMode,
  expandAllComments,
}

/**
 * Retrieve values from IndexedDB and update the svelte
 * stores accordingly.
 */
export function initStoresFromIDB() {
  for (const [storeName, store] of Object.entries(idbManagedStores)) {
    get(storeName).then((val) => {
      if (val !== undefined) store.set(val)
    })
  }
}

/**
 * Subscribe to all stores that are cached in IndexedDB
 * @return a function that unsubscribes from all stores
 */
export function subscribeStoresFromIDB() {
  const unsubscribeFunctions = []
  for (const [storeName, store] of Object.entries(idbManagedStores)) {
    unsubscribeFunctions.push(
      store.subscribe((val) => {
        set(storeName, val)
      })
    )
  }
  return () => {
    unsubscribeFunctions.forEach((fn) => fn())
  }
}
