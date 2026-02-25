# Aseflow Website

India's First Liquid Protein Shot — official website.

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS
- Netlify Functions (serverless backend)
- Zoho Mail (email delivery)

## Deploy on Netlify
- Build command: `npm run build`
- Publish directory: `dist`

## Environment Variables (set in Netlify dashboard)
```
ZOHO_EMAIL=info@aseflow.com
ZOHO_PASSWORD=your_zoho_password
ZOHO_HOST=smtp.zoho.in
ZOHO_PORT=465
```

## Local Development
```bash
npm install
npm run dev
```
