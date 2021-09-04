export const PROJECT_NAME = "Carbon 12";

// Chains
export const ChainId = {
  Mainnet: 1,
  Rinkeby: 4,
  xDai: 100,
  Polygon: 137,
  Localhost: 1337,
  Hardhat: 31337,
}

export const CHAIN_NAMES = {
  [ChainId.Mainnet]: 'Mainnet',
  [ChainId.Rinkeby]: 'Rinkeby',
  [ChainId.Localhost]: 'Localhost',
  [ChainId.Hardhat]: 'Hardhat',
  [ChainId.XDai]: 'xDai',
  [ChainId.Polygon]: 'Polygon',
}

export const LOCAL_CHAINS = [ChainId.Localhost, ChainId.Hardhat]
