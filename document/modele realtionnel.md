---
title: Untitled

---

# Modèle Relationnel – Espace Utilisateur (Django)

## Utilisateur (CustomUser ou AbstractUser)
- `id` (PK) : Identifiant unique de l'utilisateur
- `nom` : Nom de l'utilisateur
- `prénom` : Prénom de l'utilisateur
- `email` : Adresse email
- `matricule` : Matricule interne
- `poste` : Poste occupé
- ...

## ProfilUtilisateur
- `id` (PK) : Identifiant du profil
- `user_id` (FK → Utilisateur) : Référence à l'utilisateur
- `téléphone` : Numéro de téléphone
- `adresse` : Adresse postale
- ...

## Document
- `id` (PK) : Identifiant du document
- `type_document` : Type du document (contrat, fiche_paie, attestation)
- `fichier` : Chemin vers le fichier (FileField)
- `date_document` : Date associée au document
- `description` : Description facultative
- `utilisateur_id` (FK → Utilisateur) : Propriétaire du document
- `visible` : Booléen indiquant si le document est visible
