export interface User {
  _id?: number;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  accessToken: string;
}
