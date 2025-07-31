import { NextResponse } from "next/server";
import { parse } from "parse-multipart-data";
import { getTextExtractor } from "office-text-extractor";

export const config = {
  api: { bodyParser: false },
};

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType) {
      return NextResponse.json(
        { error: "Content-Type manquant" },
        { status: 400 }
      );
    }

    const boundaryMatch = contentType.match(/boundary=(.*)/);
    if (!boundaryMatch) {
      return NextResponse.json(
        { error: "Boundary manquant dans Content-Type" },
        { status: 400 }
      );
    }

    const boundary = boundaryMatch[1];

    const bodyBuffer = Buffer.from(await request.arrayBuffer());

    const parts = parse(bodyBuffer, boundary);

    const filePart = parts.find(
      (part) => part.filename && part.name === "file"
    );
    if (!filePart) {
      return NextResponse.json(
        { error: "Fichier 'file' introuvable dans la requête" },
        { status: 400 }
      );
    }

    const extractor = getTextExtractor();
    const text = await extractor.extractText({
      input: filePart.data,
      type: "buffer",
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Erreur API extract-word-text:", error);
    return NextResponse.json(
      { error: "Erreur extraction texte Word" },
      { status: 500 }
    );
  }
}
