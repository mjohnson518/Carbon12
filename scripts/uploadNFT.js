const { create } = require("ipfs-http-client");

const ipfs = create("https://ipfs.infura.io:5001");

async function run() {
  const files = [
    {
      path: "/",
      content: JSON.stringify({
        name: "CarbonTracker",
        attributes: [
          {
            general: {
              companyName: {
                /*input from form*/
              },
              contactInformation: {
                /*input from form*/
              },
              productName: {
                /*input from form*/
              },
              uniqueProductCode: {
                /*input from form*/
              },
              productDescription: {
                /*input from form*/
              },
              functionalUnit: {
                /*unit of analysis*/
              },
              biogenicCarbonContent: {
                /*biogenic carbon content per FU*/
              },
              fossilCarbonContent: {
                /*fossil carbon content per FU*/
              },
              standards: {
                /*standard(s) (ISO,GHGP, PAS 2050, PCR, etc.) used for the PCF calculation including the info for which life cycle states the standards are used*/
              },
              ghgsInventory: {
                /*GHGs included in this PCF, incl. disclosure and justification if any of the required gases (per the GHG Protocol Product standard) are not included*/
              },
              globalWarmingFactors: {
                /*global warming potential factors derived from IPCC Assessment Report "AR 5"*/
              },
            },
          },
        ],
        // if you want to upload your own IPFS image, you can do so here:
        // https://github.com/ChainShot/IPFS-Upload
        image: "https://gateway.ipfs.io/ipfs/${QRCodeAddress}",
        description: "carbon tracker NFT from frontend",
      }),
    },
  ];

  const result = await ipfs.add(files);
  console.log(result);
}

run();
