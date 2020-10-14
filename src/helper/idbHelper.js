import { get, set } from "idb-keyval"
import { bookmarks, expandAllComments, downloadBookmarks } from "../store"

const idbManagedStores = {
  bookmarks,
  expandAllComments,
  downloadBookmarks
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

/**
 * Retrieve values from IndexedDB and update the svelte
 * stores accordingly. Then subscribe to the stores to
 * update IndexedDB if a store changes.
 * @returns a function to unsubscribe from all stores
 */
export function initStoresFromIDBAndSubscribe() {
  initStoresFromIDB()
  return subscribeStoresFromIDB()
}