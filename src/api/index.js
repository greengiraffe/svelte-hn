// import { news, item } from "./mockApiResponse
import { validStoryType, storyTypeMap } from "./storyTypes"
import { InvalidStoryTypeError } from "./errors"

const BASE_URL = __ENV_VARS__.API_URL

const API = {
  /**
   * Fetches a list of story items for a given page.
   * 
   * @param {string} storyType A valid story type (see api/storyTypes.js)
   * @param {number} page The page number to fetch
   */
  async stories(storyType, page = 1) {
    if (!validStoryType(storyType)) {
      return Promise.reject(new InvalidStoryTypeError(storyType))
    } else {
      const res = await fetch(
        `${BASE_URL + storyTypeMap[storyType]}?page=${page}`
      )
      return await res.json()
    }
  },

  /**
   * Fetch a story item
   * 
   * @param {number} id The story ID
   */
  async item(id) {
    const res = await fetch(`${BASE_URL}item/${id}`)
    return await res.json()
  },

  /**
   * Fetch a user object
   * 
   * @param {number} id The user ID
   */
  async user(id) {
    const res = await fetch(`${BASE_URL}user/${id}`)
    return await res.json()
  },
}

export default API
