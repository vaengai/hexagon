import {
  IconBell,
  IconHexagonLetterH,
  IconMenu2,
  IconX,
  IconSun,
  IconMoon,
  IconLayoutDashboard,
  IconChecklist,
  IconNotes,
  IconList,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  {
    key: "dashboard",
    to: "/UnderConstruction",
    label: "Dashboard",
    icon: <IconLayoutDashboard aria-hidden />,
  },
  {
    key: "habit",
    to: "/habit",
    label: "Habit",
    icon: <IconChecklist aria-hidden />,
  },
  {
    key: "journal",
    to: "/UnderConstruction",
    label: "Journal",
    icon: <IconNotes aria-hidden />,
  },
  {
    key: "todo",
    to: "/UnderConstruction",
    label: "To-do",
    icon: <IconList aria-hidden />,
  },
  {
    key: "notifications",
    to: "/UnderConstruction",
    label: "Notifications",
    icon: <IconBell aria-hidden />,
  },
] as const;

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleMobileMenu = () => {
    console.log("Toggle mobile menu clicked, current state:", isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    console.log("Close mobile menu called");
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when the mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-[60] bg-zinc-950 shadow-lg">
      <div className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eab676] rounded"
          onClick={closeMobileMenu}
        >
          <IconHexagonLetterH
            size={50}
            // color="#eab676"
            className="sm:w-[60px] sm:h-[60px] text-slate-500"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {navLinks.map(({ key, to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={key}
                to={to}
                aria-current={active ? "page" : undefined}
                className={`flex items-center text-white hover:text-[#eab676] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eab676] rounded ${
                  active ? "text-[#eab676]" : ""
                }`}
              >
                {/* Desktop: text only */}
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="text-white hover:text-[#eab676] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eab676] rounded"
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <IconSun size={22} /> : <IconMoon size={22} />}
          </button>

          {/* Show user in header only on large screens */}
          <span className="hidden lg:inline-flex">
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 sm:w-14 sm:h-14",
                    userButtonPopoverActionButton__signOut: "text-red-400",
                  },
                }}
              />
            ) : (
              <Link
                to="/sign-in"
                className="text-white hover:text-[#eab676] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eab676] rounded"
                onClick={closeMobileMenu}
              >
                Sign-in
              </Link>
            )}
          </span>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white hover:text-[#eab676] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eab676] rounded"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg- border-t border-slate-900"
          aria-label="Primary"
        >
          <nav className="flex flex-col py-4">
            {navLinks.map(({ key, to, label, icon }) => (
              <Link
                key={key}
                to={to}
                className="flex items-center px-6 py-3 text-white hover:text-[#eab676] hover:bg-slate-900/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eab676] rounded gap-3"
                onClick={closeMobileMenu}
              >
                {/* Mobile: icon + label */}
                <span className="inline-flex items-center">{icon}</span>
                <span>{label}</span>
              </Link>
            ))}

            {/* Account section (mobile only) */}
            <div className="mt-2 pt-2 border-t border-slate-900 px-6">
              {isSignedIn ? (
                <div className="flex items-center">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                        userButtonPopoverActionButton__signOut: "text-red-400",
                      },
                    }}
                  />
                  <span className="sr-only">Account</span>
                </div>
              ) : (
                <Link
                  to="/sign-in"
                  className="flex items-center py-3 text-white hover:text-[#eab676] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eab676] rounded"
                  onClick={closeMobileMenu}
                >
                  Sign-in
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
