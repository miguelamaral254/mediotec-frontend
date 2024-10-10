import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/navbar/Navbar'; 
import Header from './components/Header'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mediotec System",
  description: "Mediotec dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col w-full h-screen antialiased`}>
          <Navbar />
          <div className="flex flex-col w-full justify-between  flex-grow">
            <Header />
            <div className="flex-grow">
              {children}
            </div>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
