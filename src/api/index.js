// import { news, item } from "./mockApiResponse"

const BASE_URL = process.env.API_URL

const API = {
  async news(page = 1) {
    const res = await fetch(`${BASE_URL}news?page=${page}`)
    return await res.json()
    // return news.JSON
  },
  async item(id) {
    const res = await fetch(`${BASE_URL}item/${id}`)
    return await res.json()
  },
  async user(id) {
    const res = await fetch(`${BASE_URL}user/${id}`)
    return await res.json()
  },
}

export default API
