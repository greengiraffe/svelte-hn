import { writable, derived } from "svelte/store"

// Random stores
export const showSidebar = writable(false)
export const darkMode = writable(false)
export const currentStoryType = writable("")

export const selectedStory = writable({})

// Required to cache multiple pages of newsItems
export const newsItems = writable([])

export const expandAllComments = writable(false)

// Saved stories
export const bookmarks = writable([])
export const bookmarkedStoryCount = derived(
  bookmarks,
  ($bookmarks) => $bookmarks.length
)

// Saved stories -- helper functions
export function bookmark(item) {
  const updatedItem = {
    ...item,
    savedAt: Date.now(),
  }
  delete updatedItem.time_ago

  bookmarks.update((arr) => {
    return [updatedItem, ...arr]
  })
}

export function removeBookmark(item) {
  bookmarks.update((arr) => {
    return arr.filter((i) => i.id !== item.id)
  })
}

export function updateBookmark(updatedItem) {
  bookmarks.update((arr) => {
    return arr.map((i) => {
      if (i.id === updatedItem.id) {
        const newItem = {
          ...i,
          ...updatedItem,
        }
        console.log(newItem)
        return newItem
      }
      return i
    })
  })
}
