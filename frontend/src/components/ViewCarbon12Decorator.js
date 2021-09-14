import React from "react";

export const KEY_TRANSLATIONS = {
  companyName: 'Company Name',
  contactInformation: 'Contact Information',
  contactEmail: 'Contact Email',
  productName: 'Product Name',
  uniqueProductCode: 'Unique ProductCode',
  productDescription: 'Product Description',
  functionalUnit: 'Functiona lUnit',
  biogenicCarbonContent: 'Biogenic CarbonContent',
  fossilCarbonContent: 'Fossil Carbon Content',
  standards: 'Standards',
  ghgsInventory: 'Ghgs Inventory',
  globalWarmingFactors: 'Global Warming Factors',
  systemBoundary: 'System Boundary',
  timePeriod: 'Time Period',
  primaryDataShare: 'Primary DataShare',
  primaryDataSources: 'Primary Data Sources',
  secondaryDataSources: 'Secondary Data Sources',
  timePeriod1: 'Time Period',
  temporalRepresentativeness: 'Temporal Representativeness',
  geographyOfData: 'Geography Of Data',
  geographicalRepresentativeness: 'Geographical Representativeness',
  technologicalrepresentativeness: 'Technological Representativeness',
  dataCollectionMethod: 'Data Collection Method',
  massBalances: 'Mass Balances',
  exemptions: 'Exemptions',
  uncertaintyAssessment: 'Uncertainty Assessment',
  standards1: 'Standards',
  recycledMaterialAllocation: 'Recycled MaterialAllocation',
  productPCF: 'product PCF'
}

const GENERAL_FIELDS = [
  'companyName',
  'contactInformation',
  'contactEmail',
  'productName',
  'productPCF',
  'uniqueProductCode',
  'productDescription',
  'functionalUnit',
  'biogenicCarbonContent',
  'fossilCarbonContent',
  'standards',
  'ghgsInventory',
  'globalWarmingFactors'
]

const BOUNDARY_FIELDS = [
  'systemBoundary',
  'timePeriod',
]

const DATA_COLLECTION_FIELDS = [
  'primaryDataShare',
  'primaryDataSources',
  'secondaryDataSources',
  'timePeriod',
  'temporalRepresentativeness',
  'geographyOfData',
  'geographicalRepresentativeness',
  'technologicalrepresentativeness',
  'dataCollectionMethod',
  'massBalances',
  'exemptions',
  'uncertaintyAssessment',
]

const ALLOCATION_FIELDS = [
  'standards',
  'recycledMaterialAllocation',
]

export function viewCarbon12Decorator(formAnswers) {
  const generalFields = {};
  const boundaryFields = {};
  const dataCollectionFields = {};
  const allocationFields = {};

  for (const [key, value] of Object.entries(formAnswers)) {
    if (!key || !value) { return }

    GENERAL_FIELDS.includes(key) ? (generalFields[key] = value) :
      BOUNDARY_FIELDS.includes(key) ? (boundaryFields[key] = value) :
      DATA_COLLECTION_FIELDS.includes(key) ? (dataCollectionFields[key] = value) :
      ALLOCATION_FIELDS.includes(key) && (allocationFields[key] = value)
  }

  return {
    generalFields,
    boundaryFields,
    dataCollectionFields,
    allocationFields,
    formAnswers
  }
}
