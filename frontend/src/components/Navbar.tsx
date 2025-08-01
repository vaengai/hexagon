import { IconBell, IconHexagonLetterH } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Icon } from "lucide-react";

const navLinks = [
  { to: "/Dashboard", label: "Dashboard" },
  { to: "/Habit", label: "Habit" },
  { to: "/Journal", label: "Journal" },
  { to: "/Todo", label: "Todo" },
  { to: "/Notification", label: <IconBell /> },
];
export default function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <header className="z-50 flex justify-between items-center py-6 px-8 md:px-8 relative">
      <Link to="/" className="flex items-center gap-2">
        <IconHexagonLetterH size={60} color="#eab676" />
      </Link>
      <div className="flex items-center gap-10 ml-auto ">
        {navLinks.map(({ to, label }) => (
          <Link key={to} to={to} className="flex items-center">
            {label}
          </Link>
        ))}

        {isSignedIn ? (
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-14 h-14",
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
