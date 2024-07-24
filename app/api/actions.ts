import { AnyAction } from "@wharfkit/session"
import { ACCOUNT ,FAUCET} from "./constants"
import { authorization } from "./config"

export const send = (to: string): AnyAction => {
    return {
        authorization,
        account: ACCOUNT,
        name: "send",
        data: {
            to,
        },
    }
}
export const sendBtc = (to: string): AnyAction => {
    // @ts-ignore
    return {
      account: "btc.xsat",
      name: "transfer",
      authorization,
      data: {
        from: FAUCET,
        to: "evm.xsat",
        quantity: "1.00000000 BTC",
        memo: to,
      },
    }
}

export const nonce = (): AnyAction => {
    return {
        authorization,
        account: ACCOUNT,
        name: "nonce",
        data: {
            nonce: Math.floor(Math.random() * 1000000000),
        }
    }
}
