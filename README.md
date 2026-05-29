# Novakom Academy

Projet de cours pour apprendre a construire une application full-stack simple avec :

- un backend **ASP.NET Core Web API** ;
- une base de donnees **SQLite** avec **Entity Framework Core** ;
- un frontend **React + Vite** ;
- une communication HTTP entre le frontend et le backend.

Le projet permet de travailler sur un cas concret : inscription, connexion et gestion des utilisateurs.

## Structure du projet

```text
novakom_academy/
├── WebApi/        # Backend ASP.NET Core
├── webApp/        # Frontend React + Vite
├── README.md      # Documentation du projet
└── NovakomAcademy.sln
```

## Prerequis

Avant de commencer, installer :

- **.NET SDK 8**
- **Node.js** et **npm**
- un editeur de code, par exemple Visual Studio, Rider ou VS Code
- optionnel : **Postman**, **Insomnia** ou Swagger pour tester l'API

Verification rapide :

```bash
dotnet --version
node --version
npm --version
```

Le fichier `global.json` indique que le projet utilise le SDK .NET `8.0.421`.

## Installation du backend

Le backend se trouve dans le dossier `WebApi`.

### 1. Aller dans le dossier backend

```bash
cd WebApi
```

### 2. Restaurer les packages .NET

```bash
dotnet restore
```

Les packages principaux utilises sont :

- `Microsoft.EntityFrameworkCore`
- `Microsoft.EntityFrameworkCore.Sqlite`
- `Microsoft.EntityFrameworkCore.Design`
- `Microsoft.EntityFrameworkCore.Tools`
- `Swashbuckle.AspNetCore`
- `BCrypt.Net-Next`

### 3. Installer l'outil Entity Framework si besoin

Si la commande `dotnet ef` n'est pas reconnue :

```bash
dotnet tool install --global dotnet-ef
```

Puis verifier :

```bash
dotnet ef --version
```

### 4. Creer ou mettre a jour la base de donnees

La base SQLite est configuree dans `WebApi/appsettings.json` :

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=novakom_academy.db"
  }
}
```

Pour appliquer les migrations :

```bash
dotnet ef database update
```

### 5. Lancer l'API

```bash
dotnet run
```

Par defaut, l'API ecoute sur :

```text
http://localhost:5095
```

En environnement de developpement, Swagger est disponible ici :

```text
http://localhost:5095/swagger
```

## Installation du frontend

Le frontend se trouve dans le dossier `webApp`.

### 1. Aller dans le dossier frontend

Depuis la racine du projet :

```bash
cd webApp
```

Si vous etes deja dans `WebApi`, revenir d'abord a la racine :

```bash
cd ..
cd webApp
```

### 2. Installer les dependances npm

```bash
npm install
```

Les dependances principales cote frontend sont :

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `vite`
- `tailwindcss`

### 3. Lancer le frontend

```bash
npm run dev
```

Par defaut, Vite lance l'application sur :

```text
http://localhost:5173
```

## Lancer le projet complet

Il faut lancer le backend et le frontend dans deux terminaux separes.

### Terminal 1 : backend

```bash
cd WebApi
dotnet run
```

API :

```text
http://localhost:5095
```

### Terminal 2 : frontend

```bash
cd webApp
npm run dev
```

Application React :

```text
http://localhost:5173
```

## Communication frontend / backend

Le frontend appelle l'API avec cette URL de base :

```js
const API_URL = 'http://localhost:5095/api/user'
```

Cette configuration se trouve dans :

```text
webApp/src/services/userService.js
```

Le backend autorise le frontend grace a la configuration CORS dans `WebApi/Program.cs` :

```csharp
.WithOrigins("http://localhost:5173")
.AllowAnyHeader()
.AllowAnyMethod();
```

Si le port du frontend change, il faut aussi modifier l'origine autorisee cote backend.

## Routes de l'API utilisateur

Le controleur principal est :

```text
WebApi/Controllers/UserController.cs
```

Base URL :

```text
http://localhost:5095/api/user
```

| Methode | Route | Description |
| --- | --- | --- |
| `POST` | `/api/user/register` | Creer un utilisateur |
| `POST` | `/api/user/login` | Connecter un utilisateur |
| `GET` | `/api/user` | Recuperer tous les utilisateurs |
| `GET` | `/api/user/{id}` | Recuperer un utilisateur par son id |
| `PUT` | `/api/user/{id}` | Modifier un utilisateur |
| `DELETE` | `/api/user/{id}` | Supprimer un utilisateur |

## Exemple : inscription

Requete :

```http
POST http://localhost:5095/api/user/register
Content-Type: application/json
```

Body :

```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "adresse": "10 rue de Paris",
  "telephone": "0600000000",
  "ville": "Paris",
  "pays": "France",
  "password": "Password123!"
}
```

Reponse attendue :

```json
{
  "id": 1,
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "adresse": "10 rue de Paris",
  "telephone": "0600000000",
  "ville": "Paris",
  "pays": "France",
  "createdAt": "2026-05-29T10:00:00Z"
}
```

Le mot de passe n'est pas renvoye par l'API. Il est transforme en hash avec `BCrypt.Net-Next`.

## Exemple : connexion

Requete :

```http
POST http://localhost:5095/api/user/login
Content-Type: application/json
```

Body :

```json
{
  "email": "jean.dupont@example.com",
  "password": "Password123!"
}
```

Reponse attendue :

```json
{
  "message": "Connexion reussie.",
  "user": {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com",
    "adresse": "10 rue de Paris",
    "telephone": "0600000000",
    "ville": "Paris",
    "pays": "France",
    "createdAt": "2026-05-29T10:00:00Z"
  }
}
```

## Points importants pour le cours

- Le frontend ne parle pas directement a la base de donnees.
- Le frontend envoie des requetes HTTP au backend.
- Le backend recoit les donnees dans des DTO.
- Entity Framework Core transforme les objets C# en donnees stockees dans SQLite.
- Le mot de passe ne doit jamais etre stocke en clair.
- Le backend renvoie un objet utilisateur sans `PasswordHash`.
- CORS est necessaire car React et l'API tournent sur deux ports differents.

## Commandes utiles

### Backend

```bash
cd WebApi
dotnet restore
dotnet build
dotnet run
dotnet ef database update
```

Creer une nouvelle migration :

```bash
dotnet ef migrations add NomDeLaMigration
```

### Frontend

```bash
cd webApp
npm install
npm run dev
npm run build
npm run lint
```

## Erreurs frequentes

### Le frontend affiche "Impossible de contacter le serveur"

Verifier que le backend est bien lance :

```text
http://localhost:5095
```

Verifier aussi que `webApp/src/services/userService.js` pointe vers le bon port.

### Erreur CORS

Verifier que l'origine du frontend est autorisee dans `WebApi/Program.cs`.

Exemple :

```csharp
.WithOrigins("http://localhost:5173")
```

### `dotnet ef` n'est pas reconnu

Installer l'outil EF Core :

```bash
dotnet tool install --global dotnet-ef
```

### La base de donnees n'est pas a jour

Depuis le dossier `WebApi` :

```bash
dotnet ef database update
```

## Objectif pedagogique

A la fin du cours, les etudiants doivent comprendre :

- comment structurer une application full-stack ;
- comment installer et lancer un backend ASP.NET Core ;
- comment installer et lancer un frontend React ;
- comment envoyer des donnees d'un formulaire React vers une API ;
- comment valider les donnees avec des DTO ;
- comment stocker les utilisateurs avec Entity Framework Core ;
- pourquoi il faut hasher les mots de passe ;
- comment diagnostiquer les problemes de ports, CORS et connexion API.
