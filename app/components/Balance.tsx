"use client";

import useSWR from "swr";
import { Box } from "@chakra-ui/react"
import { get_balance } from "../api/tables";
import Link from "next/link";

const chain = "testnet2";

export const Balance = (props: {address: string}) => {
    // const chain = useRecoilValue(chainState);
    const address = props.address
    const { data } = useSWR(`/api/balance/${chain}/${address}`, () => get_balance(address, chain));
    let url = `https://scan2.exactsat.io/address/${address}/tokens`
    if ( address.length <= 12 ) url = `https://eoseyes.com/account/${address}`;
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