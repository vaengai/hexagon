// SignInPage.tsx
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] flex items-center justify-center px-4">
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
