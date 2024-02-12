const express = require('express');
const stripe = require('stripe')(process.env.STRIP_KEY);
const stripRoutes = express.Router();

stripRoutes.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'prod_PVZXFFdFdr4ACJ',

        quantity: 2,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.redirect(303, session.url);
});

module.exports = stripRoutes;
