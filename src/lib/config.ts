"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "carplaygo-admin-config-v2";

export interface SiteConfig {
  brandName: string;
  heroImage: string;
  productImages: string[];
  productPrice: number;
  productComparePrice: number;
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
};

export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {}
  return defaultConfig;
}

export function saveConfig(config: Partial<SiteConfig>) {
  if (typeof window === "undefined") return;
  try {
    const current = getConfig();
    const next = { ...current, ...config };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch {}
}

export function resetConfig() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    setConfig(getConfig());
    const onStorage = () => setConfig(getConfig());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return config;
}
