import { Metadata } from "next";
import { HelpCircle, Truck, RotateCcw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Support",
  description: "FAQ et support client CarplayGO.",
};

const faqs = [
  {
    q: "Comment fonctionne CarplayGO ?",
    a: "CarplayGO est un adaptateur sans fil qui se branche sur le port USB de votre voiture. Une fois connecte, il cree un lien sans fil entre votre telephone et l'ecran de votre voiture. Votre smartphone se connecte automatiquement des que vous demarrez le moteur.",
  },
  {
    q: "Mon vehicule est-il compatible ?",
    a: "CarplayGO fonctionne avec 98% des vehicules equipes d'Apple CarPlay ou Android Auto filaire d'origine. Si votre voiture a un ecran avec CarPlay filaire, notre adaptateur fonctionnera. N'hésitez pas a nous contacter pour verifier la compatibilite de votre modele.",
  },
  {
    q: "L'installation est-elle difficile ?",
    a: "Absolument pas. C'est une installation plug-and-play : branchez l'adaptateur sur le port USB, attendez quelques secondes, puis appariez votre telephone via Bluetooth. Ca prend moins de 30 secondes.",
  },
  {
    q: "Quelle est la politique de retour ?",
    a: "Vous disposez de 30 jours pour tester le produit. Si vous n'etes pas satisfait, contactez-nous pour un retour gratuit et un remboursement complet. Nous prenons en charge les frais de retour.",
  },
  {
    q: "Quelle est la garantie ?",
    a: "Tous nos produits beneficient d'une garantie constructeur de 2 ans. En cas de probleme technique, nous vous enverrons un remplacement gratuit sans question.",
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 w-full">
      <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">Support Client</h1>
      <p className="text-foreground-muted text-center mb-12">Trouvez rapidement des reponses a vos questions.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: HelpCircle, title: "FAQ", desc: "Reponses aux questions frequentes" },
          { icon: Truck, title: "Livraison", desc: "2-4 jours ouvrables, gratuite" },
          { icon: RotateCcw, title: "Retours", desc: "30 jours satisfait ou rembourse" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-background-alt rounded-2xl p-5 text-center">
            <Icon className="w-6 h-6 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs text-foreground-muted mt-1">{desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-12">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-background-alt rounded-2xl p-6">
            <h3 className="font-semibold mb-2">{faq.q}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="bg-foreground text-white rounded-2xl p-8 text-center">
        <Mail className="w-8 h-8 mx-auto mb-4 text-accent" />
        <h2 className="text-xl font-bold mb-2">Vous n'avez pas trouve votre reponse ?</h2>
        <p className="text-gray-300 text-sm mb-6">Notre equipe est la pour vous aider. Reponse sous 24h.</p>
        <a
          href="mailto:contact@carplaygo.com"
          className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-dark transition-colors text-sm"
        >
          Nous contacter
        </a>
      </div>
    </div>
  );
}
