import { writable } from "svelte/store"

export const showSidebar = writable(false)
export const darkMode = writable(false)
export const currentStoryType = writable("")
