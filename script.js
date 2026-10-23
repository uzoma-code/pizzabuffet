/**
 * Pizza Buffet — Booking, Payment & Email Logic
 */

const MAX_TOPPINGS = 6;

const PACKAGE_NAMES = {
  'little-slice': 'Little Slice (Up to 8 guests)',
  'birthday-bash': 'Birthday Bash (Up to 15 guests)',
  'pizza-palooza': 'Pizza Palooza (Up to 25 guests)',
};

const PACKAGE_PRICES = {
  'little-slice': 149,
  'birthday-bash': 229,
  'pizza-palooza': 349,
};

const DOUGH_LABELS = {
  'classic-flour': 'Classic Flour Dough',
  'gluten-free': 'Gluten-Free Dough',
  both: 'Both Dough Options',
};

const DEAL_DISCOUNTS = {
  WEEKDAY30: { type: 'fixed', amount: 30, label: 'Weekday Wonder (-$30)' },
  NEIGHBOR15: { type: 'percent', amount: 15, label: 'Neighborhood Friends (-15%)' },
  BDAYFREE: { type: 'bonus', amount: 0, label: 'Birthday Month Special (Free garlic knots pan)' },
};

const TOPPING_LABELS = {
  sausage: 'Sausage',
  pepperoni: 'Pepperoni',
  onions: 'Onions',
  olives: 'Olives',
  'green-bell-pepper': 'Green Bell Pepper',
  'red-bell-pepper': 'Red Bell Pepper',
  bacon: 'Bacon',
  ham: 'Ham',
  pineapple: 'Pineapple',
  mushrooms: 'Mushrooms',
  'grilled-chicken': 'Grilled Chicken',
  spinach: 'Spinach',
  jalapenos: 'Jalapeños',
};

const CHEESE_LABELS = {
  mozzarella: 'Mozzarella',
  cheddar: 'Cheddar',
  parmesan: 'Parmesan',
  ricotta: 'Ricotta',
};

const PAYMENT_LABELS = {
  stripe: 'Stripe (Card)',
  paypal: 'PayPal',
  klarna: 'Klarna',
};

// ---- DOM Elements ----
const form = document.getElementById('booking-form');
const formPanels = document.querySelectorAll('.form-panel');
const formSteps = document.querySelectorAll('.form-step');
const toppingInputs = document.querySelectorAll('input[name="topping"]');
const toppingCountEl = document.getElementById('topping-count');
const toppingLimitMsg = document.getElementById('topping-limit-msg');
const bookingSuccess = document.getElementById('booking-success');
const bookingSummary = document.getElementById('booking-summary');
const submitBtn = document.getElementById('submit-payment');

let currentStep = 1;
let stripe = null;
let stripeElements = null;
let stripeCardElement = null;
let paypalRendered = false;
let pendingBookingRef = null;

const config = typeof PIZZA_BUFFET_CONFIG !== 'undefined' ? PIZZA_BUFFET_CONFIG : {};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initFoodIcons();
  updateToppingUI();
  updateCartPreview();
  initPaymentMethods();
  initGalleryLightbox();
});

// ---- Mobile Nav ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- Gallery Lightbox ----
function initGalleryLightbox() {
  document.querySelectorAll('.gallery-item img').forEach((img) => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'gallery-lightbox';
      overlay.innerHTML = `
        <button class="gallery-lightbox-close" aria-label="Close">&times;</button>
        <img src="${img.src.replace('w=600', 'w=1200').replace('w=800', 'w=1200')}" alt="${img.alt}" />
      `;
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const close = () => {
        overlay.remove();
        document.body.style.overflow = '';
      };

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('gallery-lightbox-close')) close();
      });
    });
  });
}

// ---- Package Selection from Cards ----
document.querySelectorAll('.select-package').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.package-card');
    document.getElementById('package-select').value = card.dataset.package;
    document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- Deal Code Click to Fill ----
document.querySelectorAll('.deal-code').forEach((code) => {
  code.style.cursor = 'pointer';
  code.title = 'Click to use this code';
  code.addEventListener('click', () => {
    document.getElementById('deal-code').value = code.textContent;
    document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- Topping Limit (max 6) ----
function getSelectedToppings() {
  return [...document.querySelectorAll('input[name="topping"]:checked')];
}

function updateToppingUI() {
  const selected = getSelectedToppings();
  const count = selected.length;
  toppingCountEl.textContent = count;

  if (count >= MAX_TOPPINGS) {
    toppingLimitMsg.hidden = false;
    toppingInputs.forEach((input) => {
      if (!input.checked) input.disabled = true;
    });
    document.querySelectorAll('.topping-card').forEach((card) => {
      const input = card.querySelector('input');
      card.classList.toggle('disabled', !input.checked);
    });
  } else {
    toppingLimitMsg.hidden = true;
    toppingInputs.forEach((input) => {
      input.disabled = false;
    });
    document.querySelectorAll('.topping-card').forEach((card) => card.classList.remove('disabled'));
  }
}

toppingInputs.forEach((input) => {
  input.addEventListener('change', () => {
    updateToppingUI();
    updateCartPreview();
  });
});

document.querySelectorAll('input[name="dough"], input[name="cheese"]').forEach((input) => {
  input.addEventListener('change', updateCartPreview);
});

function updateCartPreview() {
  const previewBody = document.getElementById('cart-preview-body');
  if (!previewBody) return;

  const items = [];
  const code = document.getElementById('deal-code')?.value.trim().toUpperCase();
  if (code === 'BDAYFREE') {
    items.push({ label: 'Free Garlic Knots Pan', icon: 'garlic-knots' });
  }

  const dough = document.querySelector('input[name="dough"]:checked')?.value;
  if (dough) items.push({ label: DOUGH_LABELS[dough], icon: dough });

  document.querySelectorAll('input[name="cheese"]:checked').forEach((c) => {
    items.push({ label: CHEESE_LABELS[c.value], icon: c.value });
  });

  getSelectedToppings().forEach((t) => {
    items.push({ label: TOPPING_LABELS[t.value], icon: t.value });
  });

  if (items.length === 0) {
    previewBody.innerHTML = '<p class="cart-preview-empty">Tap ingredients below to fill your cart!</p>';
    return;
  }

  previewBody.innerHTML = items
    .map((item) => {
      const iconHtml = FOOD_ICONS[item.icon] || '';
      return `<span class="cart-preview-item"><span class="cart-preview-icon-svg">${iconHtml}</span>${item.label}</span>`;
    })
    .join('');
}

// ---- Form Step Navigation ----
function goToStep(step) {
  currentStep = step;

  formPanels.forEach((panel) => {
    panel.classList.toggle('active', parseInt(panel.dataset.panel, 10) === step);
  });

  formSteps.forEach((fs) => {
    fs.classList.toggle('active', parseInt(fs.dataset.step, 10) === step);
  });

  if (step === 3) renderSummary();
  if (step === 4) {
    updatePaymentTotal();
    initStripeIfNeeded();
    initPayPalIfNeeded();
  }
}

function validateStep1() {
  const required = ['name', 'email', 'phone', 'party-date', 'package-select', 'street', 'city', 'state', 'zip'];
  let valid = true;
  required.forEach((id) => {
    const el = document.getElementById(id);
    if (!el.checkValidity()) {
      el.reportValidity();
      valid = false;
    }
  });
  return valid;
}

function validateStep2() {
  if (getSelectedToppings().length === 0) {
    alert('Please select at least one topping for your party cart!');
    return false;
  }
  return true;
}

document.querySelectorAll('.next-step').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    goToStep(currentStep + 1);
  });
});

document.querySelectorAll('.prev-step').forEach((btn) => {
  btn.addEventListener('click', () => goToStep(currentStep - 1));
});

const dateInput = document.getElementById('party-date');
if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

document.getElementById('deal-code')?.addEventListener('input', updateCartPreview);

// ---- Pricing ----
function calculatePrice() {
  const pkg = document.getElementById('package-select').value;
  let price = PACKAGE_PRICES[pkg] || 0;
  let discountLabel = null;
  let bonusItem = null;

  const code = document.getElementById('deal-code').value.trim().toUpperCase();
  const deal = DEAL_DISCOUNTS[code];

  if (deal) {
    if (deal.type === 'fixed') {
      price -= deal.amount;
      discountLabel = deal.label;
    } else if (deal.type === 'percent') {
      const discount = Math.round(price * (deal.amount / 100));
      price -= discount;
      discountLabel = `${deal.label} (-$${discount})`;
    } else if (deal.type === 'bonus') {
      discountLabel = deal.label;
      bonusItem = 'Free Garlic Knots Pan';
    }
  }

  return { price: Math.max(price, 0), discountLabel, bonusItem, dealCode: code };
}

function getBookingData() {
  const dough = document.querySelector('input[name="dough"]:checked')?.value;
  const cheeses = [...document.querySelectorAll('input[name="cheese"]:checked')].map((c) => CHEESE_LABELS[c.value]);
  const toppings = getSelectedToppings().map((t) => TOPPING_LABELS[t.value]);
  const { price, discountLabel, bonusItem } = calculatePrice();
  const partyDate = document.getElementById('party-date').value;
  const pkg = document.getElementById('package-select').value;

  return {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    partyDate,
    formattedDate: new Date(partyDate + 'T12:00:00').toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }),
    package: pkg,
    packageName: PACKAGE_NAMES[pkg] || pkg,
    street: document.getElementById('street').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    zip: document.getElementById('zip').value,
    fullAddress: `${document.getElementById('street').value}, ${document.getElementById('city').value}, ${document.getElementById('state').value} ${document.getElementById('zip').value}`,
    dough: DOUGH_LABELS[dough] || dough,
    cheeses: cheeses.length ? cheeses.join(', ') : 'Standard mozzarella included',
    toppings: toppings.join(', '),
    toppingCount: toppings.length,
    notes: document.getElementById('notes').value,
    dealCode: document.getElementById('deal-code').value.trim().toUpperCase(),
    discountLabel,
    bonusItem,
    price,
    paymentMethod: document.querySelector('input[name="payment-method"]:checked')?.value || 'stripe',
  };
}

function renderSummary() {
  const data = getBookingData();

  bookingSummary.innerHTML = `
    <div class="summary-row"><span class="summary-label">Name</span><span class="summary-value">${escapeHtml(data.name)}</span></div>
    <div class="summary-row"><span class="summary-label">Email</span><span class="summary-value">${escapeHtml(data.email)}</span></div>
    <div class="summary-row"><span class="summary-label">Phone</span><span class="summary-value">${escapeHtml(data.phone)}</span></div>
    <div class="summary-row"><span class="summary-label">Party Date</span><span class="summary-value">${data.formattedDate}</span></div>
    <div class="summary-row"><span class="summary-label">Package</span><span class="summary-value">${data.packageName}</span></div>
    <div class="summary-row"><span class="summary-label">Address</span><span class="summary-value">${escapeHtml(data.fullAddress)}</span></div>
    <div class="summary-row"><span class="summary-label">Dough</span><span class="summary-value">${data.dough}</span></div>
    <div class="summary-row"><span class="summary-label">Cheeses</span><span class="summary-value">${data.cheeses}</span></div>
    <div class="summary-row"><span class="summary-label">Toppings (${data.toppingCount}/6)</span><span class="summary-value">${data.toppings}</span></div>
    ${data.bonusItem ? `<div class="summary-row"><span class="summary-label">Birthday Bonus</span><span class="summary-value">🎁 ${data.bonusItem}</span></div>` : ''}
    ${data.notes ? `<div class="summary-row"><span class="summary-label">Notes</span><span class="summary-value">${escapeHtml(data.notes)}</span></div>` : ''}
    ${data.discountLabel ? `<div class="summary-row"><span class="summary-label">Deal Applied</span><span class="summary-value">${data.discountLabel}</span></div>` : ''}
    <div class="summary-row total"><span class="summary-label">Total</span><span class="summary-value">$${data.price}</span></div>
  `;
}

function updatePaymentTotal() {
  const { price } = calculatePrice();
  document.getElementById('payment-total').textContent = `$${price}`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- Payment Methods ----
function initPaymentMethods() {
  document.querySelectorAll('input[name="payment-method"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const method = radio.value;
      document.querySelectorAll('.payment-panel').forEach((p) => p.classList.remove('active'));
      document.getElementById(`payment-panel-${method}`)?.classList.add('active');
      if (method === 'paypal') initPayPalIfNeeded();
    });
  });

  document.getElementById('klarna-pay-btn')?.addEventListener('click', () => {
    document.querySelector('input[name="payment-method"][value="klarna"]').checked = true;
    document.querySelectorAll('.payment-panel').forEach((p) => p.classList.remove('active'));
    document.getElementById('payment-panel-klarna')?.classList.add('active');
    form.requestSubmit();
  });
}

function initStripeIfNeeded() {
  const container = document.getElementById('stripe-card-element');
  if (!container || stripeCardElement) return;

  if (config.stripe?.publishableKey && typeof Stripe !== 'undefined') {
    stripe = Stripe(config.stripe.publishableKey);
    stripeElements = stripe.elements();
    stripeCardElement = stripeElements.create('card', {
      style: {
        base: {
          fontFamily: 'Nunito, sans-serif',
          fontSize: '16px',
          color: '#5c3d4a',
          '::placeholder': { color: '#8a6b75' },
        },
      },
    });
    stripeCardElement.mount('#stripe-card-element');
  } else {
    container.innerHTML = `
      <div class="demo-card-form">
        <input type="text" id="demo-card-number" placeholder="Card number (demo: 4242 4242 4242 4242)" />
        <div class="demo-card-row">
          <input type="text" id="demo-card-exp" placeholder="MM/YY" maxlength="5" />
          <input type="text" id="demo-card-cvc" placeholder="CVC" maxlength="4" />
        </div>
      </div>
    `;
  }
}

function loadPayPalScript() {
  return new Promise((resolve, reject) => {
    if (window.paypal) { resolve(); return; }
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${config.paypal.clientId}&currency=${config.paypal.currency || 'USD'}`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function initPayPalIfNeeded() {
  const container = document.getElementById('paypal-button-container');
  if (!container || paypalRendered) return;

  if (config.paypal?.clientId) {
    loadPayPalScript().then(() => {
      container.innerHTML = '';
      window.paypal.Buttons({
        createOrder: (_data, actions) => {
          const { price } = calculatePrice();
          return actions.order.create({
            purchase_units: [{ amount: { value: price.toFixed(2), currency_code: 'USD' } }],
          });
        },
        onApprove: async (_data, actions) => {
          await actions.order.capture();
          document.querySelector('input[name="payment-method"][value="paypal"]').checked = true;
          completeBooking('paypal');
        },
      }).render('#paypal-button-container');
      paypalRendered = true;
    }).catch(() => showPayPalDemo(container));
  } else {
    showPayPalDemo(container);
  }
}

function showPayPalDemo(container) {
  container.innerHTML = `
    <button type="button" class="btn btn-outline paypal-demo-btn" id="paypal-demo-btn">
      Continue with PayPal (Demo)
    </button>
  `;
  document.getElementById('paypal-demo-btn')?.addEventListener('click', () => {
    document.querySelector('input[name="payment-method"][value="paypal"]').checked = true;
    completeBooking('paypal');
  });
  paypalRendered = true;
}

async function processPayment(method) {
  const { price } = calculatePrice();

  if (method === 'stripe') {
    if (stripe && stripeCardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: stripeCardElement,
      });
      if (error) throw new Error(error.message);
      return { success: true, id: paymentMethod.id };
    }

    const cardNum = document.getElementById('demo-card-number')?.value.replace(/\s/g, '') || '';
    if (!cardNum) throw new Error('Please enter a card number.');
    if (cardNum !== '4242424242424242' && cardNum.length < 15) {
      throw new Error('Invalid card. Use 4242 4242 4242 4242 for demo.');
    }
    await delay(800);
    return { success: true, id: 'demo_stripe_' + Date.now() };
  }

  if (method === 'paypal') {
    await delay(600);
    return { success: true, id: 'demo_paypal_' + Date.now() };
  }

  if (method === 'klarna') {
    await delay(1000);
    const installments = (price / 4).toFixed(2);
    return { success: true, id: 'demo_klarna_' + Date.now(), installments };
  }

  throw new Error('Please select a payment method.');
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ---- Email Confirmation ----
async function sendConfirmationEmail(bookingRef, data, paymentResult) {
  const emailParams = {
    to_email: data.email,
    to_name: data.name,
    booking_ref: bookingRef,
    party_date: data.formattedDate,
    package_name: data.packageName,
    address: data.fullAddress,
    dough: data.dough,
    cheeses: data.cheeses,
    toppings: data.toppings,
    bonus_item: data.bonusItem || 'None',
    deal_applied: data.discountLabel || 'None',
    total: `$${data.price}`,
    payment_method: PAYMENT_LABELS[data.paymentMethod],
    payment_id: paymentResult.id,
    notes: data.notes || 'None',
    reply_to: config.emailjs?.businessEmail || 'hello@pizzabuffet.com',
  };

  if (config.emailjs?.publicKey && config.emailjs?.serviceId && config.emailjs?.templateId) {
    emailjs.init(config.emailjs.publicKey);
    await emailjs.send(config.emailjs.serviceId, config.emailjs.templateId, emailParams);
    return true;
  }

  console.log('📧 Email confirmation (demo mode):', emailParams);
  return false;
}

function setSubmitLoading(loading) {
  submitBtn.disabled = loading;
  submitBtn.querySelector('.submit-text').hidden = loading;
  submitBtn.querySelector('.submit-loading').hidden = !loading;
}

async function completeBooking(forcedMethod) {
  const data = getBookingData();
  if (forcedMethod) data.paymentMethod = forcedMethod;

  const ref = pendingBookingRef || ('PB-' + Date.now().toString(36).toUpperCase());
  pendingBookingRef = ref;

  try {
    setSubmitLoading(true);
    const paymentResult = await processPayment(data.paymentMethod);
    const emailSent = await sendConfirmationEmail(ref, data, paymentResult);

    form.hidden = true;
    bookingSuccess.hidden = false;
    document.getElementById('booking-ref').textContent = ref;

    const successMsg = document.getElementById('success-message');
    successMsg.textContent = emailSent
      ? `Thank you, ${data.name}! A confirmation email has been sent to ${data.email}.`
      : `Thank you, ${data.name}! Your booking is confirmed. (Add EmailJS keys in config.js to send real emails.)`;

    const paymentEl = document.getElementById('success-payment-method');
    paymentEl.hidden = false;
    paymentEl.textContent = `Paid via ${PAYMENT_LABELS[data.paymentMethod]}${paymentResult.installments ? ` — 4 payments of $${paymentResult.installments}` : ''}`;

    bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (err) {
    alert(err.message || 'Payment failed. Please try again.');
  } finally {
    setSubmitLoading(false);
  }
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (currentStep !== 4) {
    goToStep(4);
    return;
  }
  completeBooking();
});

document.getElementById('book-another')?.addEventListener('click', () => {
  form.reset();
  document.querySelector('input[name="dough"][value="classic-flour"]').checked = true;
  document.querySelector('input[name="cheese"][value="mozzarella"]').checked = true;
  document.querySelector('input[name="payment-method"][value="stripe"]').checked = true;
  document.querySelectorAll('.payment-panel').forEach((p) => p.classList.remove('active'));
  document.getElementById('payment-panel-stripe')?.classList.add('active');
  document.getElementById('success-payment-method').hidden = true;
  pendingBookingRef = null;
  paypalRendered = false;
  document.getElementById('paypal-button-container').innerHTML = '';
  if (stripeCardElement) {
    stripeCardElement.unmount();
    stripeCardElement = null;
    document.getElementById('stripe-card-element').innerHTML = '';
  }
  form.hidden = false;
  bookingSuccess.hidden = true;
  updateToppingUI();
  updateCartPreview();
  goToStep(1);
});
