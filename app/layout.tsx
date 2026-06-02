import type { Metadata } from "next";
import { FloatingNav } from "@/components/layout/floating-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Helix · Clinician Console",
  description: "AI-assisted clinical workbench for predictive care teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning lets React tolerate the Soffi editor injecting
    // `data-soffi-id` / `data-soffi-stable-id` attributes before hydration.
    // Same pattern the Next.js docs recommend for theme libraries and browser
    // extensions that mutate the DOM ahead of React.
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-bg-canvas text-fg-primary font-sans antialiased"
        suppressHydrationWarning
      >
        <FloatingNav width="wide" offset="flush" surface="solid" />
        <div className="flex flex-col min-h-screen pt-24 pb-16">
          <main className="flex flex-col gap-12 px-4 sm:px-8 lg:px-12 mx-auto w-full max-w-[1280px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
