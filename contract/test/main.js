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
const DeTronEvent = require('./DeTronEvent')
///////////////////////////////////////////// Ticket Contract ////////////////////////////////////////////

async function getContractTicket(accountTronweb) {
  return await accountTronweb.contract().at(ticketContractAddress);
}

async function getContractDeTronEvent(accountTronweb) {
  return await accountTronweb.contract().at(deTronEventContractAddress);
}


async function ticketContract() {
  try {
    let ticketContractOwner = await getContractTicket(tronWebOwner);
    let ticketContractAdmin = await getContractTicket(tronWebAdmin);

    //// Get name Event Ticket
    let ticketName = await ticketContractOwner.name().call();
    console.log("ticketName: ", ticketName);

    /// Get base URI
    let ticketUri = await ticketContractOwner.uri().call();
    console.log("ticketUri: ", ticketUri);

    // Owner Mint token
    await Ticket.mintTicket(ticketContractOwner, addressOwner, 1);

    // add admin to list
    await Ticket.addAdmin(ticketContractOwner, addressAdmin, 1);

    // admin mint token
    await Ticket.mintTicket(ticketContractAdmin, addressAdmin, 1);

    // transfer ticket
    await Ticket.transferTicket(ticketContractAdmin, addressBuy, 1);

  } catch (error) {
    console.error("trigger smart contract error", error);
  }
}

// ticketContract();


/////////////////////////////////////// De Tron Event //////////////////////////////////


async function deTronEventContract() {
  try {
    let deTronEventContractOwner = await getContractDeTronEvent(tronWebOwner);
    let deTronEventContractAdmin = await getContractDeTronEvent(tronWebAdmin);

    const tokenId = 9;
    // Listing a ticket to marketplace
    await DeTronEvent.listingTickets(deTronEventContractOwner, ticketContractAddress, [4,5,6]);

    // // // Buy a ticket
    // await DeTronEvent.buyTicket(deTronEventContractAdmin, tokenId);

    // get Item ticket
    await DeTronEvent.getTicketItem(deTronEventContractOwner, 4);

  } catch (error) {
    console.error("[Error] deTronEventContract:", error);
  }
}

deTronEventContract();

