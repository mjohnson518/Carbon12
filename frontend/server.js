require('dotenv').config();
const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const axios = require('axios').default;
const { create } = require('ipfs-http-client')

const PORT = 3001;
const app = express();

app.use(cors());

const options = {};

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

const IPFS_CLIENT = create();

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
  debugger
  const path = req.query.path;
  const content = req.query.content;
  const mode = req.query.mode;
  const mtime = req.query.mtime;

  const ipfsData = {
    path,
    content,
    mode,
    mtime,
  }

  console.log('server ping');
  async function uploadToIPFS(questionaire) {

    await IPFS_CLIENT
      .add(ipfsData) // @ts-ignore
      .then(resp => {
        return res.status(res.statusCode).json(resp.data);
      })
      .catch(err => {
        return res
          .status(res.statusCode)
          .json({ success: false, message: error.message });
      });

    // manipulate data post questionaire upload to ipfs

    // store questionaire in localstorage
  }
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
