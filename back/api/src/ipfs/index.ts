import { create } from "ipfs-http-client";
import { fromString } from "uint8arrays/from-string";

const id = "2BSmoijBj3BUXvPXtSNHnnK1b8m";
const sercet = "e5cd332f98d4610eddfbee898c0b8b8b";
const INFURA_TOKEN = Buffer.from(`${id}:${sercet}`).toString("base64");

export const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: "Basic " + INFURA_TOKEN,
  },
});
const uploadImageToIPFS = async (file:any) => {
  const added = await ipfs.add(file, {
    progress: (prog) => console.log(`received: ${prog}`),
  });
  let v1CID = added.cid.toV1()
  return {
    image_link: `https://gateway.ipfs.io/ipfs/${v1CID}`
  }
};

module.exports = uploadImageToIPFS;
export {};
