"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Shield, Truck, RotateCcw, Star, Plus, Minus, Check, AlertCircle } from "lucide-react";

const productImages = [
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492144534657-ae2f7a8f6f6d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=800&auto=format&fit=crop",
];

const reviews = [
  { name: "Thomas D.", rating: 5, text: "Installation en 2 minutes chrono. Mon autoradio d'origine est transforme !", date: "il y a 2 jours" },
  { name: "Sophie M.", rating: 5, text: "Je n'ai plus besoin de brancher mon cable. La connexion est instantanee.", date: "il y a 1 semaine" },
  { name: "Kevin L.", rating: 4, text: "Bon produit, livraison rapide. Seul petit bémol : le manuel est en anglais.", date: "il y a 2 semaines" },
  { name: "Marie P.", rating: 5, text: "Parfait pour ma Clio 4 RS. Fonctionne avec Android Auto impecablement.", date: "il y a 3 semaines" },
  { name: "Alexandre R.", rating: 5, text: "Garantie respectee. Service client reactif. Je recommande a 100%.", date: "il y a 1 mois" },
  { name: "Charlotte B.", rating: 5, text: "Le meilleur achat pour ma voiture. Le design est discret et elegant.", date: "il y a 1 mois" },
];

export default function ProductPage() {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(
      {
        id: "carplaygo-v1",
        name: "CarplayGO Sans Fil",
        price: 89.99,
        image: productImages[0],
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="flex flex-col">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-background-alt border border-gray-100">
              <Image
                src={productImages[selectedImage]}
                alt="CarplayGO Sans Fil"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-accent" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="150px" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>
              <span className="text-sm text-foreground-muted">1,240 avis verifies</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">CarplayGO Sans Fil</h1>

            <p className="text-foreground-muted leading-relaxed">
              Transformez votre autoradio d'origine en systeme connecte sans fil. Compatible Apple CarPlay et Android Auto. Installation plug play en moins de 30 secondes.
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">89,99 €</span>
              <span className="text-lg text-foreground-muted line-through">129,99 €</span>
              <span className="text-sm font-medium text-danger bg-danger/10 px-2 py-0.5 rounded-md">-31%</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-l-full transition-colors"
                  aria-label="Reduire"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-r-full transition-colors"
                  aria-label="Augmenter"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                disabled={added}
                className={`flex-1 min-w-[200px] py-4 rounded-full font-semibold text-white transition-all shadow-lg ${
                  added
                    ? "bg-accent shadow-accent/20"
                    : "bg-foreground hover:bg-foreground/90 shadow-foreground/20"
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" /> Ajoute au panier
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      Ajouter au panier
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {[
                { icon: Shield, text: "Garantie 2 ans" },
                { icon: Truck, text: "Livraison gratuite" },
                { icon: RotateCcw, text: "30 jours satisfait" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-foreground-muted bg-background-alt px-4 py-3 rounded-xl">
                  <Icon className="w-4 h-4 text-accent shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            <div className="bg-accent-light rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent-dark shrink-0 mt-0.5" />
              <p className="text-sm text-accent-dark">
                En stock — commandez avant 14h pour une expedition aujourd'hui. Livraison en 2-4 jours ouvrables.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="bg-background-alt py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Ce que disent nos clients</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-warning fill-warning" />
                ))}
              </div>
              <span className="font-semibold">4.9/5</span>
              <span className="text-foreground-muted">basé sur 1,240 avis</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-foreground-muted leading-relaxed mb-4 text-sm">{review.text}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-foreground-muted">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
