# Notre Grand Jour — site d'invitation de mariage

Un site élégant, mobile-first, en HTML/CSS/JavaScript, sans étape de compilation. Compatible avec GitHub Pages, Vercel et Netlify.

## 1. Personnaliser le site

Ouvrez `script.js` et modifiez l'objet `WEDDING` tout en haut :
- `firstName`, `secondName`
- `dateTime` au format `AAAA-MM-JJTHH:MM:SS` (heure locale du lieu du mariage)
- `dateLabel`
- `venueName`, `address`, `mapQuery`
- `rsvpDeadline`, `rsvpUrl` (lien vers votre formulaire Google Forms ou autre)
- `hashtag`

Le programme et les trois étapes de votre histoire sont directement modifiables dans `index.html`.

## 2. Remplacer les photos

Placez vos images dans `photos/` avec ces noms exacts :
- `photo-1.jpg` — photo principale + galerie
- `photo-2.jpg` à `photo-6.jpg` — galerie
- `lieu.jpg` — photo du lieu/décoration

Conseils : photos verticales ou 4:5 pour la galerie, photo large pour `photo-1.jpg`. Compressez les images en WebP/JPEG pour accélérer le site. Si vous utilisez WebP, changez aussi les extensions dans `index.html` et `style.css`.

## 3. Tester sur votre ordinateur

Double-cliquez sur `index.html` pour une vérification rapide. Pour une expérience plus proche de l'hébergement, ouvrez un terminal dans ce dossier et lancez :
`python -m http.server 8000`
Puis visitez `http://localhost:8000`.

## 4. Publier avec GitHub et Vercel

1. Créez ou connectez-vous à un compte sur https://github.com.
2. Cliquez sur **New repository**. Nommez-le `notre-grand-jour`, choisissez **Public** ou **Private**, puis créez le dépôt.
3. Dans le dépôt, cliquez sur **Add file → Upload files** et déposez `index.html`, `style.css`, `script.js`, `README.md` et le dossier `photos` avec ses images. GitHub doit montrer les fichiers dans le dépôt. Cliquez sur **Commit changes**.
4. Ouvrez https://vercel.com et connectez-vous avec GitHub. Autorisez Vercel à accéder au dépôt.
5. Cliquez sur **Add New → Project**, choisissez le dépôt `notre-grand-jour`, puis **Import**.
6. Dans les réglages de déploiement, laissez le framework sur **Other**. Ne renseignez ni commande de build ni dossier de sortie personnalisé : la racine du dépôt contient déjà `index.html`.
7. Cliquez sur **Deploy**. Après le déploiement, Vercel vous donnera une adresse du type `https://notre-grand-jour-xxxx.vercel.app`.
8. Ouvrez le lien sur votre téléphone. Pour modifier le site, éditez les fichiers dans GitHub et validez avec **Commit changes** ; Vercel redéploiera automatiquement.
9. Avant de partager, vérifiez les noms, date, carte, itinéraire et formulaire RSVP depuis un téléphone.

## Important
- Les noms et dates sont des exemples à remplacer.
- La carte utilise l'adresse de `mapQuery` : remplacez-la par le nom et l'adresse exacts du lieu.
- Le bouton RSVP pointe par défaut vers un formulaire générique. Créez votre formulaire (par exemple Google Forms), puis collez son lien dans `rsvpUrl`.
- Les images d'exemple ne sont pas fournies : placez vos propres photos dans `photos/`.
- Un compte à rebours nécessite une date `dateTime` valide. Le navigateur interprète cette valeur selon l'heure locale de l'appareil.
- Le site n'envoie pas lui-même les réponses RSVP ; le formulaire lié s'en charge.
