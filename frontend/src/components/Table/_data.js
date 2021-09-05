import { Badge } from '@chakra-ui/react'
import * as React from 'react'
import { User } from './User'

const d =  [
  {
  companyName: 'ACME, Inc.',
  contactEmail: 'ac@me.com',
  productName: 'ACME Pollution Barrals',
  uniqueProductCode: '#poll1337',
  functionalUnit: 'C02',
  biogenicCarbonContent: 'chemicals (inorganic)',
  fossilCarbonContent: 'atmosphere melt D1337 aka destruction'
  },
  {
    companyName: 'ACME, Inc.',
    contactEmail: 'ac@me.com',
    productName: 'ACME Pollution Barrals',
    uniqueProductCode: '#poll1337',
    functionalUnit: 'C02',
    biogenicCarbonContent: 'chemicals (inorganic)',
    fossilCarbonContent: 'atmosphere melt D1337 aka destruction'
  },
  {
    companyName: 'ACME, Inc.',
    contactEmail: 'ac@me.com',
    productName: 'ACME Pollution Barrals',
    uniqueProductCode: '#poll1337',
    functionalUnit: 'C02',
    biogenicCarbonContent: 'chemicals (inorganic)',
    fossilCarbonContent: 'atmosphere melt D1337 aka destruction'
  },
  {
    companyName: 'ACME, Inc.',
    contactEmail: 'ac@me.com',
    productName: 'ACME Pollution Barrals',
    uniqueProductCode: '#poll1337',
    functionalUnit: 'C02',
    biogenicCarbonContent: 'chemicals (inorganic)',
    fossilCarbonContent: 'atmosphere melt D1337 aka destruction'
  },
  {
    companyName: 'ACME, Inc.',
    contactEmail: 'ac@me.com',
    productName: 'ACME Pollution Barrals',
    uniqueProductCode: '#poll1337',
    functionalUnit: 'C02',
    biogenicCarbonContent: 'chemicals (inorganic)',
    fossilCarbonContent: 'atmosphere melt D1337 aka destruction'
  }
]


export const data = [
  {
    role: 'Admin',
    status: 'active',
    earned: '$45,000',
    id: 'blog',
  },
  {
    role: 'Marketing Director',
    status: 'reviewing',
    earned: '$4,840',
    id: 'home',
  },
  {
    role: 'Front Desk Officer',
    status: 'declined',
    id: 'design-system',
    earned: '$89,054',
  },
  {
    role: 'Lead Software Engineer',
    status: 'active',
    earned: '$19,954',
    id: 'home-2',
  },
]
const badgeEnum = {
  active: 'green',
  reviewing: 'orange',
  declined: 'red',
}
export const columns = [
  {
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: function StatusCell(data) {
      return (
        <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
          {data}
        </Badge>
      )
    },
  },
  {
    Header: 'Amount Earned',
    accessor: 'earned',
  },
]
