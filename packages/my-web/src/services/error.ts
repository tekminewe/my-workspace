type ErrorLevel = "user" | "system";

export const ERROR_CODE = {
  APPROVAL_NOT_FOUND: "1",
  APPROVAL_ALREADY_COMPLETED: "2",
};

export abstract class HandledError extends Error {
  constructor(message: string, public level: ErrorLevel = "system") {
    super(message);
  }
}

export class UnauthenticatedError extends HandledError {
  constructor() {
    super(`You must be authenticated to perform this action`, "system");
  }
}

export class ValidationError extends HandledError {
  constructor(message: string) {
    super(message, "user");
  }
}

export class SystemError extends HandledError {
  constructor(message: string) {
    super(message, "system");
  }
}

export const logError = (error: Error) => {
  // Log error if it's a system error or not a handled error
  if (
    (error instanceof HandledError && error.level === "system") ||
    !(error instanceof HandledError)
  ) {
    // TODO: Log error to remote service
    console.error(error);
  }
};
