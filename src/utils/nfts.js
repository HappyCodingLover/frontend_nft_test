import { ethers } from "ethers";
import axios from "axios";
import { contractAddress, ipfsGateWay, limit } from "../constants";
import contractAbi from "../abi/collection.json";

export const getTotalSupply = async () => {
  try {
    const provider = new ethers.providers.InfuraProvider(
      "mainnet",
      process.env.REACT_APP_ETHEREUM_API_KEY
    );
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );
    let totalSupply = await contract.totalSupply();
    totalSupply = parseInt(totalSupply._hex, 16);
    return { success: true, data: totalSupply };
  } catch (e) {
    console.log("error in getting totalsupply", e);
    return { success: false, data: 0 };
  }
};

export const getCollectionName = async () => {
  try {
    const provider = new ethers.providers.InfuraProvider(
      "mainnet",
      process.env.REACT_APP_ETHEREUM_API_KEY
    );
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );
    const name = await contract.name();
    return { success: true, data: name };
  } catch (e) {
    console.log("error in getting collection name", e);
    return { success: false, data: "" };
  }
};

export const getNfts = async (totalSupply, pageNumber = 0) => {
  try {
    let offset = pageNumber * limit;
    let nfts = [];
    const provider = new ethers.providers.InfuraProvider(
      "mainnet",
      process.env.REACT_APP_ETHEREUM_API_KEY
    );

    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );

    if (offset >= totalSupply) {
      return { success: true, data: [], msg: "there is no the nfts" };
    } else {
      const forLoop = async (_) => {
        for (let i = offset; i < offset + limit; i++) {
          try {
            const ownerAddress = await contract.ownerOf(i);
            let tokenUri = await contract.tokenURI(i);
            tokenUri = tokenUri.replace("ipfs://", ipfsGateWay);
            const metaDataRes = await axios.get(tokenUri);
            nfts.push({
              tokenId: i,
              ownerAddress,
              metaData: metaDataRes.data,
            });
          } catch (e) {
            console.log("error in getting metadata", e);
          }
        }
      };
      await forLoop();
    }
    return { success: true, data: nfts, msg: "loaded successfully" };
  } catch (e) {
    console.log("error in getting all nfts from collection", e);
    return {
      success: false,
      data: [],
      msg: "error in getting all nfts from collection",
    };
  }
};
