"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteConfig } from "@/lib/config";
import { Shield, Wifi, Zap, ChevronRight, Star, Truck, RotateCcw } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function Home() {
  const config = useSiteConfig();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-background-alt overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={0}
                className="inline-flex items-center gap-2 bg-accent-light text-accent-dark px-4 py-1.5 rounded-full text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Plus de 12,000 clients satisfaits
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={1}
                className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground"
              >
                {config.heroHeadline}
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={2}
                className="text-lg sm:text-xl text-foreground-muted leading-relaxed max-w-xl"
              >
                {config.heroSubline}
              </motion.p>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={3}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 rounded-full font-semibold hover:bg-foreground/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-foreground/20"
                >
                  {config.ctaText}
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-white text-foreground border border-gray-200 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all"
                >
                  En savoir plus
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={4}
                className="flex items-center gap-6 pt-2"
              >
                <div className="flex items-center gap-2 text-sm text-foreground-muted">
                  <Truck className="w-4 h-4 text-accent" />
                  <span>{config.shippingText}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground-muted">
                  <RotateCcw className="w-4 h-4 text-accent" />
                  <span>{config.refundText}</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-accent/10 rounded-full" />
                <Image
                  src={config.heroImage}
                  alt="Adaptateur CarPlay sans fil dans une voiture"
                  fill
                  className="object-contain p-6 drop-shadow-2xl"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40", "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40", "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=40", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40"].map((src, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                    <Image src={src} alt="" fill className="object-cover" sizes="32px" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
                <span className="text-sm font-semibold ml-1">4.9/5</span>
              </div>
              <span className="text-sm text-foreground-muted">(1,240 avis verifies)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">{config.guaranteeText}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Pourquoi choisir {config.brandName} ?
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Un adaptateur concu pour fonctionner parfaitement avec votre vehicule, d'installation simple et totalement invisible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Wifi,
                title: "Connexion Automatique",
                desc: "Votre telephone se connecte automatiquement des que vous demarrez le moteur. Zero manipulation necessaire.",
              },
              {
                icon: Zap,
                title: "Installation Plug Play",
                desc: "Branchez l'adaptateur sur le port USB de votre voiture et c'est pret. Aucun outil, aucun garage requis.",
              },
              {
                icon: Shield,
                title: "Compatible Universel",
                desc: "Fonctionne avec 98% des vehicules equipes d'Apple CarPlay ou Android Auto filaire d'origine.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-background-alt rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product CTA */}
      <section className="py-20 sm:py-28 bg-background-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider">
                Le produit
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                L'adaptateur sans fil
              </h2>
              <ul className="space-y-4">
                {[
                  "Connexion instantanee sans fil",
                  "Support GPS, musique et appels",
                  "Mise a jour regulieres OTA",
                  "Design compact et discret",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-accent" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 rounded-full font-semibold hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/20"
                >
                  Commander maintenant — {config.productPrice.toFixed(2).replace(".", ",")} €
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-2xl">
                <Image
                  src={config.productImages[0] || config.heroImage}
                  alt="Adaptateur CarPlayGO"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
