import { CustomError } from "./customError";

export class DatabaseValidationError extends CustomError {
	reason = "Database connection error";
	statusCode = 500;
	constructor() {
		super("Error connecting to DB");
		Object.setPrototypeOf(this, DatabaseValidationError.prototype);
	}

	serializeErrors() {
		return [{ message: this.reason }];
	}
}
