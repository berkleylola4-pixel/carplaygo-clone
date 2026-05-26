"use client";

import Link from "next/link";
import { useSiteConfig } from "@/lib/config";
import { Globe, MessageCircle, Share2, Mail } from "lucide-react";

const footerLinks = {
  produit: [
    { label: "Produit", href: "/product" },
    { label: "Caracteristiques", href: "/product" },
    { label: "Avis clients", href: "/product" },
  ],
  entreprise: [
    { label: "A propos", href: "/about" },
    { label: "Support", href: "/support" },
    { label: "Livraison", href: "/legal/shipping" },
  ],
  legal: [
    { label: "Conditions generales", href: "/legal/terms" },
    { label: "Politique de confidentialite", href: "/legal/privacy" },
    { label: "Mentions legales", href: "/legal/terms" },
  ],
};

export default function Footer() {
  const config = useSiteConfig();

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-xl tracking-tight">{config.brandName}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              L'adaptateur sans fil premium pour Apple CarPlay et Android Auto. Transformez votre conduite.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Globe, href: "#" },
                { Icon: MessageCircle, href: "#" },
                { Icon: Share2, href: "#" },
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {[
            { title: "Produit", items: footerLinks.produit },
            { title: "Entreprise", items: footerLinks.entreprise },
            { title: "Legal", items: footerLinks.legal },
          ].map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {config.brandName}. Tous droits reserves.</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Mail className="w-4 h-4" />
            <span>contact@carplaygo.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
