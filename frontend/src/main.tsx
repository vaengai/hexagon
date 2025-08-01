import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {ClerkProvider} from '@clerk/clerk-react'
import {dark, shadcn} from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("PUBLISHABLE_KEY is missing");
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}
        appearance={{baseTheme: [dark, shadcn]}}>
            <App/>
        </ClerkProvider>
    </StrictMode>
);
