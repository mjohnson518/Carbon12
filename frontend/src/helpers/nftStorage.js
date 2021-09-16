import { uniqBy } from "lodash";

const NFT_STORAGE_KEYS = [
  'tokenId',
  'transaction',
  'id',
  'to',
  'address',
  'metadataUri'
]

export function getNFTData(isConnected = true) {
  if (isConnected) {
    return JSON.parse(localStorage.getItem('nftData')) || [];
  } else {
    localStorage.setItem('nftData', JSON.stringify([]));
    return [];
  }
}

export function storeNftData(nftData, isConnected = true) {
  let resolvedData;
  const currentData = getNFTData();

  if (!nftData.tokenId) {
    nftData.tokenId = null;
    nftData.owner = null;
  }

  currentData.push(nftData)

  if (nftData.tokenId) {
    resolvedData = uniqBy(
      currentData.filter((nft) => nft.tokenId && nft.id),
      (data) => data.id
    )
  } else {
    resolvedData = currentData.filter((nft) => nft.id);
  }

  localStorage.setItem('nftData', JSON.stringify(resolvedData));
}
