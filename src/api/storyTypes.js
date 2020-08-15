const storyTypes = ["new", "top", "best", "ask", "show", "jobs"]

export const storyTypeMap = {
  top: "news",
  new: "newest",
  best: "best",
  ask: "ask",
  show: "show",
  jobs: "jobs",
}

export default storyTypes

export function validStoryType(storyType) {
  return storyTypes.includes(storyType)
}
