import { create } from "ipfs-http-client";
import { fromString } from "uint8arrays/from-string";

const id = "2CYTFYLUywX5yGeeIW3vuTGovWt";
const sercet = "fb6a1931dffcf3e35a2f361c888b5fca";
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
  let v1CID = await added.cid.toV1()
  console.log(added.path)
  return {
    path: added.path,
    CID:added.cid.toV1(),
    link: `https://nts-v3-test.infura-ipfs.io/ipfs/${v1CID}`
  }
};

module.exports = uploadImageToIPFS;
export {};
