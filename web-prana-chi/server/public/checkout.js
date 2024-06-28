// This is your test secret API key.
const stripe = Stripe("pk_test_51PWd8pHiRhVJvK2GU7YDjtEW0M63Mniay1FKsDijKfCh5e5wn9fCnu7lIPsPtKzQHZ2g016agQf5X3RnDBKfz3gh00ozKRfs6f");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}