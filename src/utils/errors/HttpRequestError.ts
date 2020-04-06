export class HttpRequestError extends Error {
  constructor(public status: number, public message: string) {
    super()

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpRequestError.prototype)
  }

  sayHello() {
    return 'hello ' + this.message
  }
}
