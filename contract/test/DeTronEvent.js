const TronWeb = require("tronweb");

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");

const addressOwner = "TVPiM8dKbouzbAoYq6bKkDrRGxaossQz3g";
const addressAdmin = "TFnxYqud7EuV5kKMjatfHzddU61bjD6WFJ";
const addressBuy = "TDV3QwLEUY69YiYAYXLGpY2z4UsEtTh3MP";

const privateKeyOwner =
  "c84112f953e79e66a399b4c7e241321d18b3d096cb3044f52296b87598f422fd";
const privateKeyAdmin =
  "a9a3b486f0b44a50965adea7c79cb5efac7e1ea948913584382ff566cb74f748";
const privateKeyBuy =
  "7505836ca8061df5f491c9e3982416533652a7dfc5a29cac5fad7b0597767922";

const tronWebOwner = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  privateKeyAdmin
);

const tronWebAdmin = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  privateKeyOwner
);

const tronWebBuy = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  privateKeyBuy
);
const ticketContractAddress = "TLuRSn3x8M7BgSxT8sTgCMmgGph5s1Umru"; //contract address
const deTronEventContractAddress = "TAXsSoKYaCDhUahuUodJjEhXwEhQyFeGyK"; //contract address

const Ticket = require("./Ticket");

async function getContractTicket(accountTronweb) {
  return await accountTronweb.contract().at(ticketContractAddress);
}

async function getContractDeTronEvent(accountTronweb) {
  return await accountTronweb.contract().at(deTronEventContractAddress);
}

module.exports = {
  async listingTicket(contract, nftContract, tokenId) {
    try {
      let ticketContractOwner = await getContractTicket(tronWebOwner);
      await Ticket.approveTicket(ticketContractOwner, deTronEventContractAddress, tokenId);
      await contract.listingTicket( ticketContractAddress, tokenId, 10).send({
        feeLimit: 800000000
      });
      await this.getTicketItem(contract, tokenId)
    } catch (error) {
      console.error("[Error] listingTicket:", error);
    }
  },
  async listingTickets(contract, nftContract, tokenIds) {
    try {
      let ticketContractOwner = await getContractTicket(tronWebOwner);
      await Ticket.approveAllTicket(ticketContractOwner, deTronEventContractAddress);
      await contract.listingTickets( ticketContractAddress, tokenIds, 10).send({
        feeLimit: 800000000
      });
    } catch (error) {
      console.error("[Error] listingTicket:", error);
    }
  },
  async buyTicket(contract, tokenId) {
    try {
      await contract.buyTicket(tokenId).send({
        feeLimit: 800000000,
        callValue: 10,
      });
    } catch (error) {
      console.error("[Error] buyTicket:", error);
    }
  },
  async publicToSellTicket(contract, tokenId) {
    try {
      await contract.publicToSellTicket(tokenId).send({
        feeLimit: 800000000,
      });
      await this.getTicketItem(contract, tokenId)
    } catch (error) {
      console.error("[Error] publicToSellTicket:", error);
    }
  },
  async getTicketItem(contract, tokenId) {
    try {
      const ticketItem = await contract.getTicketItem(tokenId).call();
      console.log("====> Ticket Item:", ticketItem);
    } catch (error) {
      console.error("trigger smart contract error", error);
    }
  },
  async getListTicketItems(contract, limit, offset) {
    try {
      const listTicketItem = await contract.getListTicketItems(limit, offset).call();
      console.log("====> listTicketItem:", listTicketItem);
    } catch (error) {
      console.error("trigger smart contract error", error);
    }
  },
}



