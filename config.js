/**
 * Pizza Buffet — Service Configuration
 * Add your API keys here to enable live email & payments.
 * Leave empty strings to run in demo mode (booking still works locally).
 */
const PIZZA_BUFFET_CONFIG = {
  emailjs: {
    publicKey: '',
    serviceId: '',
    templateId: '',
    businessEmail: 'hello@pizzabuffet.com',
  },
  stripe: {
    publishableKey: '',
  },
  paypal: {
    clientId: '',
    currency: 'USD',
  },
  klarna: {
    clientId: '',
  },
};
