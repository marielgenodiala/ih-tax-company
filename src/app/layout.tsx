import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "I H Professionals & Co. Pty Ltd | Tax Agent",
  description:
    "Tax Return, I H Professionals & Co. Pty Ltd, We have more than 15 years experience in accounting, tax and business advisory fields with a great range of business, individuals, SMSFs & Trusts. Located in the Sydney CBD and various locations across Sydney. Please feel free to make an appointment with us to target your business and personal needs.",
  icons: {
    icon: "/images/brandlogo-new.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
