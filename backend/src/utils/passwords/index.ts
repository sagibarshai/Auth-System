import bcrypt from "bcryptjs";

export const toHash = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const compereHash = (storedPassword: string, suppliedPassword: string): boolean => {
  const isEqual = bcrypt.compareSync(suppliedPassword, storedPassword);
  return isEqual;
};
