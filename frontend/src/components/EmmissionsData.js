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
      /*unit of analysis*/
    },
    BiogenicCarbonContent: {
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
    GlobalWarmingFactors: {
      /*global warming potential factors derived from IPCC Assessment Report "AR 5"*/
    },
  };
  const generalCID = await client.dag.put(general);

  const boundary = {
    systemBoundary: {
      /*life cycle stages accounted for in the PCF and attributable processes in each life cycle stage, incl. disclosure if and hgow life cycle stages are defined differently than in the Pathfinder Framework and/or were excluded*/
    },
    timePeriod: {
      /*time period corresponding to the PCF*/
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
