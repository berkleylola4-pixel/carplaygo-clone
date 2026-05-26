"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getConfig, saveConfig, resetConfig, type SiteConfig } from "@/lib/config";
import { RotateCcw, Save, Image as ImageIcon, DollarSign, Type, Eye } from "lucide-react";

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig>(getConfig());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  const handleSave = () => {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Voulez-vous vraiment reinitialiser toutes les valeurs par defaut ?")) {
      resetConfig();
      setConfig(getConfig());
    }
  };

  const update = (patch: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Eye className="w-6 h-6 text-accent" />
            Administration
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            Personnalisez l'apparence du site en temps reel.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reinitialiser
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold text-white transition-colors ${
              saved ? "bg-accent" : "bg-foreground"
            }`}
          >
            <Save className="w-4 h-4" />
            {saved ? "Enregistre !" : "Enregistrer"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Brand */}
        <div className="bg-background-alt rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Type className="w-5 h-5 text-accent" />
            Identite
          </h2>
          <div>
            <label className="block text-sm font-medium mb-2">Nom de la marque</label>
            <input
              value={config.brandName}
              onChange={(e) => update({ brandName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
            />
          </div>
        </div>

        {/* Hero Image */}
        <div className="bg-background-alt rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-accent" />
            Image Hero (Accueil)
          </h2>
          <div>
            <label className="block text-sm font-medium mb-2">URL de l'image</label>
            <input
              value={config.heroImage}
              onChange={(e) => update({ heroImage: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
              placeholder="https://..."
            />
          </div>
          {config.heroImage && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100"
            >
              <Image src={config.heroImage} alt="Hero preview" fill className="object-cover" sizes="800px" />
            </div>
          )}
        </div>

        {/* Product Images */}
        <div className="bg-background-alt rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-accent" />
            Images Produit (Galerie)
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {config.productImages.map((src, i) => (
              <div key={i} className="space-y-2">
                <label className="block text-sm font-medium">Image {i + 1}</label>
                <input
                  value={src}
                  onChange={(e) => {
                    const next = [...config.productImages];
                    next[i] = e.target.value;
                    update({ productImages: next });
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                  placeholder="https://..."
                />
                {src && (
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100"
                  >
                    <Image src={src} alt={`Produit ${i + 1}`} fill className="object-cover" sizes="300px" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-background-alt rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-accent" />
            Prix
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prix actuel (€)</label>
              <input
                type="number"
                step="0.01"
                value={config.productPrice}
                onChange={(e) => update({ productPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ancien prix (barre) (€)</label>
              <input
                type="number"
                step="0.01"
                value={config.productComparePrice}
                onChange={(e) => update({ productComparePrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <a href="/" className="text-sm text-foreground-muted hover:text-foreground transition-colors underline">Retour a l'accueil</a>
      </div>
    </div>
  );
}
