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

    const maxLength = 3000;
    const truncatedText =
      text.length > maxLength ? text.slice(0, maxLength) : text;

    const prompt = `
Tu es un correcteur de texte professionnel.
Corrige et améliore uniquement ce texte en français, en corrigeant toutes les fautes d'orthographe, de grammaire et de syntaxe.
Retourne STRICTEMENT uniquement le texte corrigé et amélioré, SANS explications, SANS introduction, SANS résumé, SANS commentaires supplémentaires.
Voici le texte à corriger :\n\n${truncatedText}
`;

    const result = await generateText({
      model: "xai/grok-3",
      prompt,
    });

    if (
      result.steps &&
      Array.isArray(result.steps) &&
      result.steps.length > 0 &&
      result.steps[0].content &&
      Array.isArray(result.steps[0].content) &&
      result.steps[0].content.length > 0
    ) {
      const correction = result.steps[0].content[0];

      if (correction.type === "text" && typeof correction.text === "string") {
        // Optionnel : console.log(correction.text);
        return NextResponse.json({ resultat: correction.text });
      } else {
        return NextResponse.json(
          { error: "Correction non disponible au format texte." },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Format de réponse inattendu de l'API IA." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur correction IA :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue, veuillez réessayer" },
      { status: 500 }
    );
  }
}
