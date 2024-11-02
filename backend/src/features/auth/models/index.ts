import { pgClient } from "../../../database/init";

export interface StoredUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  registerAt: Date;
  updateAt: Date;
  last_login: Date;
  isVerified: boolean;
  phoneNumber?: string;
}

export interface NewUserPayload extends Omit<StoredUser, "registerAt" | "updateAt" | "isVerified" | "last_login"> {}

export interface SafeUser extends Omit<StoredUser, "password"> {}

export const InsertUserModel = async (user: NewUserPayload): Promise<SafeUser | undefined> => {
  try {
    const response = await pgClient.query(
      `INSERT INTO Users 
        (first_name, last_name, email, password, phone_number) 
        VALUES
         ($1, $2, $3, $4, $5)
         RETURNING *
         `,
      [user.firstName, user.lastName, user.email, user.password, user.phoneNumber]
    );
    if (!response.rows.length) return;
    const safeUser = response.rows[0];
    delete safeUser.password;

    return safeUser as SafeUser;
  } catch (err) {
    console.log(`Error ${err} cannot insert ${JSON.stringify(user)} `);
  }
};

export const SelectUserModel = async (identifier: string | number) => {
  /** if identifier is number field = id, else field = email*/
  const field = typeof identifier === "number" ? "id" : "email";

  try {
    const response = await pgClient.query(
      `SELECT * FROM Users  
          WHERE ${field}=$1`,
      [identifier]
    );
    if (!response.rows.length) return;
    const safeUser = response.rows[0];
    delete safeUser.password;

    return safeUser as SafeUser;
  } catch (err) {
    console.log(`Error ${err} cannot select user with identifier of ${JSON.stringify(identifier)} `);
  }
};

export const SelectUnsafeUserModel = async (identifier: string | number): Promise<StoredUser | undefined> => {
  /** if identifier is number field = id, else field = email*/
  const field = typeof identifier === "number" ? "id" : "email";

  try {
    const response = await pgClient.query(
      `SELECT * FROM Users  
          WHERE ${field}=$1`,
      [identifier]
    );
    if (!response.rows.length) return;
    return response.rows[0] as StoredUser;
  } catch (err) {
    console.log(`Error ${err} cannot select user with identifier of ${JSON.stringify(identifier)} `);
  }
};

export const UpdateLastLoginUserModel = async (identifier: string | number): Promise<SafeUser | undefined> => {
  const field = typeof identifier === "number" ? "id" : "email";

  try {
    const response = await pgClient.query(
      `UPDATE Users  
       SET last_login = $1
       WHERE ${field} = $2
       RETURNING *;`,
      [new Date(), identifier]
    );

    if (!response.rows.length) return;
    const safeUser = response.rows[0];
    delete safeUser.password;
    return safeUser as SafeUser;
  } catch (err) {
    console.log(`Error ${err} cannot update user with identifier of ${JSON.stringify(identifier)} `);
  }
};
