//This will handle all type of response all over the project
class ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
  link?: Object;
  count?: number;

  constructor(
    statusCode: number,
    data: any,
    message: string = "Success",
    link?: Object,
    count?: number
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.link = link;
    this.count = count;
  }
}

//This will handle all type of errors all over the project
class ApiError extends Error {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
  errors: Array<object>;

  constructor(
    statusCode: number,
    message: string = "Something went wrong", // Ensure a default message is provided
    errors: Array<object> = [],
    stack: string = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.message = message; // Set the message property
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiResponse, ApiError };
