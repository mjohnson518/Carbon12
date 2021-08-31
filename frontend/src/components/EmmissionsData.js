import React from "react";
const { create } = require("ipfs-http-client");

const client = create();

async () => {
  const general = {
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
      /*input from form*/
    },
    BiogenicCarbonContent: {
      /*input from form*/
    },
    fossilCarbonContent: {
      /*input from form*/
    },
    standards: {
      /*input from form*/
    },
    ghgsInventory: {
      /*input from form*/
    },
    GlobalWarmingFactors: {
      /*input from form*/
    },
  };
  const generalCID = await client.dag.put(general);

  const boundary = {
    systemBoundary: {
      /*input from form*/
    },
    timePeriod: {
      /*input from form*/
    },
  };

  const boundaryCID = await client.dag.put(boundary);

  const dataCollection = {
    primaryDataShare: {
      /*input from form*/
    },
    primaryDataSources: {
      /*input from form*/
    },
    secondaryDataSources: {
      /*input from form*/
    },
    timePeriod: {
      /*input from form*/
    },
    temporalRepresentativeness: {
      /*input from form*/
    },
    geographyOfData: {
      /*input from form*/
    },
    geographicalRepresentativeness: {
      /*input from form*/
    },
    technologicalrepresentativeness: {
      /*input from form*/
    },
    dataCollectionMethod: {
      /*input from form*/
    },
    dataAggregationMethod: {
      /*input from form*/
    },
    dataQuality: {
      /*input from form*/
    },
    massBalances: {
      /*bool*/
    },
    exemptions: {
      /*explanation of decesisions to use cut-off rules for waste treatment and omit life cycle stages, unit processes or data*/
    },
    uncertaintyAssessment: {
      /*resulst of any uncertainty assessment*/
    },
  };
  const dataCollectionCID = await client.dag.put(dataCollection);
  const allocation = {
    standards: {
      /*input from form*/
    },
    recycledMaterialAllocation: {
      /*disclosure of recycled allocation method used*/
    },
  };

  const allocationCID = await client.dag.put(allocation);

  const inventoryResults = {
    productPCF: {
      /*CO2 eq/functional unit*/
    },
  };
  const inventoryResultsCID = await client.dag.put(inventoryResults);
};
