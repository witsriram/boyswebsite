# Twins Journey Website

A colorful website to chronicle the growth of twin boys. The site features:

- **Dynamic milestone posts** loaded from a PostgreSQL database and editable via the web form.
- **Yearly photo gallery** powered by `data/gallery.json`.
- **Light/Dark theme toggle** for a punchy, customizable UI.

## Running locally

```bash
npm install
npm start
```
The app serves at `http://localhost:8080` and expects a PostgreSQL database available at `DATABASE_URL`.

## Docker

Build and run the site with Postgres using Docker Compose:

```bash
docker-compose up --build
```

## Azure deployment

The `infra/main.bicep` file provisions an App Service running the container and a PostgreSQL flexible server. Supply parameters such as `siteName`, `imageName`, and database credentials when deploying.

## Adding gallery images

Update `data/gallery.json` with new years and image URLs to expand the gallery.
