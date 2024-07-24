# `exsat EVM` Faucet

## Quickstart

```
$ npm install
$ npm run dev
```

## Features

- [x] Faucet logo design
- [x] User input address
  - [x] Regex validation
  - [x] exsat native address
  - [x] EVM address
- [x] Send BTC transfers (via internal API)
  - [x] EVM (via bridge `evm.xsat`)
  - [x] exsat native
  - [x] Success Notification
- [x] History of last 10 faucet transactions
- [x] Rate limit based on cookies (1 request per second)
- [ ] Detect EVM wallet:
  - [ ] Metamask
  - [ ] Coinbase Wallet
- [x] Save address to localStorage
- [x] Mobile optimization
- [x] Edge runtime
