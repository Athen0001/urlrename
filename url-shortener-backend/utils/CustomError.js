class CustomError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.statusCode = statusCode;
    this.details - details;
  }
}

export default CustomError;

/* despite the functional approach, this class is encapsulated and treat with the main javascript error class, 
so i will maintain as a class. */
