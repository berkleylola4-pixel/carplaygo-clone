"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Plus, Minus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-background-alt rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-8 h-8 text-foreground-muted" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
        <p className="text-foreground-muted mb-8">Explorez notre produit et ajoutez-le a votre panier.</p>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 rounded-full font-semibold hover:bg-foreground/90 transition-all"
        >
          Decouvrir le produit
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
      <h1 className="text-3xl font-bold mb-8">Votre panier ({totalItems})</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-4 bg-background-alt rounded-2xl p-4"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-foreground-muted">{item.price.toFixed(2).replace(".", ",")} € / unite</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-white rounded-lg transition-colors text-foreground-muted hover:text-danger"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-full bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-l-full transition-colors"
                        aria-label="Reduire"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-r-full transition-colors"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold">
                      {(item.price * item.quantity).toFixed(2).replace(".", ",")} €
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-background-alt rounded-2xl p-6 h-fit space-y-6">
          <h3 className="font-bold text-lg">Recapitulatif</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground-muted">Sous-total</span>
              <span>{totalPrice.toFixed(2).replace(".", ",")} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Livraison</span>
              <span className="text-accent font-medium">Gratuite</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold">{totalPrice.toFixed(2).replace(".", ",")} €</span>
          </div>
          <Link
            href="/checkout"
            className="block w-full text-center bg-foreground text-white py-4 rounded-full font-semibold hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/20"
          >
            Passer a la caisse
          </Link>
          <Link
            href="/product"
            className="block w-full text-center text-sm text-foreground-muted hover:text-foreground transition-colors py-2"
          >
            Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  );
}
