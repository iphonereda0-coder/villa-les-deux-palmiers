# Villa Les Deux Palmiers — installation gratuite

Cette version est une PWA : elle s'installe comme une application sur Windows et peut être ajoutée à l'écran d'accueil d'un téléphone. Elle nécessite Internet pour se connecter et synchroniser les données Supabase. La mise en cache garde la page accessible, mais ne permet pas d'enregistrer des données hors ligne.

## Publier gratuitement avec GitHub Pages

1. Connectez-vous à GitHub et créez un dépôt **public** nommé `villa-les-deux-palmiers`.
2. Téléversez tous les fichiers de ce dossier à la racine du dépôt.
3. Dans **Settings → Pages**, sélectionnez **Deploy from a branch**, la branche `main` et le dossier `/ (root)`, puis enregistrez.
4. Attendez la publication et ouvrez l'adresse indiquée par GitHub Pages. Vérifiez que la page de connexion s'affiche.

GitHub Pages et l'utilisation de Supabase peuvent avoir des limites ou conditions propres à leurs offres gratuites. Vérifiez que votre projet Supabase est bien configuré avec des règles RLS sûres pour les tables `records` et `profiles`, car l'application est accessible publiquement sur Internet.

## Installer sur Windows

Ouvrez le site publié dans Microsoft Edge ou Google Chrome. Cliquez sur l'icône **Installer** dans la barre d'adresse (ou menu `… → Applications → Installer ce site en tant qu’application`). L'application apparaîtra dans le menu Démarrer.

## Ajouter sur téléphone

- **Android (Chrome)** : ouvrez le site, menu `⋮ → Installer l'application` ou `Ajouter à l'écran d'accueil`.
- **iPhone/iPad (Safari)** : ouvrez le site, bouton **Partager → Sur l'écran d'accueil**.

Le site doit être servi en HTTPS ; GitHub Pages fournit HTTPS. Après une mise à jour des fichiers, rechargez le site. Le cache hors ligne ne contient que l'interface, pas les dossiers Supabase.
