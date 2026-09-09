# Candle Heaven

A complete, mobile-friendly Candle Heaven storefront for Brisbane. It includes a searchable catalogue, shopping bag, checkout-ready order flow, WhatsApp ordering, Facebook and Instagram links, and a simple product manager.

## Preview on GitHub Pages

1. Open this repository on GitHub.
2. Select **Settings**.
3. In the left menu, select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then select **Save**.
6. Wait 1–3 minutes. Refresh the Pages screen and open **Visit site**.

The expected address is `https://tensaye-dior.github.io/candle-heaven/`.

## Preview on your laptop

Download the repository as a ZIP, unzip it, and double-click `index.html`. No installation or build command is required.

## Store setup

- Phone/WhatsApp is set to `0423 727 047`.
- Facebook is connected to the link supplied by Candle Heaven.
- Replace the Instagram placeholder URL after creating the Candle Heaven Instagram page.
- To accept card payments, paste a Stripe Payment Link into `CONFIG.stripePaymentLink` near the bottom of `index.html`.
- To add a product, open the bag and expand **Store owner: add a new product**. Products added there are saved in that browser. The generated JSON can then be committed into the website for permanent publishing.

## Technology

The entire website is in `index.html`, so GitHub Pages can run it directly with no dependencies.
