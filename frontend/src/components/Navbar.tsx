import { IconHexagonLetterHFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <header className="z-50 flex justify-between items-center py-6 px-8 md:px-8 relative">
      <Link to="/" className="flex items-center gap-2">
        <IconHexagonLetterHFilled size={60} color="#eab676" />
      </Link>
      <div className="flex items-center gap-6 ml-auto ">
        {isSignedIn ? (
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-14 h-14",
                userButtonPopoverCard: "font-mono",
                userButtonPopoverActionButton__signOut: "text-red-400",
              },
            }}
          />
        ) : (
          <Link to="/sign-in">Sign-in</Link>
        )}
      </div>
    </header>
  );
}
