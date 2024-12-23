import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";

// stylesheets
import "@/styles/globals.css";
import "@/styles/index.css";
import ReduxProvider from "@/redux/ReduxProvider";

const custom_font = Roboto_Condensed({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "MERN Auth",
  description: "front-end template made by mattiach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-zinc-900 text-white ${custom_font.className}`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
