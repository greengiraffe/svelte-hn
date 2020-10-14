import { clear, del, set as idbSet, get as idbGet, Store } from "idb-keyval"
import API from "../api"

const cache = new Store("story-cache", "stories")

/**
 * Update a value for a given key using an update
 * function.
 * 
 * @param {*} key The item key
 * @param {*} updater Function of type (oldValue) => newValue
 * @param {*} store The store
 */
function idbUpdate(key, updater, store) {
  return store._withIDBStore('readwrite', store => {
    const req = store.get(key);
    req.onsuccess = () => {
      store.put(updater(req.result), key);
    };
  });
}

function fetchAndCache(itemId) {
  return API.item(itemId).then(item => {
    idbSet(item.id, item, cache)
  }).catch(() => {
    // TODO properly handle download error
    console.log("Download failed")
  })
}

function fetchAndUpdate(itemId) {
  return API.item(itemId).then(item => {
    idbUpdate(item.id, oldItem => item, cache)
  }).catch(() => {
    // TODO properly handle download error
    console.log("Download failed")
  })
}

function set(item) {
  return idbSet(item.id, item, cache)
}

function remove(itemId) {
  return del(Number.parseInt(itemId), cache)
}

function clearAll() {
  return clear(cache)
}

function get(itemId) {
  return idbGet(Number.parseInt(itemId), cache)
}

const StoryCache = {
  fetchAndCache,
  get,
  set,
  remove,
  clearAll,
  fetchAndUpdate
}

export default StoryCache