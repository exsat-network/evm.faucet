# `exSat EVM` Faucet

## Quickstart

```
$ npm install --save-exact react@rc react-dom@rc
$ npm install
$ npm run dev


or
yarn build
pm2 start yarn --name "evm_faucet" --interpreter bash -- start 
```

## Features

- [x] Faucet logo design
- [x] User input address
  - [x] Regex validation
  - [x] exSat native address
  - [x] EVM address
- [x] Send BTC transfers (via internal API)
  - [x] EVM (via bridge `evm.xsat`)
  - [x] exSat native
  - [x] Success Notification
- [x] History of last 10 faucet transactions
- [x] Rate limit based on cookies (1 request per second)
- [ ] Detect EVM wallet:
  - [ ] Metamask
  - [ ] Coinbase Wallet
- [x] Save address to localStorage
- [x] Mobile optimization
- [x] Edge runtime
