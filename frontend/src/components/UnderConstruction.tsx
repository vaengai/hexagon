import TextType from "./animations/TextType/TextType";
import DotGrid from "./backgrounds/DotGrid/DotGrid";
import { useEffect, useState } from "react";

export default function UnderConstruction() {
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
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <DotGrid
          dotSize={2}
          gap={25}
          baseColor="#154c79"
          activeColor="#eab676"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          margin: "0 auto",
          fontSize: "clamp(2rem, 5vw, 4rem)", // Responsive font size
          fontWeight: "bold",
          fontFamily: "monospace",
          textAlign: "center",
          flexDirection: "column",
          marginTop: "clamp(5rem, 15vh, 10rem)", // Responsive top margin
          zIndex: 50, // raised above background dots
          padding: "1rem", // Add padding for mobile
          position: "relative",
        }}
      >
        <TextType
          text={["🚧 Under Construction 🚧"]}
          typingSpeed={100}
          pauseDuration={1000}
          showCursor={false}
          loop={false}
          cursorCharacter="_"
          textColors={["#eab676"]}
          startOnVisible={true}
        />
        <div
          style={{
            marginTop: "2.5rem",
            fontSize: "clamp(1rem, 3vw, 1.5rem)", // Responsive subtitle
            fontWeight: 400,
            maxWidth: "700px",
            zIndex: 60, // ensure above background
            lineHeight: "1.6", // Better line height for mobile
            position: "relative",
          }}
        >
          Coming Soon. Stay tuned!
        </div>
        <div
          className="w-full max-w-md mt-8"
          style={{ position: "relative", zIndex: 60 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-sm"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2 text-sm rounded-l-lg border focus:outline-1 bg-neutral-950 text-white"
              />
              <button
                type="submit"
                className="bg-[#eab676] text-black px-4 py-2 text-sm rounded-r-lg border hover:bg-[#d4a563] transition-colors"
              >
                Subscribe
              </button>
            </form>
            {submitted && <span className="text-lg ml-2">👍🏻</span>}
          </div>
        </div>
      </div>
    </>
  );
}
