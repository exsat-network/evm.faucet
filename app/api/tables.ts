import { ACCOUNT, CHAIN_DEFAULT, FAUCET } from "./constants";
import { rpcs } from "./rpc";

export async function get_history(limit = 8) {
    const rpc = rpcs(CHAIN_DEFAULT);
    return rpc.v1.chain.get_table_rows({
        code: ACCOUNT,
        scope: ACCOUNT,
        table: "history",
        json: true,
        limit,
        reverse: true,
    })
}
const SENDER_ADDRESS = "0xBBbBbbbbbBbbbbBBBBbbbBbb56e40ee0D9000000";


export const get_history_blockscout = async (limit: number = 8, walletAddress) => {
  const response = await fetch(
    `https://scan.exsat.network/api/v2/addresses/${walletAddress}/transactions?filter=to&type=coin`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }
  const data = await response.json();
  const filteredItems = data.items
    .filter(
      (item) => item.from.hash.toLowerCase() === SENDER_ADDRESS.toLowerCase()
    )
    .slice(0, 8);

  return { items: filteredItems };
};

export async function get_stats(limit = 2) {
    const rpc = rpcs(CHAIN_DEFAULT);
    return rpc.v1.chain.get_table_rows({
        code: FAUCET,
        scope: FAUCET,
        table: "stats",
        json: true,
        limit,
        reverse: true,
    })
}

export async function get_balance(address: string, chain: string) {
    if ( address.length <= 12 ) return get_balance_btc(address, chain);
    return get_balance_evm(address);
}

export async function get_balance_btc(address: string, chain: string) {
    const rpc = rpcs(chain);
    const response = await rpc.v1.chain.get_currency_balance("btc.xsat", address, "BTC");
    if ( !response.length ) return 0.0
    return response[0].value;
}

export async function get_balance_evm(address: any) {
    const rpc = rpcs(CHAIN_DEFAULT);
    address = address.replace("0x", "");
    const response = await rpc.v1.chain.get_table_rows({
        code: "evm.xsat",
        scope: "evm.xsat",
        table: "account",
        index_position: "secondary",
        lower_bound: address,
        upper_bound: address,
        json: true,
        limit: 1,
        key_type: "sha256",
    })
    if (response.rows.length === 0) return 0.0
    return parseInt(response.rows[0].balance, 16) / 10 ** 18;
}
