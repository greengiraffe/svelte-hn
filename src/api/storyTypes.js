const storyTypes = ["news", "top", "best", "ask", "show", "jobs"]

export default storyTypes

export function validStoryType(storyType) {
  return storyTypes.includes(storyType)
}
