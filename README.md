<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/36fc03c6-b372-4011-8ec9-d0ab432524fa

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
... (keep existing top of README) ...

---

## Deploy to Render (recommended quick path)

This repo is a Vite + Express fullstack app. Render can build and run it with the existing npm scripts.

1. Connect your GitHub account to Render: https://render.com
2. Create a new Web Service and select the repository `aditri-gaur/meltado`.
3. Branch: `main`.
4. Use the following build & start commands:
   - Build command: `npm ci && npm run build`
   - Start command: `npm start`

5. Add environment variables in the Render dashboard (Service → Environment):
   - `GEMINI_API_KEY` — (optional) your Gemini API key if you want the AI Barista to call Gemini.
   - `NODE_ENV=production`

Render will provide the `PORT` environment variable automatically; the app is configured to respect it.

After deployment, verify:
- Open the Render-provided URL.
- Test API endpoints: `/api/menu`, `/api/reviews`, `/api/reservations`.

---

## Docker / Container deployment

A `Dockerfile` has been added so you can build a container image and push to any registry (Docker Hub, GCR, ECR, or Render's container registry).

Example (build + run locally):

```bash
# build
docker build -t meltado:latest .
# run
docker run -e NODE_ENV=production -p 8080:8080 -e GEMINI_API_KEY="your_key" meltado:latest
