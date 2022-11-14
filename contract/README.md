# Contract

## 1. Compiler

```bash
$ npx hardhat compile
```

## 2. Run test

```bash
$ npx hardhat test
```

## 3. Deploy

```bash
$ npx hardhat run scripts/deploy.js --network goerli
$ npx hardhat run scripts/deploy_upgrade.js --network goerli
```

- 1. Owner deploy contract and mint NFT tickets
- 2. Owner listing NFT tickets on market for sell
- 3. User 1 buy NFT tickets on market
