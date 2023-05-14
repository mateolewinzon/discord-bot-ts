class BaseError extends Error {
  public readonly title;
  public readonly isUnexpected;

  constructor(description: string, title: string, isUnexpected: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.title = title;
    this.isUnexpected = isUnexpected;

    Error.captureStackTrace(this);
  }
}

export default BaseError;
