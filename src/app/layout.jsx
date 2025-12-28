import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";
import NextAuthProvider from "@/provider/NextAuthProvider";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
  subsets: ["latin"],
});

export const fontBangla = localFont({
  src: "../fonts/mayaboti-normal.ttf",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Providers ALWAYS go inside body */}
        <NextAuthProvider>
          <header className="py-2 md:w-11/12 lg:w-8/12 mx-auto">
            <Navbar />
          </header>

          <main className="py-2 md:w-11/12 lg:w-8/12 mx-auto min-h-[calc(100vh-302px)]">
            {children}
          </main>

          <footer>
            <Footer />
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
