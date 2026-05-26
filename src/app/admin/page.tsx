"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  getConfig,
  saveConfig,
  resetConfig,
  hasAdminPassword,
  checkAdminPassword,
  setAdminPassword,
  clearAdminPassword,
  type SiteConfig,
} from "@/lib/config";
import {
  RotateCcw,
  Save,
  Image as ImageIcon,
  DollarSign,
  Type,
  Eye,
  Lock,
  Unlock,
  Palette,
  Shield,
  Truck,
  RotateCcw as RefundIcon,
  Search,
} from "lucide-react";

type Tab = "identity" | "images" | "seo" | "design" | "trust";

/* ---------- Main page ---------- */

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("identity");
  const [config, setConfig] = useState<SiteConfig>(getConfig());
  const [saved, setSaved] = useState(false);

  // auth
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const hasPw = hasAdminPassword();

  useEffect(() => {
    setConfig(getConfig());
    if (!hasPw) setTab("identity");
    else setTab("identity");
  }, [hasPw]);

  const handleSave = () => {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const ok = confirm("Voulez-vous vraiment reinitialiser toutes les valeurs par defaut ?");
    if (!ok) return;
    resetConfig();
    setConfig(getConfig());
  };

  const update = (patch: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  /* ---------- Auth handlers ---------- */
  const createPw = async () => {
    if (password.length < 4) {
      setPwError("Le mot de passe doit faire au moins 4 caracteres.");
      return;
    }
    if (password !== confirmPw) {
      setPwError("Les mots de passe ne correspondent pas.");
      return;
    }
    await setAdminPassword(password);
    setPwError("");
    setPassword("");
    setConfirmPw("");
    setTab("identity");
    setAuthenticated(true);
  };

  const login = async () => {
    const ok = await checkAdminPassword(password);
    if (ok) {  
      setPwError("");
      setPassword("");
      setTab("identity");
      setAuthenticated(true);
    } else {
      setPwError("Mot de passe incorrect.");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm w-full"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Administration</h1>
            <p className="text-sm text-foreground-muted mt-1">
              {hasPw ? "Connectez-vous pour acceder au panel." : "Definissez un mot de passe securise."}
            </p>
          </div>

          <div className="bg-background-alt rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mot de passe</label>
              <input
                type="password"
                placeholder="****"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPwError(""); }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
              />
            </div>
            {!hasPw && (
              <div>
                <label className="block text-sm font-medium mb-2">Confirmer</label>
                <input
                  type="password"
                  placeholder="****"
                  value={confirmPw}
                  onChange={(e) => { setConfirmPw(e.target.value); setPwError(""); }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                />
              </div>
            )}

            {pwError && <p className="text-sm text-danger">{pwError}</p>}

            <button
              onClick={hasPw ? login : createPw}
              className="w-full py-3 rounded-full font-semibold text-white bg-foreground hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/20"
            >
              {hasPw ? "Se connecter" : "Creer le mot de passe"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ---------- tab data ---------- */
  const tabItems = [
    { key: "identity" as Tab, label: "Identite", Icon: Type },
    { key: "images" as Tab, label: "Images", Icon: ImageIcon },
    { key: "seo" as Tab, label: "SEO + Textes", Icon: Search },
    { key: "design" as Tab, label: "Design", Icon: Palette },
    { key: "trust" as Tab, label: "Confiance", Icon: Shield },
  ];

  const previewAccentBadges = [
    { label: "Badge", style: { backgroundColor: config.accentColor, color: "#fff" } },
    { label: "Pill outline", style: { borderColor: config.accentColor, color: config.accentColor } },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Panel Admin</h1>
            <p className="text-xs text-foreground-muted">Personnalisez votre site en temps reel.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Defaut
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
          <button
            onClick={() => { clearAdminPassword(); setAuthenticated(false); }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground-muted hover:text-danger border border-gray-200 transition-colors"
            title="Deconnexion + supprimer mot de passe"
          >
            <Unlock className="w-4 h-4" />
            Deconnexion
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {tabItems.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              tab === key
                ? "bg-accent text-white shadow-md"
                : "bg-background-alt text-foreground-muted hover:bg-gray-100"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {<TabContent tab={tab} config={config} update={update} previewAccentBadges={previewAccentBadges} />}
      </AnimatePresence>

      <div className="mt-10 text-center">
        <a href="/" className="text-sm text-foreground-muted hover:text-foreground transition-colors underline">
          Retour a l'accueil
        </a>
      </div>
    </div>
  );
}

/* ---------- Tab content dispatcher ---------- */

function TabContent({
  tab,
  config,
  update,
  previewAccentBadges,
}: {
  tab: Tab;
  config: SiteConfig;
  update: (p: Partial<SiteConfig>) => void;
  previewAccentBadges: { label: string; style: React.CSSProperties }[];
}) {
  if (tab === "identity") {
    return (
      <motion.div
        key="identity"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-background-alt rounded-2xl p-6 space-y-5"
      >
        <SectionTitle>Nom de la marque</SectionTitle>
        <TextInput value={config.brandName} onChange={(v) => update({ brandName: v })} />
      </motion.div>
    );
  }

  if (tab === "images") {
    return (
      <motion.div
        key="images"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-6"
      >
        <Card>
          <SectionTitle>Image Hero (Accueil)</SectionTitle>
          <TextInput
            value={config.heroImage}
            onChange={(v) => update({ heroImage: v })}
            placeholder="https://..."
          />
          <ImagePreview src={config.heroImage} aspect="video" />
        </Card>

        <Card>
          <SectionTitle>Images Produit (Galerie)</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            {config.productImages.map((src, i) => (
              <div key={i} className="space-y-2">
                <label className="text-xs font-medium text-foreground-muted">Image {i + 1}</label>
                <input
                  value={src}
                  onChange={(e) => {
                    const next = [...config.productImages];
                    next[i] = e.target.value;
                    update({ productImages: next });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                  placeholder="https://..."
                />
                <ImagePreview src={src} aspect="square" />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    );
  }

  if (tab === "seo") {
    return (
      <motion.div
        key="seo"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-6"
      >
        <Card>
          <SectionTitle>SEO - Titre de la page</SectionTitle>
          <TextInput value={config.metaTitle} onChange={(v) => update({ metaTitle: v })} />
        </Card>

        <Card>
          <SectionTitle>SEO - Description</SectionTitle>
          <textarea
            value={config.metaDescription}
            onChange={(e) => update({ metaDescription: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm min-h-[100px] resize-y"
          />
        </Card>

        <Card>
          <SectionTitle>SEO - Mots-cles (separes par des virgules)</SectionTitle>
          <textarea
            value={config.metaKeywords}
            onChange={(e) => update({ metaKeywords: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm min-h-[80px] resize-y"
          />
        </Card>

        <Card>
          <SectionTitle>Texte Hero - Titre principal</SectionTitle>
          <TextInput value={config.heroHeadline} onChange={(v) => update({ heroHeadline: v })} />
        </Card>

        <Card>
          <SectionTitle>Texte Hero - Description</SectionTitle>
          <textarea
            value={config.heroSubline}
            onChange={(e) => update({ heroSubline: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm min-h-[80px] resize-y"
          />
        </Card>

        <Card>
          <SectionTitle>Texte bouton CTA</SectionTitle>
          <TextInput value={config.ctaText} onChange={(v) => update({ ctaText: v })} />
        </Card>
      </motion.div>
    );
  }

  if (tab === "design") {
    return (
      <motion.div
        key="design"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-6"
      >
        <Card>
          <SectionTitle>Couleur principale (accent)</SectionTitle>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={config.accentColor}
              onChange={(e) => update({ accentColor: e.target.value })}
              className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer p-0 overflow-hidden"
            />
            <input
              value={config.accentColor}
              onChange={(e) => update({ accentColor: e.target.value })}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-mono uppercase"
            />
          </div>

          <div className="mt-4 flex items-center gap-4">
            {previewAccentBadges.map((item) => (
              <span
                key={item.label}
                className="px-3 py-1.5 rounded-full text-xs font-medium border"
                style={item.style}
              >
                {item.label}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Prix Produit</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground-muted mb-1">Prix actuel (euro)</label>
              <input
                type="number"
                step="0.01"
                value={config.productPrice}
                onChange={(e) => update({ productPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground-muted mb-1">Ancien prix (barre) (euro)</label>
              <input
                type="number"
                step="0.01"
                value={config.productComparePrice}
                onChange={(e) => update({ productComparePrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
              />
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // trust
  return (
    <motion.div
      key="trust"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <Card>
        <SectionTitle>Blocs de confiance (affichage product page + homepage)</SectionTitle>
        <div className="space-y-4">
          <TrustField
            label="Texte Garantie"
            value={config.guaranteeText}
            onChange={(v) => update({ guaranteeText: v })}
            Icon={Shield}
          />
          <TrustField
            label="Texte Livraison"
            value={config.shippingText}
            onChange={(v) => update({ shippingText: v })}
            Icon={Truck}
          />
          <TrustField
            label="Texte Satisfait/Rembourse"
            value={config.refundText}
            onChange={(v) => update({ refundText: v })}
            Icon={RefundIcon}
          />
        </div>
      </Card>
    </motion.div>
  );
}

/* ---------- UI helpers ---------- */

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-background-alt rounded-2xl p-6">{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-sm mb-3">{children}</h3>;
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
    />
  );
}

function ImagePreview({ src, aspect }: { src: string; aspect: "video" | "square" }) {
  if (!src) return null;
  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-gray-100 mt-3 ${
        aspect === "video" ? "aspect-video" : "aspect-square"
      }`}
    >
      <Image src={src} alt="Preview" fill className="object-cover" sizes="600px" />
    </div>
  );
}

function TrustField({
  label,
  value,
  onChange,
  Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  Icon: typeof Shield;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-foreground-muted mb-1">{label}</label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
        />
      </div>
    </div>
  );
}
