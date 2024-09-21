# Utiliser une image Node.js officielle pour construire l'application
FROM node:18-alpine as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --force

# Copier tout le reste des fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Utiliser une image Nginx pour servir les fichiers
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port sur lequel Nginx sert l'application
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
