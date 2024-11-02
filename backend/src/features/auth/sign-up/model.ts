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

export const signUpModel = async (user: NewUserPayload): Promise<SafeUser | undefined> => {
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
