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
          width: "85%",
          margin: "0 auto",
          fontSize: "4rem",
          fontWeight: "bold",
          fontFamily: "monospace",
          textAlign: "center",
          flexDirection: "column",
          marginTop: "10rem",
          zIndex: 7,
        }}
      >
        <TextType
          text={["🚧 🚧 🚧 Under Construction 🚧 🚧 🚧"]}
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
            marginTop: "4.5rem",
            fontSize: "1.5rem",
            // color: "gray",
            fontWeight: 400,
            maxWidth: "700px",
            zIndex: 8,
          }}
        >
          Coming Soon. Stay tuned!
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 mt-24">
            <form onSubmit={handleNewsletterSubmit} className="flex z-50">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-90 px-2 py-2 text-sm rounded-l-sm border focus:outline-1 bg-neutral-950"
              />
              <button
                type="submit"
                className="bg-sky-700 text-black px-3 py-1 text-sm rounded-r-sm border"
              >
                Get Notified
              </button>
            </form>

            {submitted && <span className="text-lg ml-2">🎉</span>}
          </div>
          <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
            Sign up now to get early notification about our launch
          </div>
        </div>
      </div>
    </>
  );
}
