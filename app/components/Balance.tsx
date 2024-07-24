"use client";

import useSWR from "swr";
import { Box } from "@chakra-ui/react"
import { get_balance } from "../api/tables";
import Link from "next/link";

const chain = "testnet3";

export const Balance = (props: {address: string}) => {
    // const chain = useRecoilValue(chainState);
    const address = props.address
    const { data } = useSWR(`/api/balance/${chain}/${address}`, () => get_balance(address, chain));
    let url = `https://scan.exsat.network/address/${address}/tokens`
    if ( address.length <= 12 ) url = `https://local.bloks.io/account/${address}?nodeUrl=https%3A%2F%2Fexsat3.greymass.com&systemDomain=eosio`;
    if ( !data ) return <Box w='100%'/>
    const amount = Number(data.toFixed(4));

    return (
        <Box w='100%'>
            <Link href={url} target="_blank" rel="noreferrer">
                Balance <b>{amount} BTC</b>
            </Link>
        </Box>
    )
}