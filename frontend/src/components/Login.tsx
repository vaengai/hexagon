// SignInPage.tsx
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center">
      <SignIn
        appearance={{
          elements: {
            footer: { display: "none" },
          },
        }}
      />
    </div>
  );
}
