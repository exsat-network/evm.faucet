"use client";

import {
  Box,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import useSWR from "swr";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { sanitizeAddress } from "../api/utils";
import Link from "next/link";
import { HistoryRate } from "./HistoryRate";
import { get_history_blockscout } from "../api/tables";
import { useEffect, useState } from "react";


dayjs.extend(relativeTime);

export const TransferHistory = () => {

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setWalletAddress(localStorage.getItem("walletAddress") || "");
  }, []);


  const { data, error, isLoading } = useSWR("/api/history", () =>
    get_history_blockscout(8, walletAddress)
  );

  console.log("API Response:", data); // 添加调试日志

  return (
    <Box padding="20px" maxHeight="100vh" overflow="auto">
      <Heading size="lg" marginBottom="20px">
        Transfer History
      </Heading>
      {isLoading && <Spinner />}
      {error && (
        <Text color="red.500">Error loading data: {error.message}</Text>
      )}
      {!isLoading && !error && data && (
        <>
          {Array.isArray(data) ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Txid</Th>
                  <Th>Value</Th>
                  <Th>Timestamp</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => (
                  <TransferRow key={index} {...item} />
                ))}
              </Tbody>
            </Table>
          ) : data.items && Array.isArray(data.items) ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Txid</Th>
                  <Th>Value</Th>
                  <Th>Timestamp</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.items.map((item, index) => (
                  <TransferRow key={index} {...item} />
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>
              No transfer history available or unexpected data format.
            </Text>
          )}
        </>
      )}
      <HistoryRate />
    </Box>
  );
};

const TransferRow = (props: {
  hash:  string ;
  value: string;
  timestamp: string;
  status: string;
}) => {
  const address = props?.hash || "Unknown";
  const url = `https://scan.exsat.network/address/${address}`;
  const short = sanitizeAddress(address);
  const time = props.timestamp ? dayjs(props.timestamp).fromNow() : "Unknown";
  const value = props.value
    ? (BigInt(props.value) / BigInt(10 ** 18)).toString()
    : "Unknown";

  return (
    <Tr>
      <Td>
        <Link href={url} target="_blank" rel="noreferrer">
          {short}
        </Link>
      </Td>
      <Td>{value} BTC</Td>
      <Td>{time}</Td>
      <Td>{props.status || "Unknown"}</Td>
    </Tr>
  );
};
