import React from "react";
const { create } = require("ipfs-http-client");

const client = create();

export async function emmissionsData() {
  const form = {
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
    boundary: {
      systemBoundary: {
        /*life cycle stages accounted for in the PCF and attributable processes in each life cycle stage, incl. disclosure if and hgow life cycle stages are defined differently than in the Pathfinder Framework and/or were excluded*/
      },
      timePeriod: {
        /*time period corresponding to the PCF*/
      },
    },

    dataCollection: {
      primaryDataShare: {
        /*share primary data used (cf. Section Share of primary data5.2.3)*/
      },
      primaryDataSources: {
        /*Primary data sources used (e.g., directly from suppliers or customers across the value chain) and the information which life cycle stages the sources were used for */
      },
      secondaryDataSources: {
        /*secondary data sources used and the information which life cycle stages the sources were used for*/
      },
      timePeriod: {
        /*time period of data collection of both primary and secondary data sources*/
      },
      temporalRepresentativeness: {
        /*Degree the selected data represents the geography of the underlying processes*/
      },
      geographyOfData: {
        /*Country or smaller area within a country*/
      },
      geographicalRepresentativeness: {
        /*degree the selected data represents the geography of the underlying process*/
      },
      technologicalrepresentativeness: {
        /*degree selected data represents the underlying technological/biological processes*/
      },
      dataCollectionMethod: {
        /*data collection methods, data quality, and any efforts to improve data quality, incl. indication of data aggregation used, e.g. per functional unit*/
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
    },
    allocation: {
      standards: {
        /*input from form*/
      },
      recycledMaterialAllocation: {
        /*disclosure of recycled allocation method used*/
      },
    },
    inventoryResults: {
      productPCF: {
        /*CO2 eq/functional unit*/
      },
    },
  };
  const carbonForm = await client.dag.put(form);
}
