export enum ErrorTypes {
  BAD_REQUEST_ERROR = "BAD_REQUEST_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
  UNAUTHORIZED_ERROR = "UNAUTHORIZED_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}
export type CustomErrorMessage = {
  message: string;
  field?: string;
}[];

export interface ErrorPayload {
  statusCode: number;
  type: ErrorTypes;
  errors: CustomErrorMessage;
}

export const BadRequestError = (payload: CustomErrorMessage): ErrorPayload => {
  return {
    errors: payload,
    statusCode: 400,
    type: ErrorTypes.BAD_REQUEST_ERROR,
  };
};

export const NotFoundError = (payload?: CustomErrorMessage): ErrorPayload => {
  return {
    errors: [{ message: "Route not found" }],
    statusCode: 404,
    type: ErrorTypes.NOT_FOUND_ERROR,
  };
};

export const InternalServerError = (payload?: CustomErrorMessage): ErrorPayload => {
  return {
    errors: [{ message: "Internal Server Error" }],
    statusCode: 500,
    type: ErrorTypes.INTERNAL_SERVER_ERROR,
  };
};
export const UnauthorizedError = (payload?: CustomErrorMessage): ErrorPayload => {
  return {
    errors: [{ message: "Unauthorized" }],
    statusCode: 401,
    type: ErrorTypes.UNAUTHORIZED_ERROR,
  };
};
