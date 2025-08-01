import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconThumbUp } from "@tabler/icons-react";

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
  { to: "/git", label: "Git" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 10000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <footer className="w-full bg-neutral-900 text-white py-6 px-8 mt-auto">
      <div className="flex flex-wrap justify-center items-center gap-20">
        {footerLinks.map((link, i) =>
          link.label ? (
            <Link key={i} to={link.to} className="hover:underline">
              {link.label}
            </Link>
          ) : null
        )}
        <div className="flex items-center ml-auto gap-2">
          <form onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email for Newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-sm px-3 py-2 rounded-l-lg border"
            />
            <button
              type="submit"
              className="bg-[#eab676] text-black px-4 py-2 rounded-r-lg border"
            >
              Subscribe
            </button>
          </form>
          {submitted && <IconThumbUp className="text-sky-600" />}
        </div>
      </div>
    </footer>
  );
}
