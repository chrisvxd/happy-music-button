import "./styles.css";
import type { Metadata } from "next";
import { fontVariables } from "../lib/fonts";

export const metadata: Metadata = {
  // Absolute base for og:image URLs; set SITE_URL in production
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: "Basis Set",
  icons: { icon: "/assets/favicon-32.svg", apple: "/assets/favicon-256.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fontVariables}>{children}</body>
    </html>
  );
}
