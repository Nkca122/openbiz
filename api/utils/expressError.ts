class ExpressError extends Error {
  status: number;
  display: string;

  constructor(status: number = 500, display: string = "Internal Server Error") {
    super(display);
    this.status = status;
    this.display = display;
    Object.setPrototypeOf(this, ExpressError.prototype);
  }
}


module.exports = ExpressError;
