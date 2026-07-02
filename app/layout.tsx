import type { Metadata } from "next";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import PostHogInit from "@/components/PostHogInit";

export const metadata: Metadata = {
  title: "Unlock Your Smart Savings Plan | Galloway Roofing",
  description:
    "Your personalized Smart Savings Plan is ready. Enter your address to unlock the monthly cost and savings on every upgrade your home is matched to.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PostHogInit />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
