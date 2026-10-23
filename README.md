# Pizza Buffet 🍕

A cute, light-pink website for booking birthday party pizza catering. We bring a mobile pizza-building cart to your home — like Yogurtland, but for pizza!

## Features

- **How It Works** — Simple 3-step explanation
- **Party Packages** — Little Slice, Birthday Bash, and Pizza Palooza
- **Photo Gallery** — Click any photo to view full-size
- **Local Deals** — Clickable promo codes
- **Cartoon Ingredient Icons** — Cute SVG illustrations on every topping, cheese & dough button
- **Booking Flow** — 4-step form: info → customize → review → payment
- **Payments** — Stripe, PayPal, and Klarna (demo mode works out of the box)
- **Email Confirmations** — Via EmailJS when configured

## Run Locally

```bash
open index.html
```

Or start a local server:

```bash
python3 -m http.server 8765
# Visit http://localhost:8765
```

## Demo Payment

Without API keys, the site runs in **demo mode**:

| Method | How to test |
|--------|-------------|
| **Stripe** | Card `4242 4242 4242 4242`, any future expiry, any CVC |
| **PayPal** | Click "Continue with PayPal (Demo)" |
| **Klarna** | Click "Pay with Klarna" |

## Enable Live Services

Edit `config.js`:

```js
const PIZZA_BUFFET_CONFIG = {
  emailjs: {
    publicKey: 'your_public_key',
    serviceId: 'your_service_id',
    templateId: 'your_template_id',
    businessEmail: 'hello@pizzabuffet.com',
  },
  stripe: {
    publishableKey: 'pk_live_...',
  },
  paypal: {
    clientId: 'your_paypal_client_id',
    currency: 'USD',
  },
  klarna: {
    clientId: 'your_klarna_client_id',
  },
};
```

### EmailJS Setup

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an email service (Gmail, etc.)
3. Create a template with these variables:
   - `{{to_name}}`, `{{to_email}}`, `{{booking_ref}}`, `{{party_date}}`
   - `{{package_name}}`, `{{address}}`, `{{dough}}`, `{{cheeses}}`, `{{toppings}}`
   - `{{bonus_item}}`, `{{deal_applied}}`, `{{total}}`, `{{payment_method}}`, `{{notes}}`
4. Paste your keys into `config.js`

## Deal Codes

| Code | Offer |
|------|-------|
| `WEEKDAY30` | $30 off weekday parties |
| `NEIGHBOR15` | 15% off when booking with a neighbor |
| `BDAYFREE` | Free garlic knots pan in your birthday month |

## Topping Options

Sausage, pepperoni, onions, olives, green bell pepper, red bell pepper, bacon, ham, pineapple, mushrooms, grilled chicken, spinach, and jalapeños (max 6 per cart).
