// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    isPremium?: boolean; 
  }

  interface Session {
    user: User;
  }
}
