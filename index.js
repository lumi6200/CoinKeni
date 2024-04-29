import express from "express";
const app = express();
const port = 3000;

import axios from "axios";
const API_URL = "https://api.coinpaprika.com/v1";
const BTC_ID = "btc-bitcoin";
const ETH_ID = "eth-ethereum";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const [btcResponse, ethResponse] = await Promise.all([
            axios.get(`${API_URL}/ticker/${BTC_ID}`),
            axios.get(`${API_URL}/ticker/${ETH_ID}`),
        ]);

        const btcData = btcResponse.data;
        const ethData = ethResponse.data;

        res.render("index.ejs", { bitcoin: btcData, ethereum: ethData });
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})