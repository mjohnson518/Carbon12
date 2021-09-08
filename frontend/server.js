require("dotenv").config();
const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const axios = require('axios').default;

const PORT = 3001
const app = express();

app.use(cors());

const options = {};

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)

app.get('/typeform', async(req, res) => {
  await axios.get("https://api.typeform.com/forms/t4Wsz3R9/responses", {
    headers: {
      Authorization: `Bearer C8vuMvr9qb3yBL2LaLr8ByGkNwuU382V8NCnr8w6G6UB`,
      crossdomain: true,
      Accept: "application/json",
      "Content-Type": "application/json"
      }
    }
  ).then((resp) => {
    return res.status(res.statusCode)
              .json(resp.data)
  })
  .catch((error) => {
    return res.status(res.statusCode)
              .send({success : false , message: error.message})
  })
})

app.post('/create-qr-code', async(req, res) => {
  // request for create-qr-code
  // await axios.get("https://api.typeform.com/forms/t4Wsz3R9/responses", {
  //   headers: {
  //     Authorization: `Bearer C8vuMvr9qb3yBL2LaLr8ByGkNwuU382V8NCnr8w6G6UB`,
  //     crossdomain: true,
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //     }
  //   }
  // ).then((resp) => {
  //   return res.status(res.statusCode)
  //             .json(resp.data)
  // })
  // .catch((error) => {
  //   return res.status(res.statusCode)
  //             .send({success : false , message: error.message})
  // })
})

app.get('/read-qr-code', async(req, res) => {
  // request for read-qr-code
  // await axios.get("https://api.typeform.com/forms/t4Wsz3R9/responses", {
  //   headers: {
  //     Authorization: `Bearer C8vuMvr9qb3yBL2LaLr8ByGkNwuU382V8NCnr8w6G6UB`,
  //     crossdomain: true,
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //     }
  //   }
  // ).then((resp) => {
  //   return res.status(res.statusCode)
  //             .json(resp.data)
  // })
  // .catch((error) => {
  //   return res.status(res.statusCode)
  //             .send({success : false , message: error.message})
  // })
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
