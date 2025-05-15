# Zone Disaster Monitoring System

Ce projet de génération de données pour les zones géographiques, permettant de détecter et de signaler des catastrophes potentielles telles que les tremblements de terre et les inondations.

## Fonctionnalités

- **Génération de données** : Simulation de données météorologiques et environnementales pour différentes zones.
- **Détection de catastrophes** : Identification des catastrophes potentielles basées sur des règles spécifiques à chaque zone.
- **Communication MQTT** : Envoi et réception de données via un broker MQTT.
- **Stockage des données** : Insertion des données reçues dans une base de données MongoDB.

## Structure du projet

- `type.d.ts` : Définit les types TypeScript pour les données des zones.
- `listener.ts` : Écoute les messages MQTT, les traite et les insère dans MongoDB.
- `sender.ts` : Génère des données simulées et les publie sur le broker MQTT.
- `env` : Contient les variables d'environnement pour la configuration du projet.

## Prérequis

- **Node.js** (version 16 ou supérieure)
- **Yarn** ou **npm**
- **MongoDB** (pour le stockage des données)
- Un broker MQTT (par exemple, [Mosquitto](https://mosquitto.org/))

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   cd <nom-du-repo>
    ```
   
2. Installez les dépendances :
3. ```bash
   yarn install
   ```
   
Lancez le listener:
```bash
tsx listener.ts
```
Lancez le sender:
```bash
tsx sender.ts
```
