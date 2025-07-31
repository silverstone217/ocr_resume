import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string" || text.trim() === "") {
      return NextResponse.json(
        { error: "Le champ texte est requis." },
        { status: 400 }
      );
    }

    // Optionnel : limiter la longueur du texte pour éviter dépassement tokens
    const maxLength = 3000; // à ajuster selon modèle, par ex tokens <= 4096
    const truncatedText =
      text.length > maxLength ? text.slice(0, maxLength) : text;

    const prompt = `Fais un résumé concis et clair du texte suivant :\n\n${truncatedText}\n\nRésumé :`;

    const result = await generateText({
      model: "xai/grok-3",
      prompt: prompt,
    });

    const summary = result.steps[0].content[0]; // Contient le texte du résumé généré

    // console.log(summary);
    if (summary.type === "text" && typeof summary.text === "string") {
      return NextResponse.json({ resultat: summary.text });
    } else {
      // Au cas où ce n’est pas le cas, retourner un fallback
      return NextResponse.json(
        { error: "Résumé non disponible au format texte." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur résumé IA :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue, veuillez réessayer" },
      { status: 500 }
    );
  }
}
