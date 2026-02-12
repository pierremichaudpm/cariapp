import React, { useState } from "react";
import Icon from "./Icon";
import NewsModal from "./NewsModal";
import {
  useScrollReveal,
  useScrollRevealGroup,
} from "../hooks/useScrollReveal";

const News = ({ currentLanguage, translations }) => {
  const [modalFilter, setModalFilter] = useState("all");
  const [isMoreContentModalOpen, setIsMoreContentModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  const t = translations[currentLanguage] || translations.fr;

  // CARI categories - all use dark blue badge
  const nc = t.newsCategories || {};
  const categories = {
    francisation: { label: nc.francisation || "Francisation" },
    emploi: { label: nc.emploi || "Emploi" },
    femmes: { label: nc.femmes || "Femmes du monde" },
    integration: { label: nc.integration || "Intégration" },
    parents: { label: nc.parents || "Parents & Jeunesse" },
    accueil: { label: "Accueil" },
  };

  // Content type badge config
  const contentTypeConfig = {
    guide: { color: "#6CBAC7", textColor: "#ffffff" },
    histoire: { color: "#FFBF3F", textColor: "#263164" },
    actualite: { color: "#FF5C39", textColor: "#ffffff" },
  };

  // Filter labels from translations
  const filterLabels = t.news?.filters || {
    all: "Tout voir",
    guide: "Guides pratiques",
    histoire: "Histoires d'ici",
    actualite: "Actualités",
  };

  // Content type badge labels from translations
  const contentTypeLabels = t.news?.contentTypes || {
    guide: "GUIDE",
    histoire: "HISTOIRE",
    actualite: "ACTUALITÉ",
  };

  // Items ordered guide/histoire/actualite repeating so mobile :nth-child(n+4) shows 1 of each type
  const newsItems = [
    // ========== HOMEPAGE ROW 1 (visible mobile + desktop) ==========
    // --- Item 1: GUIDE ---
    {
      id: 1,
      type: "text",
      contentType: "guide",
      category: "accueil",
      title:
        t.news?.guides?.["1"]?.title ||
        "Vos 10 premières démarches à votre arrivée au Québec",
      excerpt:
        t.news?.guides?.["1"]?.excerpt ||
        "De l'obtention de votre NAS à l'inscription à la RAMQ, voici la checklist complète pour bien démarrer votre nouvelle vie.",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-02-03",
      content: `Félicitations pour votre arrivée au Québec! Les premières semaines peuvent sembler étourdissantes avec toutes les démarches à effectuer. Ce guide vous présente les 10 étapes essentielles dans l'ordre où vous devriez les accomplir, pour éviter les blocages et gagner du temps.

## 1. Obtenir votre numéro d'assurance sociale (NAS)

C'est la toute première chose à faire, idéalement dans les jours suivant votre arrivée. Le NAS est un numéro confidentiel de neuf chiffres indispensable pour travailler, recevoir un salaire, payer vos impôts et accéder aux prestations gouvernementales.

Rendez-vous dans un bureau de Service Canada avec votre passeport et votre confirmation de résidence permanente (ou permis de travail). La démarche est gratuite et vous recevez votre numéro rapidement. Gardez-le précieusement et ne le communiquez qu'aux autorités publiques, à votre employeur et à votre banque.

Bureau le plus proche de Saint-Laurent: Service Canada — 1350, boul. Marcel-Laurin.

## 2. Ouvrir un compte bancaire

Vous aurez besoin d'un compte bancaire pour recevoir votre salaire, payer votre loyer et gérer vos finances au quotidien. Prenez rendez-vous dans une succursale dès votre arrivée.

Apportez vos pièces d'identité (passeport, confirmation de résidence permanente) et votre NAS. Plusieurs banques offrent des forfaits spéciaux pour les nouveaux arrivants, souvent gratuits la première année: Desjardins, Banque Nationale, RBC, TD et BMO sont les plus courantes. Comparez les forfaits et demandez quels frais s'appliquent après la période promotionnelle.

Astuce: Demandez aussi une carte de crédit. L'utiliser régulièrement et la rembourser à temps est la meilleure façon de bâtir votre historique de crédit au Canada — ce dossier est essentiel pour obtenir un logement ou un prêt plus tard.

## 3. S'inscrire à la RAMQ (assurance maladie)

La Régie de l'assurance maladie du Québec (RAMQ) vous donne accès au système de santé public. Chaque membre de votre famille doit avoir sa propre carte. Vous pouvez faire la demande en ligne sur le site de la RAMQ ou vous présenter à un bureau en personne.

Important: Il y a un délai de carence de 3 mois pour la plupart des résidents permanents avant que votre couverture soit active. Pendant cette période, souscrivez une assurance privée temporaire pour éviter de mauvaises surprises. Exception: si vous venez de France, Belgique, Danemark, Suède, Grèce, Finlande, Norvège, Luxembourg ou Portugal, des ententes de sécurité sociale vous permettent d'être couvert dès votre arrivée — présentez le formulaire SE-401-Q-207 à la RAMQ.

Inscrivez-vous aussi à l'assurance médicaments en même temps que votre demande de carte d'assurance maladie.

## 4. Trouver un logement

Si vous n'avez pas encore de logement permanent, commencez par un hébergement temporaire (Airbnb, auberge, sous-location) le temps de visiter des appartements. Consultez Kijiji, Facebook Marketplace, les groupes de nouveaux arrivants et Centris pour trouver des offres.

Le bail standard au Québec est de 12 mois. Avant de signer, lisez-le attentivement — une fois signé, vous ne pouvez pas l'annuler sauf exceptions. Vos droits comme locataire sont protégés par le Tribunal administratif du logement.

Attention aux arnaques: Ne versez jamais d'argent avant d'avoir visité le logement en personne. Un propriétaire ne peut pas légalement exiger de dépôt de sécurité au Québec (sauf pour les clés), même si certains le demandent dans la pratique.

## 5. Obtenir un numéro de téléphone canadien

Un numéro local est indispensable pour vos démarches, vos recherches d'emploi et votre vie quotidienne. Les principaux fournisseurs (Fizz, Koodo, Public Mobile, Vidéotron, Bell, Telus) offrent des forfaits variés. Les fournisseurs virtuels comme Fizz et Public Mobile sont souvent les moins chers pour commencer.

## 6. S'inscrire aux cours de français

Le gouvernement du Québec offre des cours de francisation gratuits avec une allocation de participation pour les personnes admissibles. C'est un investissement précieux pour votre intégration professionnelle et sociale. Le CARI offre aussi des cours adaptés à tous les niveaux, avec des horaires flexibles incluant des cours de soir.

Même si vous parlez déjà français, un cours de francisation peut vous aider à comprendre les expressions québécoises et les normes professionnelles locales.

## 7. Inscrire vos enfants à l'école

L'éducation est gratuite et obligatoire au Québec pour les enfants de 6 à 16 ans. Contactez le Centre de services scolaire Marguerite-Bourgeoys (CSSMB) pour le secteur de Saint-Laurent. Des classes d'accueil sont disponibles pour les enfants qui ne parlent pas français — ils y apprennent la langue tout en s'intégrant progressivement au système scolaire régulier.

Pour les tout-petits, inscrivez-vous à la liste d'attente pour une place en garderie subventionnée via le guichet unique La Place 0-5.

## 8. Obtenir votre permis de conduire québécois

La Société de l'assurance automobile du Québec (SAAQ) est l'organisme qui délivre les permis. Votre permis d'origine vous permet de conduire pendant 90 jours après votre arrivée. Selon votre pays d'origine, vous pourriez échanger votre permis directement (environ 85 $) ou devoir passer des examens théoriques et pratiques. Renseignez-vous rapidement auprès de la SAAQ sur les ententes avec votre pays, car les rendez-vous peuvent être longs à obtenir.

## 9. Faire votre déclaration de revenus

Même si vous êtes arrivé en cours d'année et n'avez pas travaillé au Canada, vous devez produire une déclaration de revenus. C'est important pour accéder aux crédits d'impôt et aux allocations familiales (Allocation canadienne pour enfants, Allocation famille du Québec). Le CARI offre un service d'aide aux impôts pendant la période de déclaration.

## 10. Vous inscrire au CARI

Notre équipe vous accompagne gratuitement dans toutes ces démarches et bien plus. Que vous ayez besoin d'aide pour remplir un formulaire, comprendre une lettre du gouvernement ou planifier vos prochaines étapes, un conseiller du CARI est là pour vous. Prenez rendez-vous dès votre première semaine — plus vous commencez tôt, plus votre intégration sera rapide.`,
    },
    // --- Item 2: HISTOIRE ---
    {
      id: 2,
      type: "video",
      contentType: "histoire",
      category: "emploi",
      title: "De réfugiée à entrepreneure: le parcours de Fatima",
      excerpt:
        "Arrivée de Syrie en 2019, Fatima dirige aujourd'hui sa pâtisserie à Saint-Laurent. Elle raconte son parcours avec le CARI.",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-20",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: "8:42",
      content: `Quand Fatima est arrivée à Montréal en 2019, elle ne parlait ni français ni anglais. Réfugiée syrienne avec trois enfants, elle portait avec elle un seul atout: sa passion pour la pâtisserie.

## Les premiers pas

"Les premiers mois étaient les plus difficiles. Je ne comprenais rien, je ne pouvais même pas acheter du pain. Mais j'avais mes enfants à nourrir, alors j'ai trouvé la force."

C'est une travailleuse sociale du CARI qui a orienté Fatima vers les cours de francisation. En parallèle, elle a participé aux ateliers d'entrepreneuriat féminin.

## La naissance du projet

"Un jour, j'ai apporté des baklavas à un atelier du CARI. Tout le monde en voulait! Ma conseillère m'a dit: Fatima, c'est ton entreprise."

Avec l'aide du CARI, Fatima a élaboré son plan d'affaires, obtenu un microcrédit et trouvé un local à Saint-Laurent.

## Aujourd'hui

Sa pâtisserie "Les Délices de Fatima" emploie maintenant deux personnes et fournit plusieurs restaurants du quartier.

"Le CARI m'a donné bien plus qu'un coup de main. Ils m'ont donné la confiance que je pouvais réussir ici."`,
    },
    // --- Item 3: ACTUALITÉ ---
    {
      id: 3,
      type: "text",
      contentType: "actualite",
      category: "francisation",
      title: "Nouvelle session de français intensifs — Mars 2025",
      excerpt:
        "Inscription ouverte pour notre programme de francisation accélérée. Tous niveaux, horaires flexibles.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-27",
      content: `Nous sommes heureux d'annoncer l'ouverture des inscriptions pour notre programme de francisation accélérée qui débutera en mars 2025.

## Détails du programme

Ce programme intensif est conçu pour les nouveaux arrivants qui souhaitent améliorer rapidement leurs compétences en français. Les cours auront lieu du lundi au vendredi, de 9h00 à 12h00.

### Ce qui est inclus:
- 15 heures de cours par semaine
- Matériel pédagogique fourni
- Activités de conversation en groupe
- Sorties culturelles mensuelles
- Certificat à la fin du programme

## Critères d'admissibilité

- Être résident permanent ou citoyen canadien
- Avoir 18 ans ou plus
- Avoir des connaissances de base en français (niveau débutant accepté)

Pour vous inscrire, veuillez nous contacter au 514-747-8229 ou passer directement à nos bureaux. Les places sont limitées!`,
    },
    // ========== HOMEPAGE ROW 2 (hidden on mobile, visible desktop) ==========
    // --- Item 4: GUIDE ---
    {
      id: 4,
      type: "text",
      contentType: "guide",
      category: "emploi",
      title:
        t.news?.guides?.["4"]?.title ||
        "Comment faire reconnaître votre diplôme au Québec",
      excerpt:
        t.news?.guides?.["4"]?.excerpt ||
        "Évaluation comparative, ordres professionnels, équivalences... Le parcours étape par étape pour valoriser vos études.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-28",
      content: `Vous avez un diplôme obtenu à l'étranger et vous souhaitez le faire valoir au Québec? Le processus peut sembler complexe, mais en comprenant bien les étapes et les organismes impliqués, vous pouvez naviguer le système avec confiance.

## Comprendre la différence entre évaluation et équivalence

Première distinction essentielle: une évaluation comparative n'est pas une équivalence de diplôme. L'évaluation comparative des études effectuées hors du Québec, délivrée par le ministère de l'Immigration, de la Francisation et de l'Intégration (MIFI), est un avis d'expert qui indique à quels repères scolaires québécois correspondent vos études. C'est un outil d'insertion professionnelle qui aide les employeurs à comprendre votre parcours. Une équivalence de diplôme, en revanche, est accordée par un ordre professionnel ou un établissement d'enseignement et peut impliquer des cours de mise à niveau ou des examens.

## Étape 1: L'évaluation comparative (MIFI)

Pour la plupart des emplois non réglementés, l'évaluation comparative du MIFI est suffisante.

Documents requis: le formulaire de demande A-0361-FO (version la plus récente), photocopie d'une pièce d'identité, vos diplômes et relevés de notes détaillés pour chaque année d'études postsecondaires. Si vos documents ne sont pas en français ou en anglais, une traduction certifiée par un traducteur agréé est nécessaire.

Coût: environ 130 $ par évaluation. Délai: variable, comptez plusieurs semaines. Si vous avez une offre d'emploi, votre employeur peut demander un traitement prioritaire sans frais supplémentaires.

## Étape 2: L'évaluation WES (pour l'immigration fédérale)

Si vous êtes en processus d'immigration via Entrée Express (fédéral), vous aurez besoin d'une évaluation des diplômes d'études (EDE) d'un organisme désigné comme World Education Services (WES). Attention: l'évaluation WES pour l'immigration et l'évaluation comparative du MIFI sont deux choses différentes et ne sont pas interchangeables.

## Étape 3: Les professions réglementées

Si votre profession est réglementée au Québec (ingénieur, infirmière, comptable, médecin, architecte, avocat, etc.), vous devez obtenir un permis d'exercice auprès de l'ordre professionnel concerné. En général: soumettre vos documents académiques et votre expérience, possiblement suivre des cours de mise à niveau, effectuer un stage supervisé, démontrer votre maîtrise du français professionnel.

Le portail Qualifications Québec est votre meilleur point de départ. Délai réaliste: 6 mois à 3 ans selon la complexité.

## Étape 4: Les métiers et formations techniques

Pour les métiers de la construction et certaines formations techniques, adressez-vous à Emploi-Québec ou aux comités sectoriels de main-d'œuvre. Des programmes de reconnaissance des acquis et des compétences (RAC) sont offerts par les cégeps.

## Conseils pratiques

Commencez tôt — lancez vos démarches avant même votre arrivée si possible. Faites traduire vos documents par un traducteur certifié OTTIAQ (50 à 100 $ par page). Ne restez pas inactif — cherchez un emploi connexe pendant le processus. Utilisez les ressources gratuites du CARI.`,
    },
    // --- Item 5: HISTOIRE ---
    {
      id: 5,
      type: "text",
      contentType: "histoire",
      category: "francisation",
      title: "Ahmed: du premier cours de français au poste en TI",
      excerpt:
        "En 18 mois, Ahmed est passé de zéro mot en français à un emploi dans son domaine. Les clés de sa réussite.",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-10",
      content: `Quand Ahmed est arrivé à Montréal en janvier 2023, il ne parlait pas un mot de français. Ingénieur en informatique au Maroc depuis 8 ans, il avait les compétences techniques mais pas la langue pour les valoriser au Québec.

"Le premier jour, je suis allé acheter du pain et je n'ai pas réussi à me faire comprendre. C'était humiliant pour quelqu'un qui gérait des équipes de 15 personnes", raconte-t-il.

C'est sa voisine qui lui a parlé du CARI. Dès la semaine suivante, Ahmed s'inscrivait aux cours de francisation intensifs.

"Les professeurs du CARI comprennent notre réalité. Ils ne nous enseignent pas juste la grammaire, ils nous apprennent le français du quotidien et du travail. Comment passer une entrevue, comment rédiger un courriel professionnel, comment participer à une réunion."

En parallèle de ses cours, Ahmed a participé aux ateliers d'employabilité du CARI. Il a refait son CV au format québécois, pratiqué les simulations d'entrevue et rencontré des employeurs lors du salon de l'emploi organisé au CARI.

"Le moment décisif a été la simulation d'entrevue. Ma conseillère m'a dit: 'Ahmed, arrête de réciter ton CV. Raconte une histoire.' Ça a tout changé."

En juillet 2024, après 18 mois au Québec, Ahmed décrochait un poste de technicien en TI chez une entreprise de Saint-Laurent. Aujourd'hui, il suit des cours du soir pour obtenir son titre d'ingénieur au Québec.

"Le CARI m'a donné bien plus qu'un emploi. Ils m'ont donné la confiance que je pouvais réussir ici. Quand je doute, je repense à mon premier cours de français où je ne comprenais rien. Regarde où j'en suis maintenant."

Son conseil aux nouveaux arrivants: "N'attendez pas. Allez au CARI dès votre première semaine. Chaque jour que vous perdez, c'est un jour de retard sur votre intégration."`,
    },
    // --- Item 6: ACTUALITÉ ---
    {
      id: 6,
      type: "text",
      contentType: "actualite",
      category: "emploi",
      title: "Salon de l'emploi immigrant — 15 mars 2025",
      excerpt:
        "Plus de 30 employeurs confirmés. Apportez vos CV! Inscription gratuite mais obligatoire.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-18",
      content: `Le CARI Saint-Laurent organise son salon annuel de l'emploi dédié aux personnes immigrantes. Plus de 30 employeurs de la région de Montréal seront présents.

## Informations pratiques

- Date: 15 mars 2025
- Heure: 10h00 à 16h00
- Lieu: CARI Saint-Laurent, 774 boul. Décarie, Bureau 300
- Inscription: Gratuite mais obligatoire

## Employeurs confirmés

Des entreprises de secteurs variés seront présentes: technologies de l'information, santé, construction, services financiers, commerce de détail et plus encore.

## Préparez-vous

### Avant le salon
- Mettez votre CV à jour (format québécois)
- Préparez votre "pitch" de 30 secondes
- Recherchez les entreprises présentes

### Le jour du salon
- Apportez plusieurs copies de votre CV
- Habillez-vous de manière professionnelle
- Soyez prêt à passer des mini-entrevues

Le CARI offre des ateliers de préparation gratuits dans les semaines précédant le salon. Inscrivez-vous!`,
    },
    // ========== MODAL ONLY (items 7+) ==========
    // --- Item 7: GUIDE ---
    {
      id: 7,
      type: "text",
      contentType: "guide",
      category: "accueil",
      title:
        t.news?.guides?.["7"]?.title || "Préparer son premier hiver québécois",
      excerpt:
        t.news?.guides?.["7"]?.excerpt ||
        "Vêtements, transport, chauffage, activités: tout ce qu'il faut savoir pour apprécier l'hiver montréalais.",
      image:
        "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-15",
      content: `L'hiver québécois fait rêver ou fait peur, mais une chose est certaine: avec la bonne préparation, il devient une saison extraordinaire plutôt qu'une épreuve.

## À quoi s'attendre

L'hiver s'installe généralement en décembre et dure jusqu'à fin mars. À Montréal, les températures oscillent entre -5°C et -20°C la plupart du temps, avec des pointes occasionnelles à -30°C en janvier (température ressentie). Montréal reçoit en moyenne 210 cm de neige par hiver. Les opérations de déneigement sont impressionnantes et efficaces.

## S'habiller: la technique des trois couches

Comme on dit ici: « Il n'y a pas de mauvaise température, seulement de mauvais vêtements. »

Première couche (contre la peau): Sous-vêtements techniques en laine mérinos ou synthétique qui évacuent l'humidité. Évitez le coton qui absorbe la transpiration et vous refroidit.

Deuxième couche (isolation): Polar, laine ou duvet léger qui emprisonne la chaleur.

Troisième couche (protection): Manteau d'hiver coupe-vent et imperméable. Choisissez un manteau long (sous les hanches), avec capuche. Budget: 150 $ (Décathlon) à 500 $+ (Kanuk, Quartz Co., Rudsak).

Les essentiels: bottes d'hiver imperméables et antidérapantes, tuque (bonnet), mitaines chaudes, foulard ou cache-cou, caleçon long les jours les plus froids.

Astuce: Achetez vos vêtements d'hiver une fois arrivé au Québec. Surveillez les soldes du Boxing Day (26 décembre) et du Vendredi fou (fin novembre).

## Votre logement en hiver

Votre appartement sera bien chauffé — les propriétaires sont tenus de maintenir 21°C minimum. Le chauffage est souvent inclus dans le loyer. Gardez vos fenêtres bien fermées, utilisez un humidificateur, déblayez la neige devant votre porte et respectez les opérations de déneigement.

## Se déplacer en hiver

Le métro de Montréal fonctionne sans interruption due à la météo. Pneus d'hiver obligatoires du 1er décembre au 15 mars (400 à 800 $ le jeu). Pour les piétons: crampons amovibles (10-20 $ chez Canadian Tire).

## Profiter de l'hiver

Patinage (patinoires gratuites partout), ski de fond et raquette (parc-nature du Bois-de-Liesse près de Saint-Laurent), glissade sur tube, festivals (Montréal en lumière, Igloofest, Fête des neiges).

## Prendre soin de votre santé mentale

Les journées courtes et le froid peuvent affecter votre moral. Sortez chaque jour même 15 minutes, restez actif, maintenez votre vie sociale. La dépression saisonnière est courante et se traite bien.`,
    },
    // --- Item 8: HISTOIRE ---
    {
      id: 8,
      type: "audio",
      contentType: "histoire",
      category: "femmes",
      title: "Trois femmes, trois continents, une même force",
      excerpt:
        "Maria, Linh et Amina partagent comment elles ont reconstruit leur vie au Québec.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-05",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "24:15",
      content: `Dans cet épisode spécial de notre série "Femmes du monde", nous recevons trois femmes inspirantes qui partagent leur parcours d'immigration et d'intégration au Québec.

## Les invitées

### Maria, de Colombie
Professionnelle établie depuis 10 ans, Maria revient sur son parcours et donne ses conseils aux nouvelles arrivantes.

### Linh, du Vietnam
Récemment arrivée, Linh partage les défis liés à la barrière linguistique et comment les ateliers du CARI l'ont aidée à s'adapter.

### Amina, du Maroc
Arrivée il y a 5 ans, Amina nous parle de son expérience en tant que mère célibataire et comment elle a réussi à concilier études, travail et vie familiale.

## Thèmes abordés
- L'importance du réseau de soutien
- La reconnaissance des diplômes
- L'équilibre travail-famille
- Les ressources communautaires disponibles
- La résilience et l'adaptation culturelle

Un épisode rempli d'espoir et de conseils pratiques pour toutes les femmes en processus d'immigration.`,
    },
    // --- Item 9: ACTUALITÉ ---
    {
      id: 9,
      type: "text",
      contentType: "actualite",
      category: "accueil",
      title: "Le CARI lance son aide au logement",
      excerpt:
        "Face à la crise du logement, le CARI déploie une équipe dédiée pour aider les nouveaux arrivants.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-22",
      content: `Face à la crise du logement qui touche particulièrement les personnes immigrantes, le CARI Saint-Laurent déploie une nouvelle équipe dédiée à l'accompagnement en logement.

## Le constat

Les nouveaux arrivants font face à des défis uniques:
- Manque d'historique de crédit canadien
- Méconnaissance des droits locataires
- Barrière linguistique dans les négociations
- Discrimination au logement

## Nos nouveaux services

### Accompagnement personnalisé
Un conseiller vous aide dans toutes les étapes: recherche, visite, négociation, signature du bail.

### Ateliers sur les droits des locataires
Comprendre la Régie du logement, vos droits et vos recours.

### Médiation
En cas de conflit avec un propriétaire, notre équipe peut intervenir.

### Aide d'urgence
Pour les situations de logement précaires, nous offrons un service de référence vers des ressources d'hébergement.

## Comment accéder au service

Prenez rendez-vous avec notre équipe logement au 514-748-2007 ou passez directement à nos bureaux.`,
    },
    // --- Item 10: GUIDE ---
    {
      id: 10,
      type: "text",
      contentType: "guide",
      category: "accueil",
      title:
        t.news?.guides?.["10"]?.title ||
        "Comprendre le système de santé québécois",
      excerpt:
        t.news?.guides?.["10"]?.excerpt ||
        "RAMQ, médecin de famille, urgences, pharmacies: guide complet du système de santé pour les nouveaux arrivants.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-10",
      content: `Le système de santé du Québec est public et universel, financé par les impôts. C'est une excellente couverture, mais il fonctionne différemment de ce que vous avez peut-être connu.

## La RAMQ: votre passeport santé

Votre carte d'assurance maladie (la « carte soleil ») vous donne accès aux consultations médicales, examens, analyses, hospitalisations et chirurgies dans le réseau public — sans frais.

Pour vous inscrire: demande en ligne sur le site de la RAMQ ou en personne avec passeport, preuve d'immigration et preuve d'adresse.

Délai de carence: 3 mois (sauf si vous venez de France, Belgique, Danemark, Suède, Grèce, Finlande, Norvège, Luxembourg ou Portugal — formulaire SE-401-Q-207). Souscrivez une assurance privée temporaire pendant ce délai.

## Quand et où consulter

811 (Info-Santé): infirmière 24h/24 gratuite, premier réflexe pour un problème non urgent.

GAP (811 option 3): Guichet d'accès à la première ligne, consultation dans les 36 heures.

Rendez-vous santé Québec (rvsq.gouv.qc.ca): rendez-vous en ligne gratuit dans une clinique près de chez vous.

Bonjour Santé: service payant mais efficace pour rendez-vous dans les 24 heures.

Urgences: pour les cas graves. Temps d'attente souvent longs pour les cas non critiques. Hôpitaux proches de Saint-Laurent: Sacré-Cœur, Lakeshore.

## Le médecin de famille

Inscription au Guichet d'accès à un médecin de famille (GAMF) via Carnet santé Québec. Délai: quelques mois à plus d'un an. En attendant: GAP, cliniques sans rendez-vous, infirmières praticiennes.

## Ce que la RAMQ couvre et ne couvre pas

Couvert: consultations médecin, examens, hospitalisations, chirurgies, urgences, grossesse, soins dentaires enfants < 10 ans.

Non couvert: soins dentaires adultes, lunettes/optique (sauf < 18 ans et 65+), psychothérapie, physiothérapie privée, ambulance (125-400 $).

Conseil: si votre employeur offre une assurance collective, prenez-la.

## Pour les enfants

Tous les enfants résidant au Québec sont couverts par la RAMQ, quel que soit le statut d'immigration des parents. Vaccins gratuits dans les CLSC et à l'école.`,
    },
    // --- Item 11: HISTOIRE ---
    {
      id: 11,
      type: "video",
      contentType: "histoire",
      category: "parents",
      title: "Activités familiales d'hiver: Découvrir le Québec en famille",
      excerpt:
        "Profitez de l'hiver québécois avec vos enfants! Découvrez les meilleures activités familiales.",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-18",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      duration: "12:18",
      content: `L'hiver québécois peut sembler intimidant pour les nouveaux arrivants, mais c'est une saison magnifique à découvrir en famille!

## Activités gratuites ou peu coûteuses

### Patinage
De nombreux parcs offrent des patinoires extérieures gratuites.

### Glissade
Les parcs municipaux ont des pentes de glissade accessibles à tous.

### Festivals d'hiver
- Fête des Neiges (Parc Jean-Drapeau)
- Igloofest (Vieux-Port)
- Carnaval de Québec

## S'habiller pour l'hiver

### Pour les enfants
- Habit de neige une-pièce
- Bottes d'hiver imperméables
- Mitaines et tuque

## Bibliothèques et centres communautaires

Les bibliothèques municipales offrent l'heure du conte, des ateliers créatifs et des espaces de jeux intérieurs gratuits.

Le CARI organise des sorties familiales mensuelles pour découvrir le Québec ensemble!`,
    },
    // --- Item 12: ACTUALITÉ ---
    {
      id: 12,
      type: "video",
      contentType: "actualite",
      category: "femmes",
      title: "Atelier entrepreneuriat féminin — Février 2025",
      excerpt:
        "Retrouvez l'enregistrement de notre atelier sur les ressources et programmes d'aide aux femmes entrepreneures.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-12",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      duration: "45:23",
      content: `Enregistrement complet de notre atelier sur l'entrepreneuriat féminin, animé en partenariat avec Femmes d'Affaires du Québec.

## Au programme

### 1. Le paysage entrepreneurial québécois
- Statistiques sur les femmes entrepreneures
- Secteurs porteurs
- Défis spécifiques aux femmes immigrantes

### 2. Programmes d'aide financière
- PME MTL Centre-Ville
- Fonds d'emprunt Québec (FEQ)
- Banque de développement du Canada (BDC)
- Fonds Femmes ESSOR

### 3. Formation et accompagnement
- Centre d'entrepreneuriat de l'École HEC
- Carrefour Jeunesse-Emploi
- SAJE Montréal

### 4. Réseautage et mentorat
L'importance de développer son réseau professionnel et de trouver des mentores.

## Témoignages
Trois entrepreneures immigrantes partagent leur parcours.

Inscrivez-vous à notre prochain café-rencontre entrepreneurial!`,
    },
    // --- Item 13: GUIDE ---
    {
      id: 13,
      type: "text",
      contentType: "guide",
      category: "francisation",
      title:
        t.news?.guides?.["13"]?.title ||
        "5 applications gratuites pour apprendre le français",
      excerpt:
        t.news?.guides?.["13"]?.excerpt ||
        "Complétez vos cours avec ces applications mobiles recommandées par nos professeurs de francisation.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-08",
      content: `Les cours de francisation sont essentiels, mais votre apprentissage ne devrait pas s'arrêter à la fin de la journée.

## 1. Mauril (Radio-Canada) — Pour le français d'ici

L'application à télécharger en priorité. Développée par Radio-Canada, Mauril utilise du vrai contenu canadien (reportages, entrevues, sketches) pour enseigner le français tel qu'on le parle au Québec. Contenu authentique, tous niveaux, totalement gratuit. Disponible sur iOS, Android et web (mauril.ca).

## 2. Duolingo — Pour la régularité

Exercices courts (5-15 minutes), séries quotidiennes, système de points motivant. Parcours bien structuré du niveau zéro à intermédiaire. Limite: français standardisé (France), pas spécifiquement québécois. Utilisez Duolingo pour la grammaire et Mauril pour le français d'ici.

## 3. TV5 Monde "Apprendre le français" — Pour la compréhension

Centaines d'exercices classés par niveau (A1 à B2), basés sur de vrais reportages télévisés. Contenu riche et constamment mis à jour. Disponible sur apprendre.tv5monde.com.

## 4. Busuu — Pour la pratique écrite

Vos exercices écrits sont corrigés par des locuteurs natifs francophones, et vous pouvez aider quelqu'un qui apprend votre langue en retour. Plans d'étude personnalisés, version gratuite généreuse.

## 5. Podcasts — Pour l'écoute passive

Écoutez dans le métro, en marchant, en cuisinant. Recommandations: Français Authentique (classique), innerFrench (intermédiaire), Balado CARI (témoignages de nouveaux arrivants), C'est la vie — Radio-Canada (culture québécoise).

## La combinaison gagnante

Mauril ou Duolingo 10 minutes chaque matin. Un podcast pendant les trajets. Un exercice TV5 Monde le soir. Et surtout, parlez français le plus possible au quotidien.`,
    },
    // --- Item 14: GUIDE ---
    {
      id: 14,
      type: "text",
      contentType: "guide",
      category: "accueil",
      title:
        t.news?.guides?.["14"]?.title ||
        "Trouver un logement à Montréal: le guide de survie",
      excerpt:
        t.news?.guides?.["14"]?.excerpt ||
        "Bail, droits du locataire, où chercher, arnaques à éviter: tout pour trouver votre chez-vous à Montréal.",
      image:
        "https://plus.unsplash.com/premium_photo-1712171185603-c8cc8f0e9a7a?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-01-22",
      content: `Le marché du logement à Montréal est tendu, surtout pour les nouveaux arrivants sans historique de crédit ni références locales.

## Comment fonctionne la location

La majorité des baux sont de 12 mois, du 1er juillet au 30 juin. Le bail est un contrat standardisé régi par le Tribunal administratif du logement (TAL). Une fois signé, ni vous ni le propriétaire ne pouvez l'annuler unilatéralement.

Où chercher: Kijiji, Facebook Marketplace, groupes Facebook "Appartements Montréal", Centris.ca, Kangalou.com, bouche à oreille et CARI.

## Vos droits comme locataire

Un propriétaire ne peut PAS: exiger un dépôt de sécurité (illégal au Québec), vous discriminer, entrer chez vous sans 24h de préavis, augmenter le loyer de façon abusive.

Un propriétaire peut: demander des références, vérifier votre crédit, demander une preuve de revenus.

Documents à préparer: pièces d'identité, preuve de revenus ou relevés bancaires, NAS, références.

## Budget approximatif

- Studio: 800-1200 $
- 3½ (1 chambre): 1000-1500 $
- 4½ (2 chambres): 1200-1800 $
- 5½ (3 chambres): 1400-2200 $

En plus: Hydro-Québec 80-150 $, internet 50-80 $, assurance habitation 20-40 $.

## Se protéger des arnaques

Ne jamais payer avant de visiter, se méfier des prix trop bas, ne jamais signer à distance, vérifier l'identité du propriétaire.

Le CARI offre un service de consultation personnalisé pour la recherche de logement.`,
    },
    // --- Item 15: GUIDE ---
    {
      id: 15,
      type: "text",
      contentType: "guide",
      category: "emploi",
      title:
        t.news?.guides?.["15"]?.title ||
        "Chercher un emploi au Québec: ce que personne ne vous dit",
      excerpt:
        t.news?.guides?.["15"]?.excerpt ||
        "CV québécois, entrevue, réseautage, marché caché: les codes du marché du travail d'ici.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-02-05",
      content: `Trouver un emploi au Québec ne se résume pas à envoyer des CV. Le marché du travail a ses propres codes culturels.

## Le CV québécois

Pas de photo (jamais). Pas d'informations personnelles (âge, statut matrimonial, nationalité, religion). Maximum 2 pages. Structure: profil professionnel, compétences clés, expérience (plus récente d'abord), formation, langues. Adaptez chaque CV à chaque offre.

## L'entrevue: racontez une histoire

Questions comportementales fréquentes. Technique STAR: Situation, Tâche, Action, Résultat. Préparez 5-6 exemples concrets. Attention au piège culturel: au Québec, une entrevue n'est pas le moment d'être modeste. Dites "j'ai réalisé" plutôt que "on a fait".

## Le réseautage: votre arme secrète

60-80 % des postes sont comblés sans être affichés. LinkedIn en français, événements de réseautage, activités du CARI, bénévolat dans votre domaine, cafés informationnels.

## Où chercher

Emploi Québec, Indeed.ca, LinkedIn Jobs, Jobboom, agences de placement (Randstad, Adecco, Robert Half), sites spécialisés.

## La première expérience canadienne

Acceptez un poste connexe même en dessous de votre niveau, faites du bénévolat professionnel, explorez les programmes de subventions salariales via Emploi-Québec, participez aux programmes de mentorat.

## Normes du travail

Semaine de 40h, 2 semaines de vacances après 1 an, protection contre le congédiement injuste après 2 ans.`,
    },
    // --- Item 16: GUIDE ---
    {
      id: 16,
      type: "text",
      contentType: "guide",
      category: "accueil",
      title:
        t.news?.guides?.["16"]?.title ||
        "Gérer vos finances et comprendre les impôts au Québec",
      excerpt:
        t.news?.guides?.["16"]?.excerpt ||
        "Taxes, crédit, budget, allocations familiales: les bases pour gérer votre argent intelligemment.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      author: "Équipe CARI",
      date: "2025-02-12",
      content: `L'argent fonctionne différemment au Québec — entre les taxes de vente, les deux paliers d'impôt et le système de crédit, il y a beaucoup à apprendre.

## Les taxes: le prix affiché n'est pas le prix payé

TPS (fédérale) 5 % + TVQ (provinciale) 9,975 % = environ 15 % de plus que le prix affiché. Exemptés: épicerie de base, médicaments sur ordonnance, certains vêtements pour enfants.

## Le pourboire

15-20 % avant taxes au restaurant. 15 % pour coiffeurs, taxis, livreurs. Truc rapide: le montant des deux taxes ≈ 15 %.

## Le système d'impôt

Deux déclarations séparées: fédéral (ARC) et provincial (Revenu Québec). Date limite: 30 avril. Même avec peu de revenus, produisez votre déclaration pour accéder à l'Allocation canadienne pour enfants, l'Allocation famille du Québec, le crédit TPS/TVH et le crédit d'impôt pour solidarité.

Le CARI offre un service d'aide aux impôts (mars-avril).

## Bâtir votre crédit

Votre score commence à zéro au Canada (300 à 900). Obtenez une carte de crédit garantie, utilisez-la régulièrement, payez TOUJOURS le solde complet, payez toutes vos factures à temps, n'utilisez pas plus de 30 % de votre limite. Vérification gratuite: Equifax ou TransUnion.

## Budget mensuel approximatif (personne seule)

- Logement: 1000-1400 $
- Épicerie: 300-500 $
- Transport STM: 100 $
- Téléphone: 40-70 $
- Internet: 50-80 $
- Hydro: 60-120 $
- Assurance habitation: 20-40 $
- Divers: 200-400 $
- Total: 1770-2710 $

## Allocations auxquelles vous avez droit

ACE (par enfant < 18 ans), Allocation famille QC, crédit TPS/TVH, crédit solidarité, prime au travail. Toutes calculées à partir de votre déclaration de revenus.`,
    },
  ];

  const headerRef = useScrollReveal();
  const filtersRef = useScrollReveal();
  const gridRef = useScrollRevealGroup();
  const ctaRef = useScrollReveal();

  // First 4 cards shown on homepage (single row of 4)
  const displayedNews = newsItems.slice(0, 4);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setIsNewsModalOpen(true);
  };

  const openModalWithFilter = (filter) => {
    setModalFilter(filter);
    setIsMoreContentModalOpen(true);
  };

  const closeNewsModal = () => {
    setIsNewsModalOpen(false);
    setTimeout(() => setSelectedNews(null), 300);
  };

  const closeMoreContentModal = () => {
    setIsMoreContentModalOpen(false);
  };

  // Filter items in modal
  const filteredModalItems =
    modalFilter === "all"
      ? newsItems
      : newsItems.filter((item) => item.contentType === modalFilter);

  // Get icon for content type
  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return "video";
      case "audio":
        return "mic";
      case "text":
      default:
        return "file-text";
    }
  };

  // Render a news card (reused in homepage and modal)
  const renderCard = (news, onClick) => (
    <div
      key={news.id}
      className="news-card scroll-reveal-child"
      onClick={() => onClick(news)}
    >
      {/* Content Type Icon */}
      <div className="news-type-icon">
        <Icon name={getTypeIcon(news.type)} size={16} />
      </div>

      {/* Image */}
      <div className="news-image-wrapper">
        <img src={news.image} alt={news.title} className="news-image" />
        {news.duration && (
          <span className="news-duration">{news.duration}</span>
        )}
      </div>

      {/* Card Body */}
      <div className="news-card-body">
        <div className="news-badges">
          <span
            className="news-content-type-badge"
            style={{
              backgroundColor: contentTypeConfig[news.contentType].color,
              color: contentTypeConfig[news.contentType].textColor,
            }}
          >
            {contentTypeLabels[news.contentType]}
          </span>
          <span className="news-category">
            {categories[news.category]?.label || news.category}
          </span>
        </div>

        <h3 className="news-title">{news.title}</h3>
      </div>
    </div>
  );

  return (
    <>
      <section id="ressources" className="news-section">
        <div className="container">
          <div className="section-header scroll-reveal" ref={headerRef}>
            <h2 className="section-title">{t.newsSection.title}</h2>
            <p className="section-subtitle">{t.newsSection.subtitle}</p>
          </div>

          {/* Filter Pills - clicking opens modal pre-filtered */}
          <div className="news-filters-compact scroll-reveal" ref={filtersRef}>
            {Object.entries(filterLabels).map(([key, label]) => (
              <button
                key={key}
                className={`filter-pill news-filter-${key}`}
                onClick={() => openModalWithFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* News Cards Grid - always shows items 1-6 */}
          <div className="news-grid" ref={gridRef}>
            {displayedNews.map((news) => renderCard(news, handleNewsClick))}
          </div>

          {/* CTA */}
          <div className="section-cta scroll-reveal-scale" ref={ctaRef}>
            <button
              className="btn-primary"
              onClick={() => openModalWithFilter("all")}
            >
              {t.news.moreContentButton}
            </button>
          </div>
        </div>
      </section>

      {/* Modal - Shows all items with filter pills */}
      {isMoreContentModalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeMoreContentModal();
            }
          }}
        >
          <div className="modal-content modal-more-content">
            <button
              className="modal-close"
              onClick={closeMoreContentModal}
              aria-label={t.aria.close}
            >
              <Icon name="x" size={24} />
            </button>

            {/* Modal Filter Pills */}
            <div className="news-filters-compact modal-filters">
              {Object.entries(filterLabels).map(([key, label]) => (
                <button
                  key={key}
                  className={`filter-pill news-filter-${key} ${modalFilter === key ? "active" : ""}`}
                  onClick={() => setModalFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="news-grid">
              {filteredModalItems.map((news) => (
                <div
                  key={news.id}
                  className="news-card"
                  onClick={() => {
                    closeMoreContentModal();
                    handleNewsClick(news);
                  }}
                >
                  <div className="news-type-icon">
                    <Icon name={getTypeIcon(news.type)} size={16} />
                  </div>

                  <div className="news-image-wrapper">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="news-image"
                    />
                    {news.duration && (
                      <span className="news-duration">{news.duration}</span>
                    )}
                  </div>

                  <div className="news-card-body">
                    <div className="news-badges">
                      <span
                        className="news-content-type-badge"
                        style={{
                          backgroundColor:
                            contentTypeConfig[news.contentType].color,
                          color: contentTypeConfig[news.contentType].textColor,
                        }}
                      >
                        {contentTypeLabels[news.contentType]}
                      </span>
                      <span className="news-category">
                        {categories[news.category]?.label || news.category}
                      </span>
                    </div>

                    <h3 className="news-title">{news.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* News Content Modal - Shows full article/video/audio */}
      <NewsModal
        isOpen={isNewsModalOpen}
        onClose={closeNewsModal}
        news={selectedNews}
        currentLanguage={currentLanguage}
        translations={translations}
      />
    </>
  );
};

export default News;
