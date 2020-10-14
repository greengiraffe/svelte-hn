import { writable } from "svelte/store"

// Show/hide the sidebar
export const sidebarVisible = writable(false)
export function hideSidebar() {
  sidebarVisible.set(false)
}
export function showSidebar() {
  sidebarVisible.set(true)
}
export function toggleSidebar() {
  sidebarVisible.update((v) => !v)
}

// Toggles if comment hierarchies are automatically expanded
export const expandAllComments = writable(false)

// Toggles auto-downloading of bookmarked stories
export const downloadBookmarks = writable(false)

// Set the color theme (dark or light)
export const theme = writable("light")

// Cache vertical scroll positions to be able to restore them
export const scrollY = writable(0)
export const lastScrollY = writable(0)
export const lastFocused = writable(undefined)

// Keeps track of the currently selected story type (top, ask, show etc.)
export const currentStoryType = writable("")

// This serves as a precache. Example: when a story item is selected on
// the NewsList page, selectedStory is set to be that item. When the ItemPage
// renders, it now uses the data from selectedStory to already show some
// information on the page, e.g. the story title, author, date etc., while
// it loads the full story in the background.
export const selectedStory = writable({})

// Enables caching of multiple pages of newsItems
export const newsItems = writable([])