import { getTextExtractor } from "office-text-extractor";

// Fonction pour extraire texte depuis un fichier Word (docx)
export async function extractTextFromDocx(path: string): Promise<string> {
  const extractor = getTextExtractor();
  const text = await extractor.extractText({ input: path, type: "file" });
  return text;
}
