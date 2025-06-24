export interface Iuser {
  fristName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "AUPERADMIN";
}

export interface UserInstanceMethods {
  hashPassword(password: string): string;
}
