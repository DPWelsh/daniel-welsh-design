import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "./posthog-provider";
import { CapturePopupMount } from "@/components/capture-popup-mount";

export const metadata: Metadata = {
  metadataBase: new URL("https://danielwelsh.design"),
  title: {
    default: "Daniel Welsh — I build things, and I explain how they work",
    template: "%s — Daniel Welsh",
  },
  description:
    "Field guides and build sheets for people making software with AI. Written by someone running a business on it, not demoing it.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider />
        {children}
        <CapturePopupMount />
      </body>
    </html>
  );
}
