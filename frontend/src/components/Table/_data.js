import { Badge } from '@chakra-ui/react'
import * as React from 'react'

const badgeEnum = {
  active: 'green',
  reviewing: 'orange',
  declined: 'red',
}

export const columns = [
  {
    accessor: "companyName",
    Header: "Company Name",
  },
  {
    accessor: "productName",
    Header: "Product Name",
  },

  {
    accessor: "systemBoundary",
    Header: "System Boundary",
  },
  {
    accessor: "timePeriod",
    Header: "Time Period",
  },
  {
    accessor: "primaryDataShare",
    Header: "Primary Data Share",
  },
  {
    accessor: "dataCollectionMethod",
    Header: "Data Collection Method",
  },
  {
    accessor: "standards",
    Header: "Standards",
  },
  {
    accessor: "productPCF",
    Header: "Product PCF",
  },
  {
    accessor: "status",
    Header: "Status",
    Cell: function StatusCell(data) {
      return (
        <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
          {data}
        </Badge>
      )
    },
  },
]
