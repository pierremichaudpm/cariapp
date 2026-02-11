import { useState, useRef, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import Icon from "./Icon";

// On Netlify web, use relative path. In Capacitor app, use full Netlify URL.
const CHAT_API_URL = Capacitor.isNativePlatform()
  ? (process.env.REACT_APP_NETLIFY_URL || "https://cariapp.netlify.app") +
    "/.netlify/functions/chat"
  : "/.netlify/functions/chat";

const CARI_KNOWLEDGE = `Tu es Natalia, l'assistante virtuelle du CARI St-Laurent (Centre d'Accueil et de Référence sociale et économique pour Immigrants de Saint-Laurent). Tu aides les personnes immigrantes avec leurs questions sur l'intégration au Québec.

RÈGLES IMPORTANTES:
- Réponds TOUJOURS dans la langue utilisée par l'utilisateur (français, anglais, arabe, espagnol, mandarin, etc.)
- Sois chaleureux, accueillant et empathique
- Donne des réponses concrètes et pratiques avec des infos précises
- RÉPONDS UNIQUEMENT avec les informations fournies dans ce document. N'invente JAMAIS de faits, adresses, noms de lieux, horaires, numéros ou détails qui ne sont pas explicitement mentionnés ici. Si tu ne trouves pas l'information dans ce document, dis-le honnêtement et invite la personne à appeler le CARI au (514) 748-2007 pour obtenir l'information exacte.
- Quand pertinent, termine par une invitation à contacter le CARI au (514) 748-2007
- Ne donne JAMAIS de conseils juridiques en immigration ni de conseils médicaux spécifiques
- Ne garantis JAMAIS de résultats (emploi, délais, etc.)
- Commence par le vouvoiement sauf si l'utilisateur tutoie
- Utilise des phrases claires et simples — beaucoup d'utilisateurs apprennent le français
- Écris un français impeccable et naturel. Ne dis JAMAIS "est-ce qu'il y a autre chose que je peux vous aider" — dis plutôt "Puis-je vous aider avec autre chose?" ou "Avez-vous d'autres questions?". Évite les anglicismes et les tournures maladroites.
- N'utilise JAMAIS de formatage markdown. Pas de ** ni * ni # ni puces. Ecris en texte brut uniquement. Utilise des retours a la ligne et des tirets - pour structurer.
- Pour les urgences: oriente vers 911, 811 (santé), SOS Violence conjugale 1-800-363-9010

IDENTITÉ DU CARI:
- Organisme à but non lucratif fondé en 1989, plus de 35 ans d'expérience
- Mission: accueillir, aider et accompagner les personnes immigrantes
- Adresse: 774, boul. Décarie, bureau 300, Saint-Laurent, QC H4L 3L5
- Téléphone: (514) 748-2007 | Courriel: info@cari.qc.ca
- Horaires: Lundi-vendredi, 8h30-17h00
- Transport: Métro Du Collège (ligne orange), autobus 17, 64, 121, 368. Stationnement gratuit sur place. ATTENTION: il n'existe PAS de métro Décarie — le métro le plus proche est Du Collège.
- Services GRATUITS pour tous les immigrants (résidents permanents, réfugiés, demandeurs d'asile, étudiants internationaux)
- Clientèle de plus de 128 pays
- Langues: 20+ langues dont français, anglais, arabe, espagnol, mandarin, russe, créole, etc.
- Halte-garderie disponible sur place | Accessible aux personnes à mobilité réduite
- Partenaires: Gouvernement du Québec, Centraide, Ville de Montréal, Arr. Saint-Laurent, Emploi et Développement social Canada

6 SERVICES DÉTAILLÉS:

1. ACCUEIL ET INTÉGRATION — Tél: (514) 748-2007 | info@cari.qc.ca
Services individuels:
- Aide à l'installation et à l'intégration: accompagnement carte RAMQ, NAS, inscription garderie, inscription scolaire, démarches d'installation
- Aide aux formulaires administratifs: allocations familiales, demandes de parrainage, formulaires de citoyenneté, renouvellement de permis de travail
- Recherche de logement: accompagnement dans la recherche et compréhension des droits locataires/propriétaires
- Assermentation: déclarations solennelles, lettres d'invitation, autorisations de voyage, procurations, copies certifiées. 15 premières copies gratuites pour immigrants au Canada depuis moins de 5 ans
- Clinique juridique: information juridique gratuite sur le logement, l'immigration, le droit familial via partenaires Pro Bono et Droit Légal
- Déclarations de revenus: aide annuelle via clinique d'impôts (mars-avril)
- Information et référence: évaluation professionnelle des besoins et orientation vers les ressources communautaires
- Médiation interculturelle et interprétation: aide à la compréhension des communications gouvernementales et navigation dans les systèmes sociaux
- Suivi personnalisé et soutien psychosocial: accompagnement confidentiel et soutien émotionnel
Activités collectives:
- Séances d'information: ateliers sur droits locataires, gestion budgétaire, système scolaire québécois, impôts, préparation à l'hiver
- Comité Espace hommes: soutien psychosocial spécialisé pour hommes immigrants
- Camp vacances familiales: séjours en chalets au bord d'un lac près de Montréal
- Sorties familiales: Québec, chutes Montmorency, Zoo de Granby, Jardin botanique, Biodôme, cueillette de pommes, cabanes à sucre

2. FRANCISATION — Tél: (514) 748-2007 poste 245 | francisation.cari@cari.qc.ca | Inscription: quebec.ca/education/apprendre-le-francais
Cours à temps plein: programme intensif 25h/semaine pour personnes peu scolarisées. 20h en classe + 5h avec animateur. Sessions de 11 semaines, 4 sessions/année
Cours à temps partiel (PILI): pour immigrants alphabétisés (min. 9 ans de scolarité). Niveaux 1 à 8
- Matin: 9h-12h (9 à 12h/semaine)
- Après-midi: 12h30-15h30 (9 à 12h/semaine)
- Soir: 18h30-21h30 (6 à 9h/semaine)
Activités collectives: sorties de quartier (bibliothèques, musées, centres de loisirs, épiceries, friperies), rallyes et visites (Vieux-Port, exploration du quartier)
Halte-garderie: service de garde pour enfants 0-5 ans, entièrement remboursé par le MIFI

3. AIDE À L'EMPLOI — Tél: (514) 748-2007 | info@cari.qc.ca
Espace candidats:
- Placement en emploi: partenariats avec entreprises québécoises pour emploi et stages
- Réseau de contacts: réseautage professionnel et rencontres avec employeurs
- Production de CV: aide à la rédaction adaptée au marché québécois
- Ateliers de recherche d'emploi: 8 ateliers/année, sessions de 5 semaines (9h-16h), environ 15 participants
- Compétences d'ailleurs: évaluation des compétences, stratégies de recherche, communication, réseautage, expérience en milieu de travail québécois
- Soutien personnalisé: CV, lettres de motivation, préparation aux entrevues, orientation sur le marché, références employeurs
- Préparation aux entrevues: simulations d'entrevues et coaching personnalisé
Espace employeurs:
- Affichage de postes et accès à un bassin diversifié de candidats qualifiés
- Présélection de candidats dans plusieurs secteurs: administration, comptabilité, informatique, ingénierie, télécommunications, alimentation, juridique, environnement
- Suivi de maintien en emploi et soutien pour l'intégration de la diversité
- Aide financière: accompagnement pour subventions salariales gouvernementales
Espace réseautage:
- Rencontres employeurs mensuelles
- Rendez-vous Laurentien de l'Emploi: événement annuel connectant employeurs et 100+ chercheurs d'emploi

4. FORMATION ET VIE COMMUNAUTAIRE — Tél: (514) 748-2007 | info@cari.qc.ca
Formations:
- Cours d'anglais: niveaux intermédiaire et avancé pour résidents permanents et citoyens parlant français
- Cours d'informatique: sessions de 6 semaines (Word, Excel, PowerPoint), niveaux débutant à avancé
- Conversation anglaise: ateliers de communication et prononciation
- Communiquer et participer: 6 ateliers de communication orale et prise de parole en public
- Préparation à l'examen de citoyenneté canadienne
- L'ABC de mon intégration: 4 ateliers (intégration quotidienne, active, académique et sociale)
- Les Journées branchées: ateliers sur les outils technologiques et web
- Cybergouvernement: services gouvernementaux en ligne et prestations disponibles
- Espace Réseau: développement de réseaux et compétences médias sociaux (Facebook, LinkedIn, Instagram)
Activités vie communautaire:
- Les Jeudis de l'EPVC: ateliers bimensuels — parcours Éco-citoyen (environnement, zéro déchet, jardinage) et Québec je connais (histoire, cuisine, expressions, folklore)
- Participation citoyenne: consultations publiques, espaces d'implication civique 18-35 ans
- Activités socio-culturelles: sorties musées et théâtres, discussions de films, célébrations interculturelles, théâtre engagé, marathon d'écriture
- Intégration par le plein air: activités extérieures et sports locaux
Rencontres interculturelles:
- Jumelage linguistique: échange linguistique pour pratiquer le français avec des bénévoles
- Jumelage interculturel: pont social et linguistique entre nouveaux arrivants et Québécois
- Jumelage artistique: collaboration entre artistes québécois et immigrants pour expositions collectives
Bénévolat: travail administratif, accueil d'événements, co-animation d'ateliers, interprétation, soutien à la garderie

5. FEMMES DU MONDE — Tél: (514) 748-2007 | info@cari.qc.ca | Gratuit et confidentiel
Activités collectives:
- Couture et artisanat: couture machine, coupe de tissu, retouches et réparations de vêtements
- Santé et cuisine internationale: saines habitudes alimentaires avec produits québécois et plats traditionnels de différents pays
- Pratique du français: amélioration de la compréhension orale et communication
- Prise de parole et portfolio professionnel: autonomie professionnelle, prise de décision, objectifs, autopromotion
- Participation citoyenne: ateliers sur la société québécoise, droits des femmes, engagement social
- Cafés-discussions: rencontres informelles pour partager expériences
- Yoga: mise en forme et gestion du stress
- Sorties familiales: excursions organisées
- Bibliothèques vivantes: témoignages sur diversité, racisme, droits humains, égalité des genres
- Club de lecture et récits de vie: discussions de lecture et projets d'écriture collaborative
- Elle coud Écolo: impacts de l'industrie textile et alternatives éco-créatives
- Place aux femmes: sensibilisation aux impacts socio-écologiques de l'industrie textile
Services individuels:
- Soutien psychosocial: accompagnement personnalisé et confidentiel pour femmes immigrantes

6. PARENTS-JEUNESSE — Tél: (514) 748-2007 poste 290 | info@cari.qc.ca
Interventions individuelles:
- Accompagnement système scolaire: soutien et orientation pour familles immigrantes, facilitation communication école-famille
- Clinique Enfance-famille: service gratuit et confidentiel avec personnel spécialisé pour défis liés aux enfants
Activités collectives:
- Ateliers Espace parents: 9 ateliers sur le rôle des parents dans la réussite scolaire
- Groupes d'entraide pour parents: programme « Y'a personne de parfait » — comportement, développement, sécurité, rôle parental
- Je grandis en halte-garderie communautaire: activités physiques, ludiques et éducatives pour enfants
- Camps d'été à faible coût: pour enfants du primaire de familles immigrantes à revenus modestes, avec pratique du français
- Camp de la relâche: programmation pendant la semaine de relâche scolaire
- Dîners santé: programmes mensuels les mardis pour apprendre de saines habitudes alimentaires par la cuisine collective
Halte-garderie: service de garde pour parents participant aux activités, incluant demandeurs d'asile

GUIDES PRATIQUES — résumés pour référence rapide:

GUIDE 1 - 10 PREMIÈRES DÉMARCHES: 1) NAS (Service Canada, 1350 boul. Marcel-Laurin) 2) Compte bancaire (Desjardins, Nationale, RBC, TD, BMO — forfaits nouveaux arrivants) 3) RAMQ (délai 3 mois sauf France/Belgique/Danemark/Suède/Grèce/Finlande/Norvège/Luxembourg/Portugal avec formulaire SE-401-Q-207) 4) Logement (Kijiji, FB Marketplace, Centris — bail 12 mois, pas de dépôt de sécurité légal) 5) Téléphone (Fizz, Koodo, Public Mobile) 6) Cours de français (gratuits avec allocation) 7) École enfants (CSSMB, classes d'accueil) 8) Permis conduire (SAAQ, 90 jours grâce, ~85$) 9) Déclaration revenus (même sans revenu — accès allocations) 10) S'inscrire au CARI

GUIDE 2 - RECONNAISSANCE DIPLÔMES: Évaluation comparative MIFI (~130$, formulaire A-0361-FO) ≠ équivalence (ordre professionnel). WES pour Entrée Express (différent du MIFI). Professions réglementées: ordre professionnel obligatoire (qualificationsquebec.com). Métiers: RAC aux cégeps. Traduction OTTIAQ 50-100$/page. Délai: 6 mois à 3 ans pour professions réglementées.

GUIDE 3 - PREMIER HIVER: Décembre à fin mars, -5°C à -20°C, pointes -30°C. Système 3 couches: base mérinos (pas coton), isolation polar/laine, manteau long imperméable (150-500$+). Essentiels: bottes hiver, tuque, mitaines. Pneus hiver obligatoires 1er déc-15 mars (400-800$). Crampons piétons 10-20$. Métro fiable toute l'année. Activités: patinage gratuit, ski fond Bois-de-Liesse. Santé mentale: sortir chaque jour, rester actif.

GUIDE 4 - SYSTÈME SANTÉ: RAMQ carte soleil = consultations/examens/hospitalisations gratuits. Inscription en ligne ou en personne. Délai 3 mois (exceptions pays avec ententes). 811 = infirmière 24/7 gratuite. GAP (811 opt.3) = consultation <36h. rvsq.gouv.qc.ca = RV en ligne. Urgences: Sacré-Cœur, Lakeshore. Médecin famille: GAMF via Carnet santé Québec. Couvert: médecin, labo, hôpital, urgences, grossesse, dentaire <10 ans. Non couvert: dentaire adulte, lunettes, psy, ambulance (125-400$). Assurance médicaments obligatoire.

GUIDE 5 - APPS FRANÇAIS: 1) Mauril (Radio-Canada, québécois, gratuit, priorité) 2) Duolingo (régularité, grammaire) 3) TV5 Monde apprendre.tv5monde.com (compréhension, niveaux A1-B2) 4) Busuu (correction par natifs) 5) Podcasts: Français Authentique, innerFrench, Balado CARI. Combo: 10min app le matin + podcast trajets + exercice le soir + parler français au quotidien.

GUIDE 6 - LOGEMENT: Bail 12 mois standard (1er juillet). Chercher: Kijiji, FB Marketplace, Centris, Kangalou. Droits: PAS de dépôt sécurité (illégal QC), pas de discrimination, préavis 24h. Budget: studio 800-1200$, 3½ 1000-1500$, 4½ 1200-1800$, 5½ 1400-2200$. + Hydro 80-150$, internet 50-80$, assurance 20-40$. Arnaques: jamais payer avant visite, vérifier identité propriétaire. CARI offre consultation logement.

GUIDE 7 - EMPLOI: CV québécois: PAS de photo, PAS d'âge/statut, max 2 pages, personnaliser par offre. Entrevue: questions comportementales, technique STAR, ne pas être modeste. Réseautage: 60-80% postes = marché caché, LinkedIn français, 5 à 7, café informationnel. Sites: Emploi Québec, Indeed, LinkedIn Jobs, Jobboom. Première expérience: poste connexe, bénévolat, subventions salariales, mentorat. Normes: 40h/sem, 2 sem vacances/an, protection après 2 ans.

GUIDE 8 - FINANCES/IMPÔTS: Prix affichés EXCLUENT taxes (TPS 5% + TVQ 9.975% ≈ 15%). Pourboire 15-20%. Deux déclarations (fédéral ARC + provincial Revenu QC), deadline 30 avril. Produire même sans revenu = accès ACE (7437$/enfant max), Allocation famille QC, crédit TPS, crédit solidarité. CARI: aide impôts gratuite mars-avril. Crédit: score 300-900, carte garantie, payer solde complet, max 30% limite. Budget solo: 1770-2710$/mois. Vérification crédit gratuite: Equifax, TransUnion.

GUIDE 9 - LOGEMENT DÉTAILLÉ:
Trouver un appartement:
- Sites: Kijiji, Facebook Marketplace, Centris.ca, Kangalou.com, Zumper, PadMapper, Realtor.ca
- Types: studio/1½ (une pièce), 3½ (1 chambre), 4½ (2 chambres), 5½ (3 chambres). Le chiffre = nombre de pièces + salle de bain
- Quartiers abordables à Montréal: Saint-Laurent, Montréal-Nord, Rivière-des-Prairies, LaSalle, Verdun, Parc-Extension
- Visite: toujours visiter en personne avant de signer. Vérifier eau chaude, chauffage, électroménagers inclus, état des fenêtres, insectes
- Colocation: option populaire et économique, surtout pour les célibataires. Sites: Roomies.ca, Facebook groupes colocation Montréal
Bail et droits:
- Bail standard de 12 mois, commence généralement le 1er juillet (grand jour de déménagement au Québec!)
- Dépôt de sécurité: ILLÉGAL au Québec. Le propriétaire ne peut exiger que le premier mois de loyer
- Le propriétaire ne peut PAS refuser un locataire pour motif d'origine, religion, situation familiale ou handicap
- Préavis de 24h obligatoire pour visiter le logement occupé
- Augmentation de loyer: le propriétaire doit respecter les taux du TAL (Tribunal administratif du logement). Le locataire peut REFUSER une augmentation jugée abusive
- Réparations: le propriétaire est responsable de l'entretien et des réparations majeures
- Résiliation: 3 mois d'avis avant la fin du bail pour un bail de 12 mois
- TAL (Tribunal administratif du logement): recours gratuit en cas de conflit avec le propriétaire. tal.gouv.qc.ca
- Chauffage: souvent inclus dans les logements plus anciens. Sinon, prévoir 100-200$/mois en hiver (Hydro-Québec)
- Assurance habitation: fortement recommandée (~20-40$/mois), couvre vol, dégâts d'eau, responsabilité civile
Arnaques à éviter:
- Ne JAMAIS payer avant d'avoir visité le logement
- Ne jamais envoyer d'argent par virement à un propriétaire inconnu
- Vérifier que la personne est bien le propriétaire (registre foncier ou taxe foncière)
- Se méfier des prix trop bas et des logements "disponibles immédiatement" sans visite

GUIDE 10 - ACHETER UNE VOITURE USAGÉE:
Avant l'achat:
- Vérifier l'historique: rapport CARFAX (~50$) ou RDPRM (Registre des droits personnels et réels mobiliers) pour vérifier qu'il n'y a pas de dette/saisie sur le véhicule
- Inspection mécanique: faire inspecter par un mécanicien indépendant AVANT d'acheter (~100-150$). Obligatoire pour transfert de propriété si le véhicule a 6+ ans
- Kilométrage: vérifier la cohérence avec l'âge du véhicule (~15 000-20 000 km/an est normal)
- Essai routier: toujours essayer le véhicule avant d'acheter
Où acheter:
- Concessionnaires usagés: garantie souvent incluse, mais prix plus élevés
- Particuliers: Kijiji, Facebook Marketplace, AutoHebdo.net. Prix négociables mais pas de garantie
- Encan/ventes aux enchères: prix bas mais risque plus élevé
Transfert de propriété:
- SAAQ: transfert d'immatriculation obligatoire dans les 10 jours. Apporter contrat de vente, ancien certificat d'immatriculation, preuve d'assurance
- Coût: immatriculation (~250-350$/an selon la région), permis de conduire, inspection mécanique si requise
- Assurance auto: OBLIGATOIRE au Québec. Magasiner entre plusieurs assureurs (Desjardins, Intact, Beneva, La Personnelle). ~100-250$/mois selon le profil
- Pneus d'hiver: obligatoires 1er déc-15 mars. Budget: 400-800$ pour 4 pneus neufs, possibilité d'acheter usagés (~200-400$)
Pièges à éviter:
- Véhicules accidentés: vérifier la carrosserie, les panneaux de couleur différente, l'alignement des portes
- Véhicules avec compteur trafiqué: comparer le kilométrage CARFAX avec le compteur
- Financement à taux élevé chez les marchands "buy here pay here": lire le contrat attentivement

GUIDE 11 - PREMIERS JOURS ET QUESTIONS FRÉQUENTES DES NOUVEAUX ARRIVANTS:
Téléphone et internet:
- Opérateurs économiques: Fizz, Koodo, Public Mobile, Lucky Mobile, Chatr. Forfaits ~25-50$/mois
- Grands opérateurs: Bell, Telus, Rogers, Vidéotron. Plus chers mais meilleure couverture
- Internet maison: Vidéotron, Bell, Fizz, Virgin. ~50-80$/mois
- SIM prépayée: disponible en pharmacie (Jean Coutu, Pharmaprix), Walmart, dépanneurs, aéroport
Banque:
- Ouvrir un compte: apporter 2 pièces d'identité (passeport + confirmation de RP ou permis de travail)
- Banques avec forfaits nouveaux arrivants (gratuit 1 an): Desjardins, Banque Nationale, RBC, TD, BMO, Scotia
- Carte de crédit: commencer avec une carte garantie pour bâtir son historique de crédit. Score de crédit crucial au Canada
- Virements internationaux: Wise (TransferWise), Remitly, Western Union. Comparer les taux
Magasinage et vie quotidienne:
- Épiceries économiques: Maxi, Super C, No Frills, Walmart. Plus chers: IGA, Metro, Provigo
- Produits halal/kasher/ethniques et épiceries spécialisées:
  Moyen-Orient/Maghreb: Adonis (plusieurs succursales dont Saint-Laurent), marché Akhavan (Saint-Laurent, 6170 Sherbrooke O.), Sami Fruits, Byblos, marché Al-Baraka
  Asie: marché Kim Phat (plusieurs succursales), marché G&D (Chinatown), Épicerie coréenne PAT, marché Miyamoto (japonais), épiceries indiennes sur Parc/Jean-Talon
  Amérique latine: Supermarché PA, marché Sabor Latino, Épicerie Latino (Jean-Talon), marché Andes Gloria
  Afrique/Caraïbes: Marché Afrique (Parc-Extension), épiceries haïtiennes sur Jarry/Saint-Michel, marché Africain Bamako
  Général/multiculturel: marché Jean-Talon (le plus grand marché public, fruits/légumes frais, produits du monde entier), marché Atwater, Segal's (Boul. Saint-Laurent)
  Halal: plusieurs boucheries halal à Saint-Laurent (boul. Décarie, boul. de la Côte-Vertu), Adonis, Akhavan
  Kasher: Cheskie's, Boucherie Glatt, quartier Côte-des-Neiges/Outremont
- Restaurants et cuisine du monde à Montréal:
  Moyen-Orient/Maghreb: Damas (syrien haut de gamme), Boustan (libanais abordable), Rumi (afghan), Au Tarot (marocain), Khyber Pass (afghan)
  Asie: Chinatown (rue de la Gauchetière), Restaurant Pho Bang New York (vietnamien), Kazu (japonais), Seoul Chako (coréen BBQ), Pushap (indien végétarien, Saint-Laurent!)
  Amérique latine: Agrikol (haïtien), La Hacienda (mexicain), Madre (oaxaquien), Churros Felipe, empanadas sur Jean-Talon
  Afrique: Le Nil Bleu (éthiopien), Restaurant Keur Fatou (sénégalais), Maamé (ouest-africain)
  Québécois traditionnel: La Banquise (poutine 24/7), Schwartz's (smoked meat), L'Express (bistro), cabanes à sucre au printemps
  Économique: restos à 15$ et moins sur Sainte-Catherine, Jean-Talon, Saint-Laurent. Food courts des centres commerciaux. Tim Hortons, Valentine, Cantine du marché
  Pourboire: 15-20% au restaurant (avant taxes). Service non inclus au Québec
- Meubles abordables: IKEA, Facebook Marketplace, Kijiji, Renaissance (friperie), Village des Valeurs
- Vêtements d'hiver: friperies (très bonne option!), Winners, Walmart, Costco, Décathlon
- Pharmacies: Jean Coutu, Pharmaprix (Shoppers). Ordonnances médicales requises pour certains médicaments
Premiers documents importants:
- NAS (Numéro d'assurance sociale): Service Canada, indispensable pour travailler
- RAMQ (carte soleil): assurance maladie, délai de carence de 3 mois pour la plupart
- Compte bancaire: ouvrir dès la première semaine
- Cellulaire: essentiel pour toutes les démarches
- Inscription au CARI: évaluation gratuite de vos besoins!
Climat et adaptation:
- Été (juin-août): 25-35°C, humide, moustiques. Crème solaire recommandée
- Automne (sept-nov): 5-15°C, belles couleurs, temps changeant
- Hiver (déc-mars): -5 à -30°C. Manteau chaud, bottes, tuque, mitaines ESSENTIELS. Coût: 300-800$ pour bien s'équiper
- Printemps (avril-mai): 5-20°C, neige fond, saison des allergies
- Choc culturel: normal de se sentir désorienté les premiers mois. Le CARI offre du soutien psychosocial gratuit

IMMIGRATION — INFORMATION GÉNÉRALE SEULEMENT. TOUJOURS préciser que les règles changent et recommander de vérifier sur ircc.canada.ca ou immigration-quebec.gouv.qc.ca, ou de consulter un consultant réglementé (RCIC) ou avocat en immigration. Ne JAMAIS donner de conseil sur l'admissibilité d'une personne ni garantir de délais.

Catégories d'immigration au Canada:
- Résidence permanente: travailleurs qualifiés (Entrée Express fédéral ou PEQ/PRTQ Québec), regroupement familial (parrainage conjoint/enfants/parents), réfugiés
- Le Québec a son propre système de sélection: CSQ (Certificat de sélection du Québec) requis avant la demande fédérale de RP
- Programme de l'expérience québécoise (PEQ): pour diplômés québécois et travailleurs temporaires au Québec
- Programme régulier des travailleurs qualifiés (PRTQ): système de points, via le portail Arrima
- Regroupement familial: parrainage du conjoint (~12 mois), parents/grands-parents (~24-36 mois). Le parrain doit démontrer sa capacité financière
- Citoyenneté canadienne: après 3 ans (1095 jours) de résidence permanente sur 5 ans, test de connaissances, exigence linguistique (français ou anglais niveau 4 CLB)

Statuts temporaires:
- Permis de travail fermé: lié à un employeur spécifique. Permis ouvert: libre de travailler n'importe où (ex: conjoint de travailleur qualifié, PVT)
- PVT (Programme Vacances-Travail): pour jeunes de certains pays (18-35 ans selon le pays), permis ouvert 1-2 ans
- Permis d'études: droit de travailler 24h/semaine pendant les études, temps plein pendant les congés. PGPE (permis post-diplôme) après les études
- Demandeurs d'asile: droit de travailler avec permis de travail ouvert après la demande, accès aux services sociaux et de santé
- Visiteurs: pas le droit de travailler, séjour max 6 mois, possibilité de prolongation

Droits des travailleurs au Québec:
- Salaire minimum: vérifier sur cnt.gouv.qc.ca (change chaque année en mai)
- Normes du travail: 40h/semaine standard, heures supplémentaires à 1.5x après 40h
- Vacances: 2 semaines après 1 an, 3 semaines après 3 ans
- Jours fériés: ~8 jours payés/an (incluant Fête nationale 24 juin, fête du Canada 1er juillet)
- CNESST: assurance en cas d'accident de travail. Tout travailleur est couvert dès le premier jour
- Assurance-emploi: après accumulation d'heures suffisantes, en cas de perte d'emploi involontaire

VIE AU QUÉBEC — INFORMATION GÉNÉRALE:

Système scolaire:
- Garderie/CPE: 0-5 ans, places subventionnées ~9.10$/jour (liste d'attente: laplace0-5.com)
- Maternelle 5 ans: obligatoire, gratuite
- Primaire: 6 ans (1re à 6e année). Secondaire: 5 ans (sec. 1 à 5)
- Classes d'accueil: pour enfants immigrants ne parlant pas français, intégration progressive
- Cégep: 2 ans (préuniversitaire) ou 3 ans (technique), gratuit pour résidents du Québec
- Université: frais de scolarité ~3000-4000$/an pour résidents QC, plus cher pour internationaux
- Inscription scolaire: Centre de services scolaire de Montréal (CSSDM) ou Marguerite-Bourgeoys (CSSMB) pour Saint-Laurent

Culture québécoise:
- Langue officielle: français. Loi 96 renforce l'usage du français dans les milieux de travail et services publics
- Valeurs: égalité homme-femme, laïcité de l'État, primauté du français, participation démocratique
- Tutoiement courant dans les situations informelles, vouvoiement en contexte professionnel
- Fêtes importantes: Noël, Jour de l'An, Pâques, Fête nationale (24 juin — grande fête!), fête du Canada (1er juillet = jour de déménagement), Action de grâce (octobre)
- Cabanes à sucre au printemps (mars-avril): tradition québécoise incontournable
- Sports populaires: hockey (Canadiens de Montréal), soccer, ski, patinage, raquette

Aéroport:
- Aéroport international Montréal-Trudeau (YUL): seul aéroport de Montréal pour vols commerciaux
- Situé à Dorval, à ~25 min du centre-ville
- Transport depuis l'aéroport: 747 Express (autobus STM, 24/7, ~11$ ou carte OPUS, arrêts Lionel-Groulx et Gare d'autocars), taxi forfait ~45$ vers le centre-ville, Uber/Lyft disponibles, navettes hôtelières
- Douanes et immigration: se présenter avec passeport, visa/permis de travail/étude, lettre d'introduction IRCC, preuve de fonds. Déclaration douanière obligatoire
- Services à l'aéroport: Wi-Fi gratuit, bureau de change, guichets bancaires, SIM prépayées (Bell, Telus, Rogers)
- Pour les nouveaux arrivants: le CARI peut vous aider AVANT votre arrivée à préparer vos documents. Appelez-nous!

Transports à Montréal:
- STM: métro (4 lignes: verte, orange, bleue, jaune) + autobus. Carte OPUS rechargeable. Tarif mensuel ~97$, tarif réduit pour étudiants et aînés. Métro fonctionne ~5h30-1h00 (1h30 ven-sam)
- REM: nouveau train léger reliant Brossard, centre-ville, Ouest-de-l'Île et aéroport (en construction pour certaines stations)
- ARTM: tarifs zonés pour la grande région métropolitaine (Laval, Longueuil, couronne nord/sud)
- Autobus de nuit: lignes 300+ remplacent le métro après la fermeture
- Bixi: vélos en libre-service (saison mai-novembre), ~100$/an
- Taxis et covoiturage: Uber, Lyft, Téo Taxi. Pourboire 15% pour taxis
- Permis de conduire: échanger dans les 90 jours si entente avec le pays d'origine (France, Belgique, etc.), sinon examen théorique + pratique à la SAAQ. Permis international valide 6 mois
- Pneus d'hiver obligatoires du 1er décembre au 15 mars
- Communauto: autopartage, bon pour usage occasionnel sans posséder de voiture

Ressources utiles:
- 211: ligne d'information sur les services communautaires (24/7)
- 811: Info-Santé/Info-Social (infirmière/travailleur social 24/7)
- 911: urgences (police, ambulance, pompiers)
- 311: services municipaux de Montréal
- SOS Violence conjugale: 1-800-363-9010
- Tel-Aide: 514-935-1101 (écoute, détresse psychologique)
- Ligne de prévention du suicide: 1-866-APPELLE (277-3553)

FAQ RAPIDES:
- Services CARI = GRATUITS pour tous les immigrants
- Pas besoin d'habiter Saint-Laurent
- Première visite = évaluation de besoins
- Halte-garderie disponible sur place
- NAS: Service Canada 1350 boul. Marcel-Laurin
- Assurance privée recommandée pendant délai RAMQ
- Dépôt sécurité = illégal au Québec
- Pneus hiver = obligatoires 1er déc-15 mars`;

const WELCOME_MESSAGES = {
  fr: "Bonjour! 👋 Je suis Natalia, votre assistante virtuelle du CARI. Comment puis-je vous aider?",
  en: "Hello! 👋 I'm Natalia, your virtual assistant from CARI. How can I help you?",
  es: "Hola! 👋 Soy Natalia, su asistente virtual del CARI. Como puedo ayudarle?",
  ar: "مرحبا! 👋 أنا ناتاليا، مساعدتكم الافتراضية من CARI. كيف يمكنني مساعدتكم؟",
  zh: "您好！👋 我是Natalia，CARI的虚拟助手。有什么可以帮您的？",
  pt: "Ola! 👋 Sou a Natalia, sua assistente virtual do CARI. Como posso ajudar?",
  uk: "Вітаю! 👋 Я Наталія, віртуальна асистентка CARI. Чим можу допомогти?",
  ur: "خوش آمدید! 👋 میں نتالیا ہوں، CARI کی ورچوئل اسسٹنٹ۔ میں آپ کی کیسے مدد کر سکتی ہوں؟",
  ru: "Здравствуйте! 👋 Я Наталия, виртуальный ассистент CARI. Чем могу помочь?",
  vi: "Xin chao! 👋 Toi la Natalia, tro ly ao cua CARI. Toi co the giup gi cho ban?",
  tl: "Kumusta! 👋 Ako si Natalia, virtual assistant ng CARI. Paano kita matutulungan?",
  ht: "Bonjou! 👋 Mwen se Natalia, asistan vityel CARI. Kijan mwen ka ede ou?",
};

const QUICK_ACTIONS = {
  fr: [
    {
      label: "🏠 Premieres demarches",
      prompt:
        "Quelles sont les premieres demarches a faire quand j'arrive au Quebec?",
    },
    { label: "📋 Services du CARI", prompt: "Quels services offre le CARI?" },
    {
      label: "🗣️ Cours de francais",
      prompt: "Comment m'inscrire aux cours de francais?",
    },
    {
      label: "💼 Trouver un emploi",
      prompt: "Comment chercher un emploi au Quebec?",
    },
    {
      label: "🏥 Systeme de sante",
      prompt: "Comment fonctionne le systeme de sante?",
    },
    {
      label: "📍 Horaires et adresse",
      prompt: "Quels sont les horaires et l'adresse du CARI?",
    },
  ],
  en: [
    {
      label: "🏠 First steps",
      prompt: "What are the first steps when I arrive in Quebec?",
    },
    { label: "📋 CARI services", prompt: "What services does CARI offer?" },
    {
      label: "🗣️ French courses",
      prompt: "How do I register for French courses?",
    },
    { label: "💼 Find a job", prompt: "How do I look for a job in Quebec?" },
    { label: "🏥 Healthcare", prompt: "How does the healthcare system work?" },
    {
      label: "📍 Hours and address",
      prompt: "What are CARI's hours and address?",
    },
  ],
  es: [
    {
      label: "🏠 Primeros pasos",
      prompt: "Cuales son los primeros pasos al llegar a Quebec?",
    },
    { label: "📋 Servicios del CARI", prompt: "Que servicios ofrece el CARI?" },
    {
      label: "🗣️ Cursos de frances",
      prompt: "Como me inscribo a los cursos de frances?",
    },
    { label: "💼 Buscar empleo", prompt: "Como buscar empleo en Quebec?" },
    {
      label: "🏥 Sistema de salud",
      prompt: "Como funciona el sistema de salud?",
    },
    {
      label: "📍 Horarios y direccion",
      prompt: "Cuales son los horarios y la direccion del CARI?",
    },
  ],
  ar: [
    {
      label: "🏠 الخطوات الاولى",
      prompt: "ما هي الخطوات الاولى عند وصولي الى كيبيك؟",
    },
    { label: "📋 خدمات CARI", prompt: "ما هي الخدمات التي يقدمها CARI؟" },
    { label: "🗣️ دروس الفرنسية", prompt: "كيف اسجل في دروس الفرنسية؟" },
    { label: "💼 البحث عن عمل", prompt: "كيف ابحث عن عمل في كيبيك؟" },
    { label: "🏥 النظام الصحي", prompt: "كيف يعمل النظام الصحي؟" },
    { label: "📍 المواعيد والعنوان", prompt: "ما هي مواعيد وعنوان CARI؟" },
  ],
  zh: [
    { label: "🏠 首要步骤", prompt: "到达魁北克后首先要做什么？" },
    { label: "📋 CARI服务", prompt: "CARI提供哪些服务？" },
    { label: "🗣️ 法语课程", prompt: "如何注册法语课程？" },
    { label: "💼 找工作", prompt: "如何在魁北克找工作？" },
    { label: "🏥 医疗系统", prompt: "医疗系统如何运作？" },
    { label: "📍 时间和地址", prompt: "CARI的营业时间和地址是什么？" },
  ],
  pt: [
    {
      label: "🏠 Primeiros passos",
      prompt: "Quais sao os primeiros passos ao chegar no Quebec?",
    },
    { label: "📋 Servicos do CARI", prompt: "Quais servicos o CARI oferece?" },
    {
      label: "🗣️ Cursos de frances",
      prompt: "Como me inscrever nos cursos de frances?",
    },
    {
      label: "💼 Encontrar emprego",
      prompt: "Como procurar emprego no Quebec?",
    },
    {
      label: "🏥 Sistema de saude",
      prompt: "Como funciona o sistema de saude?",
    },
    {
      label: "📍 Horarios e endereco",
      prompt: "Quais sao os horarios e endereco do CARI?",
    },
  ],
  uk: [
    {
      label: "🏠 Перші кроки",
      prompt: "Які перші кроки після прибуття до Квебеку?",
    },
    { label: "📋 Послуги CARI", prompt: "Які послуги надає CARI?" },
    {
      label: "🗣️ Курси французької",
      prompt: "Як записатися на курси французької?",
    },
    { label: "💼 Пошук роботи", prompt: "Як шукати роботу в Квебеку?" },
    {
      label: "🏥 Охорона здоров'я",
      prompt: "Як працює система охорони здоров'я?",
    },
    {
      label: "📍 Графік та адреса",
      prompt: "Які години роботи та адреса CARI?",
    },
  ],
  ur: [
    { label: "🏠 پہلے قدم", prompt: "کیوبیک پہنچنے پر پہلے کیا کرنا چاہیے؟" },
    { label: "📋 CARI خدمات", prompt: "CARI کیا خدمات فراہم کرتا ہے؟" },
    {
      label: "🗣️ فرانسیسی کورسز",
      prompt: "فرانسیسی کورسز میں رجسٹریشن کیسے کروں؟",
    },
    { label: "💼 نوکری تلاش", prompt: "کیوبیک میں نوکری کیسے تلاش کروں؟" },
    { label: "🏥 صحت کا نظام", prompt: "صحت کا نظام کیسے کام کرتا ہے؟" },
    { label: "📍 اوقات اور پتہ", prompt: "CARI کے اوقات اور پتہ کیا ہے؟" },
  ],
  ru: [
    {
      label: "🏠 Первые шаги",
      prompt: "Какие первые шаги после прибытия в Квебек?",
    },
    { label: "📋 Услуги CARI", prompt: "Какие услуги предоставляет CARI?" },
    {
      label: "🗣️ Курсы французского",
      prompt: "Как записаться на курсы французского?",
    },
    { label: "💼 Поиск работы", prompt: "Как искать работу в Квебеке?" },
    {
      label: "🏥 Здравоохранение",
      prompt: "Как работает система здравоохранения?",
    },
    {
      label: "📍 Часы работы и адрес",
      prompt: "Какие часы работы и адрес CARI?",
    },
  ],
  vi: [
    {
      label: "🏠 Buoc dau tien",
      prompt: "Nhung buoc dau tien khi den Quebec la gi?",
    },
    { label: "📋 Dich vu CARI", prompt: "CARI cung cap nhung dich vu gi?" },
    {
      label: "🗣️ Khoa hoc tieng Phap",
      prompt: "Lam the nao de dang ky khoa hoc tieng Phap?",
    },
    {
      label: "💼 Tim viec lam",
      prompt: "Lam the nao de tim viec lam o Quebec?",
    },
    {
      label: "🏥 He thong y te",
      prompt: "He thong y te hoat dong nhu the nao?",
    },
    {
      label: "📍 Gio va dia chi",
      prompt: "Gio lam viec va dia chi cua CARI la gi?",
    },
  ],
  tl: [
    {
      label: "🏠 Unang hakbang",
      prompt: "Ano ang mga unang hakbang pagdating sa Quebec?",
    },
    {
      label: "📋 Mga serbisyo ng CARI",
      prompt: "Ano ang mga serbisyo na inaalok ng CARI?",
    },
    {
      label: "🗣️ Kurso sa Pranses",
      prompt: "Paano mag-enroll sa kurso sa Pranses?",
    },
    {
      label: "💼 Maghanap ng trabaho",
      prompt: "Paano maghanap ng trabaho sa Quebec?",
    },
    {
      label: "🏥 Sistema ng kalusugan",
      prompt: "Paano gumagana ang sistema ng kalusugan?",
    },
    { label: "📍 Oras at address", prompt: "Ano ang oras at address ng CARI?" },
  ],
  ht: [
    {
      label: "🏠 Premye etap",
      prompt: "Ki premye etap le ou rive nan Quebec?",
    },
    { label: "📋 Sevis CARI", prompt: "Ki sevis CARI ofri?" },
    { label: "🗣️ Kou franse", prompt: "Kijan pou enskri nan kou franse?" },
    { label: "💼 Jwenn travay", prompt: "Kijan pou chache travay nan Quebec?" },
    { label: "🏥 Sistem sante", prompt: "Kijan sistem sante a fonksyone?" },
    { label: "📍 Le ak adres", prompt: "Ki le ak adres CARI?" },
  ],
};

// Lucide icon names for each quick action slot (same order across all languages)
const QUICK_ACTION_ICONS = [
  "home",
  "clipboard-list",
  "languages",
  "briefcase",
  "stethoscope",
  "map-marker-alt",
];

function TypingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: "12px 16px",
        alignItems: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "#6CBAC7",
            animation: `bounce 1.4s ${i * 0.2}s infinite ease-in-out both`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 12,
        paddingLeft: isUser ? 48 : 0,
        paddingRight: isUser ? 0 : 48,
        animation: "fadeIn 0.3s ease",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginRight: 8,
            marginTop: 4,
            overflow: "hidden",
            border: "1px solid #e8eaf0",
          }}
        >
          <img
            src="/favicon-32x32.png"
            alt="CARI"
            style={{ width: 22, height: 22 }}
          />
        </div>
      )}
      <div
        style={{
          padding: "10px 14px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          backgroundColor: isUser ? "#263164" : "#F0F7F6",
          color: isUser ? "#fff" : "#1a1a2e",
          fontSize: 14,
          lineHeight: 1.55,
          maxWidth: "85%",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          boxShadow: isUser ? "none" : "0 1px 3px rgba(38,49,100,0.06)",
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default function CARIChatbot({ onClose, language }) {
  const initialLang = language && WELCOME_MESSAGES[language] ? language : "fr";
  const [messages, setMessages] = useState([
    { role: "assistant", content: WELCOME_MESSAGES[initialLang] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showAllLangs, setShowAllLangs] = useState(false);
  const [chatLang, setChatLang] = useState(initialLang);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const lastUserRef = useRef(null);

  useEffect(() => {
    if (messages.length <= 1) return;
    if (
      messages[messages.length - 1].role === "assistant" &&
      lastUserRef.current
    ) {
      lastUserRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setShowQuickActions(false);
    const userMsg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));

      // Remove the initial welcome message from API calls
      if (apiMessages.length > 1 && apiMessages[0].role === "assistant") {
        apiMessages.shift();
      }

      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 1000,
          temperature: 0,
          system: CARI_KNOWLEDGE,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const rawReply =
        data.content
          ?.filter((b) => b.type === "text")
          .map((b) => b.text)
          .join("\n") ||
        "Désolé, une erreur est survenue. Veuillez réessayer ou nous appeler au (514) 748-2007.";
      const reply = rawReply
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/^#{1,3}\s/gm, "");

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, je ne suis pas disponible en ce moment. N'hésitez pas à nous appeler directement au (514) 748-2007 ou à écrire à info@cari.qc.ca.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.blur();
    }
  };

  const handleQuickAction = (prompt) => {
    sendMessage(prompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "min(650px, 85vh)",
        width: "min(400px, 92vw)",
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#fff",
        position: "fixed",
        bottom: 120,
        right: 20,
        zIndex: 1001,
        borderRadius: 16,
        boxShadow: "0 8px 40px rgba(38,49,100,0.25)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cce8e5; border-radius: 4px; }
        textarea::placeholder { color: #9ca3af; }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #263164 0%, #1a2147 100%)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <img
            src="/favicon-32x32.png"
            alt="CARI"
            style={{ width: 28, height: 28 }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 0.2,
            }}
          >
            Natalia
          </div>
          <div
            style={{
              color: "#6CBAC7",
              fontSize: 11,
              fontWeight: 500,
              marginTop: 1,
            }}
          >
            Assistante CARI polyglotte · 12+ langues
          </div>
        </div>
        <button
          onClick={() => onClose && onClose()}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: 8,
            padding: "6px 8px",
            cursor: "pointer",
            color: "#fff",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon name="x" size={18} />
        </button>
      </div>

      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Language selector banner */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginBottom: 16,
            flexWrap: "wrap",
            animation: "fadeIn 0.5s ease",
          }}
        >
          {(() => {
            const allLangs = [
              { code: "fr", label: "Français" },
              { code: "en", label: "English" },
              { code: "es", label: "Español" },
              { code: "ar", label: "العربية" },
              { code: "zh", label: "中文" },
              { code: "pt", label: "Português" },
              { code: "uk", label: "Українська" },
              { code: "ur", label: "اردو" },
              { code: "ru", label: "Русский" },
              { code: "vi", label: "Tiếng Việt" },
              { code: "tl", label: "Tagalog" },
              { code: "ht", label: "Kreyòl" },
            ];
            const visible = showAllLangs ? allLangs : allLangs.slice(0, 5);
            return visible.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => {
                  setChatLang(code);
                  setMessages([
                    {
                      role: "assistant",
                      content: WELCOME_MESSAGES[code] || WELCOME_MESSAGES.fr,
                    },
                  ]);
                  setShowQuickActions(true);
                }}
                style={{
                  background: "rgba(108,186,199,0.08)",
                  border: "1px solid rgba(108,186,199,0.2)",
                  borderRadius: 20,
                  padding: "4px 10px",
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "#263164",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(108,186,199,0.15)";
                  e.currentTarget.style.borderColor = "#6CBAC7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(108,186,199,0.08)";
                  e.currentTarget.style.borderColor = "rgba(108,186,199,0.2)";
                }}
              >
                {label}
              </button>
            ));
          })()}
          <button
            onClick={() => setShowAllLangs(!showAllLangs)}
            style={{
              background: "rgba(108,186,199,0.08)",
              border: "1px solid rgba(108,186,199,0.2)",
              borderRadius: 20,
              padding: "4px 10px",
              fontSize: 12,
              cursor: "pointer",
              color: "#6CBAC7",
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            {showAllLangs ? "−" : "+7"}
          </button>
        </div>

        {messages.map((msg, i) => {
          const isLastUser =
            msg.role === "user" &&
            (i === messages.length - 1 ||
              (i === messages.length - 2 &&
                messages[messages.length - 1].role === "assistant"));
          return (
            <div key={i} ref={isLastUser ? lastUserRef : null}>
              <MessageBubble role={msg.role} content={msg.content} />
            </div>
          );
        })}

        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
                border: "1px solid #e8eaf0",
              }}
            >
              <img
                src="/favicon-32x32.png"
                alt="CARI"
                style={{ width: 22, height: 22 }}
              />
            </div>
            <div
              style={{
                backgroundColor: "#F0F7F6",
                borderRadius: "16px 16px 16px 4px",
                boxShadow: "0 1px 3px rgba(38,49,100,0.06)",
              }}
            >
              <TypingIndicator />
            </div>
          </div>
        )}

        {/* Quick actions */}
        {showQuickActions && messages.length <= 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginTop: 8,
              animation: "slideUp 0.4s ease",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#8896b3",
                fontWeight: 500,
                marginBottom: 2,
                paddingLeft: 4,
              }}
            >
              {{
                fr: "Questions frequentes",
                en: "Frequently asked",
                es: "Preguntas frecuentes",
                ar: "اسئلة شائعة",
                zh: "常见问题",
                pt: "Perguntas frequentes",
                uk: "Часті питання",
                ur: "عام سوالات",
                ru: "Частые вопросы",
                vi: "Cau hoi thuong gap",
                tl: "Mga tanong",
                ht: "Kesyon kouran",
              }[chatLang] || "Questions frequentes"}
            </div>
            {(QUICK_ACTIONS[chatLang] || QUICK_ACTIONS.fr).map((action, i) => (
              <button
                key={i}
                onClick={() => handleQuickAction(action.prompt)}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontSize: 13,
                  cursor: "pointer",
                  textAlign: "left",
                  color: "#263164",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#6CBAC7";
                  e.currentTarget.style.background = "#f8fffe";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <Icon
                    name={QUICK_ACTION_ICONS[i] || "info-circle"}
                    size={16}
                    style={{ color: "#6CBAC7", flexShrink: 0 }}
                  />
                  {action.label.replace(
                    /^[\p{Emoji}\p{Emoji_Presentation}\u200d\ufe0f]+\s*/u,
                    "",
                  )}
                </span>
                <span style={{ color: "#6CBAC7", fontSize: 16 }}>›</span>
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #f0f0f5",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
            background: "#f7f8fb",
            borderRadius: 16,
            padding: "6px 6px 6px 14px",
            border: "1px solid #e8eaf0",
            transition: "border-color 0.2s",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écrivez votre question..."
            rows={1}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 14,
              fontFamily: "inherit",
              resize: "none",
              padding: "6px 0",
              lineHeight: 1.4,
              color: "#1a1a2e",
              maxHeight: 80,
              overflowY: "auto",
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 80) + "px";
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              border: "none",
              background: input.trim() && !loading ? "#263164" : "#d1d5e0",
              cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            <Icon name="send" size={18} strokeWidth={2.5} />
          </button>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            fontSize: 10,
            color: "#b0b8cc",
          }}
        >
          CARI St-Laurent · (514) 748-2007 · 774, boul. Décarie, bur. 300
        </div>
      </div>
    </div>
  );
}
