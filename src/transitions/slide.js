import { cubicOut } from "svelte/easing"

/**
 * Slide an element into the viewport from the left edge.
 * If the vertical=true, slide from the top edge.
 *
 * @param {HTMLElement} node The node to animate
 * @param {object} options Transition options
 */
export default function slide(
  node,
  { delay = 0, duration = 400, easing = cubicOut, vertical = false }
) {
  const style = getComputedStyle(node)
  const transform = style.transform === "none" ? "" : style.transform
  return {
    delay,
    duration,
    easing,
    css: (t, u) => {
      if (vertical) {
        return `transform: ${transform} translate3d(0, ${-u * 100}%, 0)`
      } else {
        return `transform: ${transform} translate3d(${-u * 100}%, 0, 0)`
      }
    },
  }
}
