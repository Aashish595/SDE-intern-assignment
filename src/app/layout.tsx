import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "ApniSec | Cybersecurity Platform",
  description:
    "ApniSec provides enterprise-grade cybersecurity services including VAPT, Red Teaming, and Cloud Security.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-200">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
