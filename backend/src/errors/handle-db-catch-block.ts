import { DatabaseError } from "pg";
import { ErrorPayload, ErrorTypes, InternalServerError } from ".";

export const handleDbCatchBlock = (error: unknown | DatabaseError | ErrorPayload | any): never => {
  if (error instanceof DatabaseError) {
    console.log("Database error ------------------ ", error);
    throw InternalServerError();
  } else throw error;
};
