export interface Iuser {
  fristName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
}
