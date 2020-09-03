import { writable, derived } from "svelte/store"

export const sidebarVisible = writable(false)
export function hideSidebar() {
  sidebarVisible.set(false)
}
export function showSidebar() {
  sidebarVisible.set(true)
}
export function toggleSidebar() {
  sidebarVisible.update(v => !v)
}

export const darkMode = writable(false)
export const currentStoryType = writable("")
export const scrollY = writable(0)
export const lastScrollY = writable(0)
export const lastFocused = writable(undefined)

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
        return newItem
      }
      return i
    })
  })
}
