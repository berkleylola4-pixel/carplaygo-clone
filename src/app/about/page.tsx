import { Metadata } from "next";

export const metadata: Metadata = {
  title: "A propos",
  description: "Decouvrez l'histoire et la mission de CarplayGO.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 w-full">
      <h1 className="text-4xl font-bold tracking-tight mb-6">A propos de CarplayGO</h1>
      <div className="space-y-6 text-foreground-muted leading-relaxed">
        <p>
          CarplayGO est ne d'une frustration simple : pourquoi devons-nous toujours brancher notre telephone dans la voiture pour utiliser CarPlay ou Android Auto ?
        </p>
        <p>
          Fonde en 2022 par une petite equipe de passionnes d'automobile et de technologie, notre mission est de rendre la conduite connectee accessible a tous — sans compromis.
        </p>
        <h2 className="text-xl font-bold text-foreground mt-10 mb-3">Notre mission</h2>
        <p>
          Rendre chaque trajet plus sur, plus confortable et plus connecte. Nous croyons que la technologie automobile devrait s'adapter a vous, pas l'inverse.
        </p>
        <h2 className="text-xl font-bold text-foreground mt-10 mb-3">Qualite avant tout</h2>
        <p>
          Chaque adaptateur CarplayGO subit des tests rigoureux avant expedition. Nous ne vendons que ce que nous utiliserions dans nos propres vehicules. C'est notre engagement.
        </p>
        <h2 className="text-xl font-bold text-foreground mt-10 mb-3">Service client francais</h2>
        <p>
          Notre equipe de support basee en France est disponible 7j/7 pour repondre a vos questions. Nous ne delocalisons pas le support — parce que vous meritez des reponses claires et rapides.
        </p>
      </div>
    </div>
  );
}
