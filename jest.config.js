module.exports = {
  transform: {
    "^.+\\.svelte$": "svelte-jester",
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "svelte"],
}
