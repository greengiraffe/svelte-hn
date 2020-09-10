import { get } from "svelte/store"
import { theme } from "../store"

const itemKey = "theme"

/**
 * Sets the theme name as the body className
 * @param {string} theme The theme name to set
 */
function setBodyClassName(theme) {
  document.body.className = theme
}

/**
 * Initialize theme store from localStorage
 */
export function initTheme() {
  const currentTheme = localStorage.getItem(itemKey)
  if (currentTheme === null) {
    localStorage.setItem(itemKey, get(theme))
    setBodyClassName(get(theme))
  } else {
    theme.set(currentTheme)
    // NOTE: if the theme is already stored in localStorage,
    // the body className is set in index.html to prevent
    // visual glitches
  }
}

/**
 * Subscribe to theme store and update localStorage & body className
 * when the theme is changed
 * @returns a function to unsubscribe from store changes
 */
export function subscribeTheme() {
  return theme.subscribe((val) => {
    setBodyClassName(val)
    localStorage.setItem(itemKey, val)
  })
}

/**
 * Initialize theme store from localStorage, then subscribe
 * to changes made to the theme and update localStorage accordingly
 * @returns a function to unsubscribe from store changes
 */
export function initThemeAndSubscribe() {
  initTheme()
  return subscribeTheme()
}
