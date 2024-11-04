![logo-fisheye](assets/images/logo.png "Titre de l'image").

Ce projet vise à moderniser un site web destiné aux photographes freelances, en le transformant d'un site statique en une plateforme dynamique et interactive pour présenter les portfolios des photographes et faciliter les contacts avec des clients potentiels. Ce site permet aux photographes, de mettre en valeur leur travail et de recevoir des demandes pour des événements ou des tirages.

## 🔥 Lancer le Projet

1. Cloner le dépôt sur votre machine locale.
2. Ouvrir le projet dans votre éditeur de code.
3. Lancer le fichier `index.html` à l'aide d'un serveur de développement web comme **Live Server**.

## 🎯 Objectif du Projet

Le site actuel, conçu il y a plus de dix ans, est obsolète et nécessite une refonte complète pour :
- Moderniser le design et l'expérience utilisateur.
- Passer d'un site statique à un site dynamique.
- Faciliter la gestion et la présentation des galeries des photographes.


## 📕 Pages et Fonctionnalités

### 1. Page d'Accueil
La page d'accueil propose un aperçu de tous les photographes disponibles :
- **Liste des Photographes** : Chaque photographe est présenté avec son nom, son slogan, sa localisation, son tarif horaire, et une image miniature de son choix.
- **Navigation vers la Page du Photographe** : En cliquant sur la vignette d'un photographe, l'utilisateur est redirigé vers une page individuelle dédiée.

### 2. Page du Photographe
Chaque photographe possède une page dédiée générée dynamiquement contenant :
- **Galerie Multimédia** :
    - Une galerie affichant les photos et vidéos du photographe.
    - Les vidéos apparaissent avec une image miniature.
- **Interactions avec les Médias** :
    - Chaque média dispose d'un titre et d'un compteur de likes.
    - Les utilisateurs peuvent liker chaque média, incrémentant ainsi le nombre de likes total du photographe.
    - Les médias peuvent être triés par **popularité** ou par **titre**.
- **Affichage en Lightbox** :
    - En cliquant sur un média, celui-ci s'ouvre dans une lightbox.
    - Une croix permet de fermer la lightbox, et des boutons de navigation permettent de passer d'un média à l'autre.
    - La navigation peut également se faire avec les touches fléchées du clavier.
- **Bouton de Contact** :
    - Un bouton permettant de contacter le photographe via un formulaire de contact.
    - Ce formulaire apparaît dans une modale et comprend des champs pour le nom, l'adresse électronique et le message.
    - Actuellement, le contenu du formulaire est affiché dans la console à des fins de test ; l'envoi réel des messages sera implémenté ultérieurement.

## 👩‍💻 Technologies Utilisées

- **HTML/CSS/JavaScript** pour la structure de base, le style et l'interactivité du site.
- **JavaScript dynamique** pour la génération de contenu et les interactions (like, lightbox, tri, etc.).
