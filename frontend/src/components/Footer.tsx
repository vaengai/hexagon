import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const footerLinks = [{ to: "/about", label: "About" }];

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
      const timer = setTimeout(() => setSubmitted(false), 2000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <footer className="w-full bg-neutral-900/50 text-white py-4 px-8 mt-auto justify-between z-50">
      <div className="flex flex-wrap justify-center items-center gap-10">
        {footerLinks.map(({ to, label }) => (
          <Link key={to} to={to} className="flex items-center">
            {label}
          </Link>
        ))}
        <div className="flex items-center ml-auto gap-2">
          <form onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email for Newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-sm px-3 py-2 rounded-l-lg border focus:outline-1"
            />
            <button
              type="submit"
              className="bg-[#eab676] text-black px-4 py-2 rounded-r-lg border"
            >
              Subscribe
            </button>
          </form>
          {submitted && <span className="text-2xl">🎉</span>}
        </div>
      </div>
    </footer>
  );
}
