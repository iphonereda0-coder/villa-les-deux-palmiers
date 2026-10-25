# Villa Les Deux Palmiers — installation et module financier

**Version 1.1.0 – Inventaire Pro (25/10/2026).** Maison › Inventaire en 5 onglets (tableau de bord, articles, mouvements, courses, entretiens) ; coût moyen pondéré recalculé à chaque achat ; chaque utilisation, perte, entretien ou traitement piscine est chiffré automatiquement ; journal quotidien de la piscine (produits, quantités, coût du jour) ; entretiens programmés ; la main d’œuvre des entretiens va dans les dépenses. Les données de la 1.0 restent inchangées.

**Version 1.0.0 – Gestion Pro.** PWA installable sur Windows, Android et iPhone/iPad. Chaque saisie est d’abord enregistrée sur l’appareil (IndexedDB), puis synchronisée avec Supabase dès qu’Internet est disponible. Internet n’est nécessaire que pour la toute première connexion d’un appareil.

- Hors ligne : réservations, clients, paiements, cautions, remboursements, dépenses, inventaire, ménage, piscine, citernes, pompe, travaux, configuration et espace propriétaire fonctionnent sans Internet. Les modifications attendent dans une file locale.
- Synchronisation : au retour du réseau, la file est envoyée puis les changements des autres appareils sont récupérés. Si une même fiche a été modifiée ailleurs entre-temps, rien n’est écrasé : un conflit est proposé dans **💾 Sauvegarde**.
- Sauvegarde : bouton **💾 Sauvegarde** en haut de l’écran (fichier JSON complet avec empreinte de contrôle, restauration vérifiée, copies automatiques datées sur l’appareil).
- La bibliothèque Supabase est livrée dans `vendor/` pour fonctionner sans CDN.

## Tableau de bord financier

L’écran **Équipe → Finance** présente les recettes réellement enregistrées, les dépenses payées, leur solde opérationnel et la répartition des charges. Les filtres couvrent les six derniers mois, les douze derniers mois ou une période personnalisée. Sélectionnez un mois, un segment ou une catégorie pour afficher les valeurs détaillées.

Le nouveau journal `mouvement_financier` conserve les encaissements de réservation datés, les cautions reçues/remboursées et les paiements de travaux datés. Les cautions restent hors recettes et dépenses d’exploitation. Les montants planifiés et les soldes à recevoir apparaissent séparément des encaissements.

Les anciennes réservations ne comportent pas la date réelle des acomptes. Elles ne sont donc pas attribuées à un mois. La section **Rapprocher l’historique** permet de les dater à partir d’un justificatif. Les travaux dont le montant payé est connu mais sans date sont pareillement exclus des totaux mensuels jusqu’au rapprochement. Les dépenses déjà stockées dans les tables de dépenses, achats, citernes, ménage, avances et salaires payés utilisent leur date existante.

Le résultat est le **solde opérationnel calculé par l’application**, pas nécessairement un bénéfice comptable net. Il ne comprend notamment pas les réservations non encaissées, les heures non payées, les cautions, les retraits de caisse ni la valeur du stock consommé. Voir `RAPPORT-MODULE-FINANCIER.md` pour l’audit et les règles détaillées.

## Hors ligne

Depuis la version 1.0.0, l’application complète fonctionne hors ligne (voir plus haut). L’ancienne consultation financière en lecture seule ne sert plus que de secours si le navigateur bloque le stockage local (navigation privée).

## Calendrier des réservations

Le planning utilise les réservations, les blocages et les tarifs déjà enregistrés. Sur un grand écran, il affiche deux mois côte à côte; sur téléphone, un mois pour garder des cases faciles à toucher. Choisis d’abord l’arrivée puis le départ. Le calendrier montre les séjours, les départs, les dates bloquées, les événements et le tarif indicatif. Il calcule les nuits et l’estimation, signale les chevauchements et permet de préparer une réservation ou de bloquer les dates choisies.

## Ouvrir le site et l’installer

La version publiée est ici : [Villa Les Deux Palmiers – Gestion Pro](https://iphonereda0-coder.github.io/villa-les-deux-palmiers/). Elle conserve l’authentification et la base de données existantes. Une connexion Internet est nécessaire pour la première connexion de chaque appareil.

Sur le Bureau Windows, ouvre le raccourci **VillaLesDeuxPalmiers – Raccourci**. Il ouvre le site dans l’application Windows déjà installée. Pour installer le site dans Edge ou Chrome, ouvre le lien ci-dessus, puis choisis l’icône **Installer** ou le menu … → Applications → Installer ce site en tant qu’application.

## Ajouter sur téléphone

- **Android (Chrome)** : ouvrez le site, menu `⋮ → Installer l’application` ou `Ajouter à l’écran d’accueil`.
- **iPhone/iPad (Safari)** : ouvrez le site, bouton **Partager → Sur l’écran d’accueil**.

Le site doit être servi en HTTPS. Après publication d’une mise à jour, rechargez la PWA afin qu’elle installe la nouvelle version du service worker.
