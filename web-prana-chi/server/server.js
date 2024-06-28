const stripe = require('stripe')('sk_test_51PWd8pHiRhVJvK2GvZlea6RgLQuaJ1AyYoRHqLJPuw3099anvAqMAKTE1rOgbUwspGRN15WlNw9TOJp8vIgPFHCD002mMzI6zY');
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser') 

app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.json())
const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/checkout', async (req, res) => {
  const items =req.body.items.map((item) =>{
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.Concepto
        },
        unit_amount: item.Cantidad * 100,
      },
      quantity: 1
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [...items],
    mode: 'payment',
    success_url: "http://localhost:4200/pagos",
    cancel_url: "http://localhost:4200/",
  })

  res.status(200).json(session);
});

app.listen(4242, () => console.log('Running on port 4242'));