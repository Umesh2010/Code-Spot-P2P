const express = require("express");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);
const turnServerTokenRoutes = express.Router();

turnServerTokenRoutes.route("/api/turnServerToken").get(async function(req, res) {
    const access_token = await client.verify.v2.services(serviceSid)
        .accessTokens
        .create({identity: 'identity', factorType: 'push'});

    res.json(access_token);
});

module.exports = turnServerTokenRoutes;
