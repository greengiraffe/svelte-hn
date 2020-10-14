import { writable, derived, get } from "svelte/store"
import StoryCache from "../helper/storyCache"
import { downloadBookmarks } from "./uiState"

// Holds all bookmarked stories
export const bookmarks = writable([])
export const bookmarkedStoryCount = derived(
  bookmarks,
  ($bookmarks) => $bookmarks.length
  )
  
  // Helper function to add a new bookmarked item
export function bookmark(item) {
  const updatedItem = {
    ...item,
    savedAt: Date.now(),
  }
  delete updatedItem.time_ago

  bookmarks.update((arr) => {
    return [updatedItem, ...arr]
  })

  if (get(downloadBookmarks)) {
    StoryCache.fetchAndCache(item.id)
  }
}

// Helper function to remove a bookmarked item
export function removeBookmark(item) {
  bookmarks.update((arr) => {
    return arr.filter((i) => i.id !== item.id)
  })

  StoryCache.remove(item.id)
}

// Helper function to update a bookmarked item
export function updateBookmark(updatedItem) {
  bookmarks.update((arr) => {
    return arr.map((i) => {
      if (i.id === updatedItem.id) {
        const newItem = {
          ...i,
          ...updatedItem,
        }
        return newItem
      }
      return i
    })
  })
}

export function checkIfBookmarked(itemId) {
  let id = itemId
  if (typeof itemId === "string") {
    id = Number.parseInt(itemId)
  }
  return get(bookmarks).some((story) => story.id === id)
}
