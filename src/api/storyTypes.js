/**
 * Maps the name used in the app (keys) to the name used
 * by the API (values)
 * @type Object
 */
export const storyTypeMap = {
  top: "news",
  new: "newest",
  best: "best",
  ask: "ask",
  show: "show",
  jobs: "jobs",
}

export function validStoryType(storyType) {
  return Object.keys(storyTypeMap).includes(storyType)
}
