const express = require('express');
const request = require('request');



const router = express.Router();

router.get('/', (req, res) => {
    request(
        { url: 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }

            res.json(JSON.parse(body));
        }
    )
});

module.exports = router