# Candle Heaven Australia

Premium, mobile-friendly Candle Heaven storefront hosted on GitHub Pages.

## Live website

`https://tensaye-dior.github.io/candle-heaven/`

## Included

- Candle Heaven Australia luxury storefront
- Searchable product collection
- Shopping bag and checkout flow
- Dedicated Our Story page
- Shipping, returns, privacy, terms and candle-safety page
- Product manager for adding candles and editing prices
- Facebook and Instagram links
- Phone: +61 466 846 785
- Email: candleheaven609@gmail.com
- Square checkout-ready configuration with WhatsApp fallback until a Square Payment Link is supplied

## Square payment setup

Create a Square Payment Link inside the owner's Square account. Then paste only the public Square checkout URL into `squarePaymentLink` in `config.js`.

Never place a bank-card number, CVV, banking password, Square password, API secret, verification code or private banking information inside this repository. GitHub Pages is public.

## Products and photos

Open `admin.html` to manage candle names, prices and product information. Product image files can be uploaded to an `images/` folder in the repository and referenced as `images/your-photo.jpg`.

## Security model

The storefront never needs to receive or store full card details. Payment should be completed on Square's secure hosted checkout page. GitHub Pages provides HTTPS for the public site.
