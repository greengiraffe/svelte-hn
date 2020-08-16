import { get } from "idb-keyval"
import { writable, derived } from "svelte/store"

// Random stores
export const showSidebar = writable(false)
export const darkMode = writable(false)
export const currentStoryType = writable("")

// Saved stories
export const savedStories = writable([])
export const savedStoryCount = derived(
  savedStories,
  ($savedStories) => $savedStories.length
)

// Saved stories -- helper functions
export function saveStory(item) {
  const updatedItem = {
    ...item,
    savedAt: Date.now(),
  }
  savedStories.update((arr) => {
    return [updatedItem, ...arr]
  })
}

export function removeSavedStory(item) {
  savedStories.update((arr) => {
    return arr.filter((i) => i.id !== item.id)
  })
}
