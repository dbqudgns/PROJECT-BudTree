import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RecoilProvider from "./config/RecoilProvider";
import ReactQueryProvider from "./config/ReactQueryProvider";
import BottomTab from "./components/BottomTab";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "버드 나무",
  description: "당신 곁에 있는 버드 나무",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <RecoilProvider>
        <html lang="en">
          <head>
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
          </head>
          <body className="frame">
            <p></p>
            {children}
            <BottomTab />
          </body>
        </html>
      </RecoilProvider>
    </ReactQueryProvider>
  );
}
