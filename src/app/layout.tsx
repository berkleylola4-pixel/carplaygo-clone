import { Metadata } from "next";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "CarplayGO - CarPlay et Android Auto Sans Fil", template: "%s | CarplayGO" },
  description: "Transformez votre voiture en voiture connectée avec CarplayGO. Adaptateur sans fil premium pour Apple CarPlay et Android Auto. Livraison gratuite et garantie 2 ans.",
  keywords: ["carplay", "android auto", "adaptateur sans fil", "voiture connectée", "carplay sans fil"],
  metadataBase: new URL("https://carplaygo.vercel.app"),
  openGraph: {
    title: "CarplayGO - CarPlay et Android Auto Sans Fil",
    description: "Transformez votre voiture en voiture connectée avec CarplayGO. Adaptateur sans fil premium. Livraison gratuite.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarplayGO - CarPlay et Android Auto Sans Fil",
    description: "Transformez votre voiture en voiture connectée avec CarplayGO.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
