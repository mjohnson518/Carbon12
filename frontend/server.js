require('dotenv').config();
const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const axios = require('axios').default;
const CID = require('cids');
const PORT = 3001;
const app = express();
const FormData = require('form-data');
const fs = require('fs');
const { response } = require('express');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const options = {};

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

function pinJSONToIPFS(JSONBody) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
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
  try {
    const content = req.body;
    // TODO change the path to something more sane for multitenancy -- /portfolios/{companyName or id}
    const ipfsData = {
      path: '/',
      content: content,
      mode: 'string',
      mtime: Date.now(),
    };
    const response = await pinJSONToIPFS(ipfsData);

    const cid = new CID(response.IpfsHash).toV1().toString('base32');

    const ipfsJsonLink = `https://ipfs.io/ipfs/${cid}`;

    res.json({ cid, ipfsJsonLink });
  } catch (err) {
    console.error(err);
  }
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
