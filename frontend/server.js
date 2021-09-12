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

function pinFiletoIPFS(file, ipfsUri) {
  console.log('PINFILE PING');
  //pinata api url
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //create data to send
  const data = new FormData();
  //add image to data and create datastream
  data.append('qrCode', file);
  //create metadata
  const metadata = JSON.stringify({
    name: 'nftQrCode',
    ipfsUri: ipfsUri,
  });
  //add metatdata to fil
  data.append('pinataMetadata', metadata);
  //make axios call
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        maxBodyLength: 'Infinity',
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}
function saveImagetoDisk(url, path) {
  try {
    const localPath = fs.createWriteStream(path);
    const request = https.get(url, function (response) {
      response.pipe(localPath);
    });
  } catch (err) {
    console.error(err);
  }
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

app.post('/upload-img-to-ipfs', async (req, res) => {
  // request for create-qr-code
  const content = req.body.imgUrl;
  const uri = req.body.ipfsUri;
  const path = './src/components/qrcodes/' + uri.slice(-20) + '.png';
  saveImagetoDisk(content, path);
  //pin img to IPFS through pinata
  const response = await pinFiletoIPFS(path, req.body.ipfsUri);
  // convert hash to cid
  const cid = new CID(response.IpfsHash).toV1().toString('base32');
  //create ipfs link
  const ipfsImgLink = `https://ipfs.io/ipfs/${cid}`;
  //send response to frontend
  res.json({ cid, ipfsImgLink });
});

app.post('/upload-to-ipfs', async (req, res) => {
  console.log('JSON PING');
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
