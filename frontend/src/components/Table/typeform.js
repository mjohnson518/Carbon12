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

export function parseAnswers(answers) {
  return answers.reduce(
    (obj, answer) => {
      obj[answer.field.ref] = handleTypeFormField(answer)

      return obj;
    },
    {}
  );
}

export function handleTypeFormField(item) {
  const attributeKey = Object.keys(item).find(key =>
    POTENTIAL_KEYS.includes(key)
  );

  return item[attributeKey] || 'N/A';
}

export function getFormData() {
  return JSON.parse(localStorage.getItem('typeFormData')) || [];
}

export function fetchFormData(toast) {
  const cancelTokenSource = axios.CancelToken.source();

  return axios.get("/typeform", { cancelToken: cancelTokenSource.token })
    .then((response) => {
      const storage = response.data && response.data.items ? Array.from(response.data.items) : [];
      localStorage.setItem("typeFormData", JSON.stringify(storage));

      toast({
        title: `sync returned ${storage.length} questionaires`,
        status: 'success',
        isClosable: true,
      })

      cancelTokenSource.cancel();

      return getFormData();
    })
    .catch((error) => {
      toast({
        title: `re-syncing errored: ${error.message}`,
        status: 'error',
        isClosable: true,
      })

      localStorage.setItem("typeFormData", JSON.stringify([]));

      cancelTokenSource.cancel();

      return getFormData();
    })
}
