import { Inter, Shadows_Into_Light, Instrument_Serif } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const hand = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});

export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Applied to <body> and to the Puck root so fonts also resolve inside the editor iframe
export const fontVariables = `${inter.variable} ${hand.variable} ${serif.variable} bs-fonts`;
