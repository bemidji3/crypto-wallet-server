const functions = require('firebase-functions');
const users = require("./references/users.js");
const currencies = require("./libraries/ccxt");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 6969;

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.listen(port, () => {
    console.log("listening on port ", port);
});

app.post("/new-user", async (req, res) => {
    console.log("request body ", req.body);

    const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        userName,
        memberSince,
    } = req.body;

    const newUserObject = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        userName,
        memberSince,
    };

    const createNewUserResult = users.createNewUser(newUserObject);

    res.send(JSON.stringify(createNewUserResult));
});

app.post("/update-user-binance-info", async (req, res) => {
    const { userId, userInfo } = req.body;

    const result = users.addBinanceInfo(userId, userInfo);

    res.send(JSON.stringify(result));
});

app.post("/get-user-info", async (req, res) => {
    const { email } = req.body;

    console.log("here is the request email: ", email);

    const result = await users.getUser(email);
    console.log("result in main function ", result);

    return res.send(JSON.stringify(result));

});

app.post("/new-order", async (req, res) => {
    const { currency, amount, price, side, type, email } = req.body;

    const order = side === "buy" ? await currencies.createBuyOrder(currency, amount, price, type, email.email) : await currencies.createSellOrder(currency, amount, price, type, email.email);

    res.send(JSON.stringify({order}));
});

app.post("/get-orders", async (req, res) => {
    const {email} = req.body;

    const result = await currencies.getOrders(email);

    return res.send(JSON.stringify(result));
});

exports.app = functions.https.onRequest(app);
