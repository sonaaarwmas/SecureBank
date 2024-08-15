import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import Footer from "@/components/footer";
import { AuthProvider } from "../../context/AuthContext";

export const metadata: Metadata = {
  title: "SecureBank",
  description:
    "SecureBank is an open source project in .NET core with some security flaws, its purpose is to learn how to write good code from the bad practices found during penetration testing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
