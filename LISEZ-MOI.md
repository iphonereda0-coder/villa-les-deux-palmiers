# Villa Les Deux Palmiers — installation et module financier

Cette version est une PWA installable sur Windows, Android et iPhone/iPad. Elle conserve les dossiers dans Supabase. La connexion Internet reste nécessaire pour se connecter, enregistrer des opérations et synchroniser les modifications.

## Tableau de bord financier

L’écran **Équipe → Finance** présente les recettes réellement enregistrées, les dépenses payées, leur solde opérationnel et la répartition des charges. Les filtres couvrent les six derniers mois, les douze derniers mois ou une période personnalisée. Sélectionnez un mois, un segment ou une catégorie pour afficher les valeurs détaillées.

Le nouveau journal `mouvement_financier` conserve les encaissements de réservation datés, les cautions reçues/remboursées et les paiements de travaux datés. Les cautions restent hors recettes et dépenses d’exploitation. Les montants planifiés et les soldes à recevoir apparaissent séparément des encaissements.

Les anciennes réservations ne comportent pas la date réelle des acomptes. Elles ne sont donc pas attribuées à un mois. La section **Rapprocher l’historique** permet de les dater à partir d’un justificatif. Les travaux dont le montant payé est connu mais sans date sont pareillement exclus des totaux mensuels jusqu’au rapprochement. Les dépenses déjà stockées dans les tables de dépenses, achats, citernes, ménage, avances et salaires payés utilisent leur date existante.

Le résultat est le **solde opérationnel calculé par l’application**, pas nécessairement un bénéfice comptable net. Il ne comprend notamment pas les réservations non encaissées, les heures non payées, les cautions, les retraits de caisse ni la valeur du stock consommé. Voir `RAPPORT-MODULE-FINANCIER.md` pour l’audit et les règles détaillées.

## Consultation hors ligne

Après une connexion réussie et un chargement complet en ligne, la PWA garde une copie de la synthèse financière agrégée et de l’interface nécessaire. Si la connexion tombe, un propriétaire connecté auparavant peut consulter la dernière synthèse enregistrée en lecture seule. Cette copie contient les dates et montants agrégés, sans noms ni numéros de téléphone. Aucun changement ne peut être enregistré hors ligne; la synchronisation et les autres fonctions de gestion demandent Internet. Au retour du réseau, les dossiers sont rechargés depuis Supabase.

## Calendrier des réservations

Le planning utilise les réservations, les blocages et les tarifs déjà enregistrés. Sur un grand écran, il affiche deux mois côte à côte; sur téléphone, un mois pour garder des cases faciles à toucher. Choisis d’abord l’arrivée puis le départ. Le calendrier montre les séjours, les départs, les dates bloquées, les événements et le tarif indicatif. Il calcule les nuits et l’estimation, signale les chevauchements et permet de préparer une réservation ou de bloquer les dates choisies.

## Ouvrir le site et l’installer

La version mise à jour est publiée ici : [Villa Les Deux Palmiers – Gestion Pro](https://iphonereda0-coder.github.io/villa-les-deux-palmiers/). Elle conserve l’authentification et la base de données existantes. Une connexion Internet est nécessaire pour ouvrir une session, enregistrer des opérations et synchroniser les données.

Sur le Bureau Windows, ouvre le raccourci **VillaLesDeuxPalmiers – Raccourci**. Il ouvre le site dans l’application Windows déjà installée. Pour installer le site dans Edge ou Chrome, ouvre le lien ci-dessus, puis choisis l’icône **Installer** ou le menu … → Applications → Installer ce site en tant qu’application.

## Ajouter sur téléphone

- **Android (Chrome)** : ouvrez le site, menu `⋮ → Installer l’application` ou `Ajouter à l’écran d’accueil`.
- **iPhone/iPad (Safari)** : ouvrez le site, bouton **Partager → Sur l’écran d’accueil**.

Le site doit être servi en HTTPS. Après publication d’une mise à jour, rechargez la PWA afin qu’elle installe la nouvelle version du service worker.
