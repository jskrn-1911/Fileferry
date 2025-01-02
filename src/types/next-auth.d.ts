// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    isPremium?: boolean; // Add your custom property
  }

  interface Session {
    user: User;
  }
}
