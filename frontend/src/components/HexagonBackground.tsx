import TextType from "./animations/TextType/TextType";
import DotGrid from "./backgrounds/DotGrid/DotGrid";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// import TextType from "./animations/TextType/TextType";
// import DarkVeil from "./backgrounds/DarkVeil/DarkVeil";

// import { ReactNode } from "react";

export default function HexagonBackground() {
  const navigate = useNavigate();

  // const [sentenceDone, setSentenceDone] = useState(false);

  // const handleSentenceComplete = (_sentence: string, _index: number) => {
  //   setSentenceDone(true);
  // };
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Background */}
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
      {/* Foreground (text) */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
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
            // marginTop: "3rem",
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
              marginTop: "5.5rem",
              fontSize: "1.5rem",
              color: "#fff",
              fontWeight: 400,
              maxWidth: "700px",
            }}
          >
            Stay consistent, track your progress, and become the best version of
            yourself!
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => navigate("/habit")}
              className="rounded-lg shadow-2xs hover:shadow-lg cursor-pointer p-4 flex flex-col items-center bg-sky-800 border-sky-600 shadow-sky-200 border-2"
              type="button"
            >
              <p className="text-lg font-extrabold text-center">Get Started</p>
            </button>
          </div>
        </div>

        {/* Routed children/pages */}
        {/* <div style={{ width: "100%", margin: "0 auto" }}>{children}</div> */}
      </div>
    </div>
  );
}
