"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Check, Truck, Shield, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSuccess(true);
    clearCart();
  };

  if (items.length === 0 && !success) {
    router.push("/cart");
    return null;
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-accent" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-4">Commande confirmee !</h1>
        <p className="text-foreground-muted mb-8">
          Merci pour votre achat. Vous recevrez bientot un email de confirmation avec le suivi de votre livraison.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 rounded-full font-semibold hover:bg-foreground/90 transition-all"
        >
          Retour a l'accueil
        </Link>
      </div>
    );
  }

  const isStepOneValid = form.email && form.firstName && form.lastName && form.phone;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/cart" className="flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Panier
        </Link>
        <span className="text-foreground-muted">/</span>
        <span className="text-sm font-medium">Paiement</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            {[
              { num: 1, label: "Livraison" },
              { num: 2, label: "Paiement" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s.num ? "bg-foreground text-white" : "bg-gray-100 text-foreground-muted"
                }`}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-sm font-medium ${step >= s.num ? "text-foreground" : "text-foreground-muted"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <h2 className="font-bold text-lg mb-4">Informations de livraison</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    placeholder="Prenom"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                  />
                  <input
                    name="lastName"
                    placeholder="Nom"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                  />
                </div>
                <input
                  name="address"
                  placeholder="Adresse"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="city"
                    placeholder="Ville"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                  />
                  <input
                    name="postalCode"
                    placeholder="Code postal"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                  />
                </div>
                <input
                  name="phone"
                  placeholder="Telephone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                />
                <button
                  onClick={() => setStep(2)}
                  disabled={!isStepOneValid}
                  className="w-full py-4 rounded-full font-semibold text-white bg-foreground hover:bg-foreground/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-foreground/20 mt-2"
                >
                  Continuer vers le paiement
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="font-bold text-lg">Paiement</h2>
                <div className="bg-background-alt rounded-2xl p-6 space-y-4">
                  <p className="text-sm text-foreground-muted">Ceci est une demo. Aucun paiement reel ne sera traite.</p>
                  <div className="grid gap-3">
                    <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between cursor-not-allowed opacity-60">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-5 bg-blue-800 rounded" />
                        <span className="text-sm">Carte bancaire (demo)</span>
                      </div>
                      <Shield className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-3 rounded-full font-semibold text-white bg-foreground hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/20 text-sm"
                  >
                    {loading ? "Traitement..." : `Payer ${totalPrice.toFixed(2).replace(".", ",")} €`}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-background-alt rounded-2xl p-6 h-fit space-y-6">
          <h3 className="font-bold">Recapitulatif de commande</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-foreground-muted">Qté: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold">{(item.price * item.quantity).toFixed(2).replace(".", ",")} €</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground-muted">Sous-total</span>
              <span>{totalPrice.toFixed(2).replace(".", ",")} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Livraison</span>
              <span className="text-accent">Gratuite</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold">{totalPrice.toFixed(2).replace(".", ",")} €</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-foreground-muted bg-white p-3 rounded-xl">
            <Shield className="w-4 h-4 text-accent shrink-0" />
            Paiement securise. Garantie satisfait ou rembourse sous 30 jours.
          </div>
        </div>
      </div>
    </div>
  );
}
