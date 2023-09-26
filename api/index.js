import express from "express";

const app = express();
const port = 3000; //add your port here
const SECRET_KEY = "sk_test_51Ns6QXHzXDpjYI6LspUpXzk1TmamzEHc5IZ5w5FHqMXYgK0LyQ640XrI7sJFDsPJpayCbdCdU5LJsJzmtGGbaVAf00dOCRhRGI";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboardd
const stripe = Stripe(SECRET_KEY, { apiVersion: "2023-08-16" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent/24pack", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "eur",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
app.post("/create-payment-intent/36pack/", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1999, //lowest denomination of particular currency
        currency: "eur",
        payment_method_types: ["card"] 
      });
  
      const clientSecret = paymentIntent.client_secret;
  
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });
  app.post("/create-payment-intent/42pack/", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2499, //lowest denomination of particular currency
        currency: "eur",
        payment_method_types: ["card"] 
      });
  
      const clientSecret = paymentIntent.client_secret;
  
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });
