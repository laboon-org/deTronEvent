var bigDecimal = require("js-big-decimal");

module.exports = {
  async getTicket(contract, tokenId) {
    try {
      let metaData = await contract.getTicket(tokenId).call();
      return {
        tokenId: bigDecimal.subtract(metaData[0], 0),
        eventId: metaData[1],
        eventType: metaData[2],
        owner: metaData[3],
        pathData: metaData[4],
        isUsed: metaData[5],
      };
    } catch (error) {
      console.log(error);
    }
  },
  async mintTickets(contract, to, eventId) {
    try {
      for await (const tokenId of [1, 2, 3, 4, 5]) {
        let resultMint = await contract
          .mint(to, eventId, 1, `/hello${tokenId}.json`)
          .send({
            feeLimit: 800000000,
          });
        console.log("balance: ", resultMint);
        /// Get data token by id
        // [tokenId, eventId, eventType, owner, pathData, isUsed]
        let metaData = await contract.getTicket(tokenId).call();
        console.log("balance: ", metaData);

        let totalSupply = await contract.totalSupply().call();
        console.log("totalSupply: ", tronWebOwner.toDecimal(totalSupply));
      }
    } catch (error) {
      console.error("trigger smart contract error", error);
    }
  },
  async addAdmin(contract, admin, eventId) {
    try {
      // add admin to contract
      await contract.addAdmin(admin).send({
        feeLimit: 800000000,
      });
      // set admin is admin of event
      await contract.setAdminEvent(admin, eventId, true).send({
        feeLimit: 800000000,
      });
    } catch (error) {
      console.error("trigger smart contract error", error);
    }
  },

  async mintTicket(contract, to, eventId) {
    try {
      await contract.mint(to, eventId, 1, `/hello.json`).send({
        feeLimit: 800000000,
      });
    } catch (error) {
      console.error("trigger smart contract error", error);
    }
  },

  async approveTicket(contract, to, tokenId) {
    try {
      await contract.approve(to, tokenId).send({
        feeLimit: 800000000,
      });
      const approve = await contract.getApproved(tokenId).call()
      console.log('===> Approve:', approve)
    } catch (error) {
      console.error("[Error] approveTicket: ", error);
    }
  },
  async approveAllTicket(contract, to) {
    try {
      await contract.setApprovalForAll(to, true).send({
        feeLimit: 800000000,
      });
    } catch (error) {
      console.error("[Error] approveTicket: ", error);
    }
  },
  async transferTicket(contract, to, tokenId) {
    try {
      let metaData = await this.getTicket(contract, tokenId);
      console.log("======> Befor Transfer: ", metaData);
      let resultTransfer = await contract.transfer(to, tokenId).send({
        feeLimit: 800000000,
      });
      console.log({ resultTransfer });
      metaData = await this.getTicket(contract, tokenId);
      console.log("======> After Transfer: ", metaData);
    } catch (error) {
      console.error("trigger smart contract error", error);
    }
  },
};
