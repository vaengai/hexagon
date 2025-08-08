import TextType from "./animations/TextType/TextType";
import DotGrid from "./backgrounds/DotGrid/DotGrid";
// import React, { useState } from "react";
// import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
//import { useUser } from "@clerk/clerk-react";
//import { useClearSession } from "../hooks/useClearSession";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import TextType from "./animations/TextType/TextType";
// import DarkVeil from "./backgrounds/DarkVeil/DarkVeil";

// import { ReactNode } from "react";

export default function HexagonHome() {
  const navigate = useNavigate();
  //const { isSignedIn } = useUser();
  //const { clearSessionAndReload } = useClearSession();

  // const [sentenceDone, setSentenceDone] = useState(false);

  // const handleSentenceComplete = (_sentence: string, _index: number) => {
  //   setSentenceDone(true);
  // };
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
          pointerEvents: "none", // keep dots purely decorative and behind
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

      {/* <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      > */}
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
          zIndex: 50,
          padding: "1rem", // Add padding for mobile
          position: "relative", // ensure z-index takes effect above background
        }}
      >
        <TextType
          text={[
            "Build Better Habits. Your journey to discipline starts here.",
          ]}
          typingSpeed={100}
          pauseDuration={1000}
          showCursor={false}
          loop={false}
          cursorCharacter="_"
          textColors={["#eab676"]}
          startOnVisible={true}
          // onSentenceComplete={handleSentenceComplete}
        />
        <div
          style={{
            marginTop: "2.5rem",
            fontSize: "clamp(1rem, 3vw, 1.5rem)", // Responsive subtitle
            color: "gray",
            fontWeight: 400,
            maxWidth: "700px",
            zIndex: 50,
            lineHeight: "1.6", // Better line height for mobile
          }}
        >
          Stay consistent, track your progress, and become the best version of
          yourself!
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center mt-10 z-10 gap-4 w-full max-w-sm">
          <button
            onClick={() => navigate("/habit")}
            className="w-full rounded-lg shadow-2xs hover:shadow-lg cursor-pointer p-2 flex flex-col items-center bg-sky-800 border-sky-600 shadow-sky-200 border-0 min-w-[140px]"
            type="button"
          >
            <p className="text-lg font-extrabold text-center">Get Started</p>
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
