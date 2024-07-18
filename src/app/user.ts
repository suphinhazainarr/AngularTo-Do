// user.model.ts
export interface User {
    id?: string; // Optional, can be auto-generated
    username: string;
    password: string; // Consider hashing this in a real application
  }
  