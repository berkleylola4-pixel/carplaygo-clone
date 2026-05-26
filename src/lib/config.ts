"use client";

import { useState, useEffect } from "react";

const CONFIG_KEY = "carplaygo-admin-config-v3";
const PW_HASH_KEY = "carplaygo-admin-password-hash";

export interface SiteConfig {
  brandName: string;
  heroImage: string;
  productImages: string[];
  productPrice: number;
  productComparePrice: number;
  accentColor: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  heroHeadline: string;
  heroSubline: string;
  ctaText: string;
  guaranteeText: string;
  shippingText: string;
  refundText: string;
}

const defaultConfig: SiteConfig = {
  brandName: "CarplayGO",
  heroImage:
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop",
  productImages: [
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492144534657-ae2f7a8f6f6d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=800&auto=format&fit=crop",
  ],
  productPrice: 89.99,
  productComparePrice: 129.99,
  accentColor: "#10b981",
  metaTitle: "CarplayGO - CarPlay et Android Auto Sans Fil",
  metaDescription:
    "Transformez votre voiture en voiture connectee avec CarplayGO. Adaptateur sans fil premium pour Apple CarPlay et Android Auto. Livraison gratuite et garantie 2 ans.",
  metaKeywords: "carplay, android auto, adaptateur sans fil, voiture connectee, carplay sans fil",
  heroHeadline: "CarPlay et Android Auto Sans Fil",
  heroSubline:
    "Transformez votre autoradio d'origine en systeme connecte en 30 secondes. Compatible avec 98% des vehicules equipes d'ecran.",
  ctaText: "Decouvrir",
  guaranteeText: "Garantie 2 ans",
  shippingText: "Livraison gratuite",
  refundText: "30 jours satisfait ou rembourse",
};

/* ---------- Config ---------- */

export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig;
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {}
  return defaultConfig;
}

export function saveConfig(patch: Partial<SiteConfig>) {
  if (typeof window === "undefined") return;
  try {
    const current = getConfig();
    const next = { ...current, ...patch };
    localStorage.setItem(CONFIG_KEY, JSON.stringify(next));
    window.dispatchEvent(new StorageEvent("storage", { key: CONFIG_KEY }));
  } catch {}
}

export function resetConfig() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONFIG_KEY);
  window.dispatchEvent(new StorageEvent("storage", { key: CONFIG_KEY }));
}

export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setConfig(getConfig());
      const handler = () => setConfig(getConfig());
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    }
  }, []);
  return config;
}

/* ---------- Auth (SHA-256 client-side) ---------- */

async function hash(str: string): Promise<string> {
  const buf = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function setAdminPassword(password: string) {
  const h = await hash(password);
  localStorage.setItem(PW_HASH_KEY, h);
}

export async function checkAdminPassword(password: string): Promise<boolean> {
  const stored = localStorage.getItem(PW_HASH_KEY);
  if (!stored) return false;
  return (await hash(password)) === stored;
}

export function hasAdminPassword(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem(PW_HASH_KEY);
}

export function clearAdminPassword() {
  localStorage.removeItem(PW_HASH_KEY);
}
