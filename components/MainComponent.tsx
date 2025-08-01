"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Copy, File, FileText, Loader, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MainComponent = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [resultat, setResultat] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingCor, setLoadingCor] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  //   resume
  const handleMakeResume = async () => {
    setLoading(true);

    try {
      setResultat("");
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return; // stop execution
      }

      setResultat(data.resultat);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue, veuillez réessayer!");
    } finally {
      setLoading(false);
    }
  };

  //   correction
  const handleMakeCorrection = async () => {
    setLoadingCor(true);
    try {
      setResultat("");
      const response = await fetch("/api/fix-error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return; // stop execution
      }

      setResultat(data.resultat);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue, veuillez réessayer!");
    } finally {
      setLoadingCor(false);
    }
  };

  //   file to text
  useEffect(() => {
    if (file) {
      setLoadingFile(true);
      const extractTextFromServer = async () => {
        const formData = new FormData();
        formData.append("file", file); // fichier Word sélectionné

        try {
          const response = await fetch("/api/extract-word-text", {
            method: "POST",

            body: formData, // instance de File directement en body
          });

          if (!response.ok) {
            toast.error("Erreur extraction Word");
            return;
          }

          const data = await response.json();

          setText(data.text); // 'text' est la clé renvoyée par votre API route
        } catch (error) {
          console.error(error);
          toast.error("Une erreur est survenue, veuillez réessayer!");
          setText("");
        } finally {
          setLoadingFile(false);
        }
      };

      extractTextFromServer();
    }
  }, [file]);

  //   clear file and text
  const handleClear = () => {
    setText("");
    setResultat("");
    setFile(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultat);
    toast.success("Texte copié dans le presse-papier!");
  };

  return (
    <div className="p-4 border-2 w-full rounded-md">
      <div className="grid w-full md:grid-cols-2 min-h-72 gap-4">
        {/* pdf */}
        <div className="col-span-1 ">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-64 border-2  
              border-dashed rounded-lg 
              ${
                text || file
                  ? "cursor-default bg-gray-400"
                  : "cursor-pointer bg-gray-950"
              }  
                   `}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF file only (Max size limit can be controlled)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => {
                  const fl = e.target.files;
                  if (fl && fl.length > 0) {
                    const fil = fl[0];
                    setFile(fil);
                    return;
                  }
                  setFile(null);
                }}
                disabled={(!!text && file !== null) || loading || loadingCor}
              />
            </label>
          </div>
        </div>

        {/* text */}
        <div className="col-span-1 ">
          <Textarea
            className="w-full min-h-40 md:min-h-72 max-h-72 md:max-h-96 "
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder="Entrer votre texte ici..."
            disabled={loading || loadingCor || loadingFile}
          />
        </div>
      </div>
      {/* buttons */}
      <div className="flex justify-center mt-6 gap-4 flex-wrap">
        {/* fix logic and grammatical error syntax */}
        <Button
          className="flex-1"
          disabled={loading || loadingCor || loadingFile}
          onClick={handleMakeCorrection}
        >
          {loadingCor ? <Loader className="animate-spin" /> : <FileText />}
          Corriger les erreurs
        </Button>
        <Button
          className="flex-1"
          disabled={loading || loadingCor || loadingFile}
          onClick={handleMakeResume}
        >
          {loading ? <Loader className="animate-spin" /> : <File />}
          Résumer le texte
        </Button>
      </div>
      {/* result */}
      {resultat && (
        <div className="mt-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold">Resultat</h2>
            {/* copy */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={handleCopy}
                  disabled={loading || loadingCor || loadingFile}
                >
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copier le résultat dans le presse-papier</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={handleClear}
                  disabled={loading || loadingCor || loadingFile}
                >
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Effacer le résultat</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-base text-gray-500 w-full p-2 max-h-96 overflow-y-auto mt-2">
            {resultat}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
