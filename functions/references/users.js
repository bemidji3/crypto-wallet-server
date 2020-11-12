const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
admin.initializeApp(functions.config().firebase);

function createNewUser(userInfo) {
    userInfo["orders"] = [];
    const db = admin.database();
    const userReference = db.ref("users");
    const splicedEmail = userInfo.email.split("@");
    return userReference.child(splicedEmail[0]).set(userInfo);
}

function addBinanceInfo(userId, binanceInfo) {
    const db = admin.database();
    const userBinanceReference = db.ref("users");

    return userBinanceReference.child(userId).child("binanceInfo").set(binanceInfo);
}

async function getUser(email) {
    const db = admin.database();
    const splicedEmail = email.split("@");
    const userRef = db.ref("users").child(splicedEmail[0]);

    const wrappedUrl = userRef + ".json?print=pretty";

    const result = await axios.get(wrappedUrl);
    const resultJson = await result.data;

    return resultJson
}

module.exports = {
    createNewUser,
    addBinanceInfo,
    getUser,
};
