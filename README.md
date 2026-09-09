# Candle Heaven

Premium, mobile-friendly e-commerce storefront for Candle Heaven Brisbane.

## Included

- Responsive luxury storefront and product catalogue
- Search and scent-category filters
- Individual product pages
- Shopping bag saved between visits
- Customer checkout form
- Stripe Payment Link-ready checkout
- WhatsApp order fallback to `0423 727 047`
- Facebook and Instagram links
- Browser-based product manager at `admin.html`

## Connect Stripe payments

Create a Stripe Payment Link and paste it into `config.js` as `stripePaymentLink`. Do not put a Stripe secret key in this repository. For fully automated per-item checkout, connect a secure backend or an e-commerce platform before accepting live card payments.

## Add products

Open `admin.html`, enter the new candle, click **Copy website code**, then replace the contents of `products.js` with the copied code. Products are kept in one simple file, so no design code needs to be changed.

## Social links

Update `facebook` and `instagram` in `config.js`. The supplied Candle Heaven Facebook page is already connected.

## Publish

This is a dependency-free static website. It can be published with GitHub Pages, Cloudflare Pages, Netlify, Vercel, or another static host. The entry point is `index.html`.
