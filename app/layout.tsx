import type { Metadata } from "next";
import "../styles/globals.scss";
import { fonts } from "@/data/fonts.data";
import { Navbar, Footer } from "@/components";
import { ReactLenis } from "lenis/react";

export const metadata: Metadata = {
  title: "Ethereal Lab",
  description: "Where Imagination Meets Innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body className={`${fonts} antialiased`}>
          <main id="body-content">
            <Navbar />

            {children}
            <Footer />
          </main>
        </body>
      </ReactLenis>
    </html>
  );
}
