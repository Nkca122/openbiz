class ExpressError extends Error {
  constructor(status, display) {
    super();
    this.status = status;
    this.display = display;
  }
}

module.exports = ExpressError;
