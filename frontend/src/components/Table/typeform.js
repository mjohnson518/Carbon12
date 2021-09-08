import { Badge } from '@chakra-ui/react';
import axios from 'axios';

import * as React from 'react';

const POTENTIAL_KEYS = [
  'text',
  'choice',
  'choices',
  'email',
  'url',
  'file_url',
  'boolean',
  'number',
  'date',
  'payment',
];

const badgeEnum = {
  active: 'green',
  reviewing: 'orange',
  declined: 'red',
};

// {
//   accessor: "primaryDataShare",
//   Header: "Primary Data Share",
// },
// {
//   accessor: "dataCollectionMethod",
//   Header: "Data Collection Method",
// },
// {
//   accessor: "productPCF",
//   Header: "Product PCF",
// },

export const columns = [
  {
    accessor: 'companyName',
    Header: 'Company Name',
  },
  {
    accessor: 'productName',
    Header: 'Product Name',
  },

  {
    accessor: 'systemBoundary',
    Header: 'System Boundary',
  },
  {
    accessor: 'timePeriod',
    Header: 'Time Period',
  },
  {
    accessor: 'standards',
    Header: 'Standards',
  },
  {
    accessor: 'status',
    Header: 'Status',
    Cell: function StatusCell(data) {
      return (
        <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
          {data}
        </Badge>
      );
    },
  },
];

export function getFormByID(storageArrayPosition) {
  const localArray = JSON.parse(localStorage.getItem('typeFormData')) || [];
  return localArray[storageArrayPosition];
}

export function handleTypeFormField(item) {
  const attributeKey = Object.keys(item).find(key =>
    POTENTIAL_KEYS.includes(key)
  );

  return item[attributeKey] || 'N/A';
}

export function parseAnswers(answers) {
  return answers.reduce((obj, answer) => {
    obj[answer.field.ref] = handleTypeFormField(answer);

    return obj;
  }, {});
}

export function getFormData() {
  return JSON.parse(localStorage.getItem('typeFormData')) || [];
}

export function fetchFormData() {
  return axios
    .get('https://api.typeform.com/forms/t4Wsz3R9/responses', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM_PERSONAL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      const storage =
        response.data && response.data.items
          ? Array.from(response.data.items)
          : [];
      localStorage.setItem('typeFormData', JSON.stringify(storage));
      return response;
    })
    .catch(error => {
      return error;
    })
    .then(response => {
      return response;
    });
}
