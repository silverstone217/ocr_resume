import MainComponent from "@/components/MainComponent";

export default function Home() {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-2">OCR RESUME</h2>
      <p className="max-w-md text-gray-400">
        Resumer des fichiers pdf en texte ou Ameliorer la logique de text et
        corriger les fautes grammaticales ou de logiques.
        <br />
        La limite est de 3000 caractères.
      </p>

      {/* composant */}
      <div className="flex flex-col items-center justify-center py-10 w-full">
        <MainComponent />
      </div>
    </div>
  );
}
