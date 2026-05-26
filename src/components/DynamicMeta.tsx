"use client";

import { useEffect } from "react";
import { useSiteConfig } from "@/lib/config";

export default function DynamicMeta() {
  const config = useSiteConfig();

  useEffect(() => {
    if (!config) return;
    document.title = config.metaTitle;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", config.metaDescription);
    setMeta("keywords", config.metaKeywords);

    // Accent color CSS variable
    document.documentElement.style.setProperty("--accent", config.accentColor);
    document.documentElement.style.setProperty("--accent-dark", adjustColor(config.accentColor, -30));
    document.documentElement.style.setProperty("--accent-light", adjustColor(config.accentColor, 40) + "30");
  }, [config]);

  return null;
}

function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
}
