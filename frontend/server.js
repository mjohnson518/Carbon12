require('dotenv').config();
const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const axios = require('axios').default;
const { create } = require('ipfs-http-client');
const CID = require('cids');
const path = require('path');
const { response } = require('express');
const { reject } = require('lodash');
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const options = {};

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

const IPFS_CLIENT = create();

function pinJSONToIPFS(pinataApiKey, pinataSecretApiKey, JSONBody) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => reject(err));
  });
}

app.get('/typeform', async (req, res) => {
  await axios
    .get('https://api.typeform.com/forms/t4Wsz3R9/responses', {
      headers: {
        Authorization: `Bearer C8vuMvr9qb3yBL2LaLr8ByGkNwuU382V8NCnr8w6G6UB`,
        crossdomain: true,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(resp => {
      return res.status(res.statusCode).json(resp.data);
    })
    .catch(error => {
      return res
        .status(res.statusCode)
        .json({ success: false, message: error.message });
    });
});

app.post('/upload-to-ipfs', async (req, res) => {
  // request for create-qr-code
  const content = req.body;

  const ipfsData = {
    path: '/',
    content: content,
    mode: 'string',
    mtime: Date.now(),
  };
  const response = await pinJSONToIPFS(
    process.env.PINATA_API_Key,
    process.env.PINATA_API_Secret,
    ipfsData
  );

  const cid = new CID(response.IpfsHash).toV1().toString('base32');

  console.log('Ipfs cid', cid);

  const qrCodeAddress = `https://api.qrserver.com/v1/create-qr-code/?data=https://ipfs.io/ipfs/${cid}&size=100x100`;

  res.json({ cid, qrCodeAddress });

  // manipulate data post questionaire upload to ipfs

  // store questionaire in localstorage
});

app.get('/read-qr-code', async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
