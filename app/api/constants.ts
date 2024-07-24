export const ACTOR = process.env.ACTOR ?? 'faucet.xsat';
export const ACCOUNT = process.env.ACCOUNT ?? ACTOR;
export const EVM = 'evm.xsat';
export const FAUCET = 'faucet.xsat';
export const PERMISSION = process.env.PERMISSION ?? 'active';
export const BROADCAST = Boolean(process.env.BROADCAST ?? 'true');

export const CHAINS = {
    testnet3: {
        id: '20d14b6e421fe21ef1f39061e70f214d5d908b979f379a4feea04294944ddd92',
        url: 'https://chain-tst3.exactsat.io',
        explorer: 'https://scan.exactsat.io/',
    },
}
export const CHAIN_DEFAULT = "testnet3";
export const CHAIN_ID = CHAINS[CHAIN_DEFAULT].id;
export const CHAIN_URL = CHAINS[CHAIN_DEFAULT].url;