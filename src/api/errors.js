export class InvalidStoryTypeError extends Error {
  constructor(message) {
    super(message)
    this.name = "InvalidStoryTypeError"
  }
}
