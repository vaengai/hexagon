// SignInPage.tsx
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        appearance={{
          elements: {
            footer: { display: "none" },
          },
        }}
        localization={{
          signIn: {
            title: "Sign in to Hexagon",
          },
        }}
      />
    </div>
  );
}
