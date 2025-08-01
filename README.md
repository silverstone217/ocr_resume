# Projet Next.js avec correction et résumé de textes/fichiers

## Description

Ce projet est une application web développée avec **Next.js** et **TypeScript**, déployée sur **Vercel**. Elle offre deux fonctionnalités principales liées au traitement de textes et fichiers Word (.docx) :

- **Correction automatique** des erreurs dans un texte ou un fichier Microsoft Word (.docx) uploadé.
- **Résumé** d’un texte ou d’un fichier Microsoft Word (.docx) uploadé.

L’application exploite la bibliothèque **office-text-extractor** pour extraire le contenu des fichiers `.docx`, **parse-multipart-data** pour gérer les uploads, et utilise **Vercel AI Gateway avec Grok 3** pour le traitement intelligent des textes (correction et résumé).

---

## Technologies utilisées

- [Next.js](https://nextjs.org/) (React Framework)
- [TypeScript](https://www.typescriptlang.org/) (typage statique)
- [Vercel](https://vercel.com/) (plateforme de déploiement serverless)
- [office-text-extractor](https://www.npmjs.com/package/office-text-extractor) (extraction de texte depuis fichiers Word)
- [parse-multipart-data](https://www.npmjs.com/package/parse-multipart-data) (gestion des fichiers uploadés multipart)
- [Vercel AI Gateway](https://vercel.com/docs/concepts/ai/gateway) avec Grok 3 (pour l’analyse et le traitement de texte avancé)

---

## Fonctionnalités

### 1. Correction de texte/fichier

- L’utilisateur peut soumettre un texte brut ou uploader un fichier `.docx`.
- Le système extrait le texte si nécessaire, puis utilise l’IA Grok 3 pour détecter et corriger les erreurs linguistiques.
- Le texte corrigé est ensuite affiché et peut être téléchargé.

### 2. Résumé de texte/fichier

- L’utilisateur peut soumettre un texte ou un fichier `.docx`.
- Le contenu est extrait et un résumé concis est généré via l’IA Grok 3.
- Le résumé est affiché dans l’interface utilisateur pour lecture rapide.

---

## Installation et déploiement

1. Clonez le dépôt :
   git clone https://github.com/silverstone217/ocr_resume
   cd ocr_resume

2. Installez les dépendances :
   npm install ou yarn install

3. Configurez vos variables d’environnement (ex. clés d’API pour Vercel AI Gateway) dans un fichier `.env.local`.

4. Lancez le serveur de développement localement :
   npm run dev ou yarn dev

5. Pour déployer votre projet, poussez vos changements sur GitHub et importez le repository dans [Vercel](https://vercel.com/) pour un déploiement automatique.

---

## Usage

L’interface utilisateur propose deux modes :

- **Correction d’erreurs** : collez votre texte ou uploadez un fichier Word, puis cliquez sur "Corriger".
- **Résumé** : collez un texte ou uploadez une source `.docx`, puis cliquez sur "Résumer".

Les résultats s’affichent directement en dessous avec options de copie ou téléchargement.

---

## Structure du projet

- `/app` - Pages Next.js (Frontend + API) et Icon
- `/lib` - Fonctions utilitaires pour extraction et traitement
- `/components` - Composants React UI
- `app/api` - Points d’entrée API pour correction et résumé
- `README.md` - Cette documentation
- `public` - Assets statiques (images, etc.)

---

## Contributions

Les contributions sont les bienvenues. Merci d’ouvrir une issue ou une pull request pour proposer des améliorations ou signaler des bugs.

---

## Licence

Ce projet est sous licence MIT.

---

## Contact

Pour toute question ou suggestion, merci de contacter stephuni35@gmail.com.

---

Ce README synthétise l’essentiel pour comprendre et utiliser votre projet de traitement intelligent de texte/fichiers avec Next.js et Vercel.

# Projet de traitement intelligent de texte/fichiers ORC_RESUME
