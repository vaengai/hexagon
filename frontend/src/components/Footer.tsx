import { Link } from "react-router-dom";
// import { useEffect } from "react";
const footerLinks = [{ to: "/about", label: "About" }];

export default function Footer() {
  // const [email, setEmail] = useState("");
  // const [submitted, setSubmitted] = useState(false);

  // const handleNewsletterSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  //   setEmail("");
  // };

  // useEffect(() => {
  //   if (submitted) {
  //     const timer = setTimeout(() => setSubmitted(false), 2000);
  //     return () => clearTimeout(timer);
  //   }
  // });

  return (
    <footer className="w-full bg-neutral-900/50 text-white py-4 px-8 mt-auto justify-between z-50">
      <div className="flex flex-wrap justify-center items-center gap-10">
        {footerLinks.map(({ to, label }) => (
          <Link key={to} to={to} className="flex items-center">
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
