"use client";

import {
  SimpleGrid,
  Center,
  Box,
  Input,
  Stack,
  Text,
  Heading,
  Spinner,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { GitHub } from "./Github";
import { SendButton } from "./SendButton";
import { Balance } from "./Balance";
import { Telegram } from "./Telegram";
import { Twitter } from "./Twitter";
import useSWR from "swr";
import dayjs from "dayjs";
import { sanitizeAddress } from "../api/utils";
import Link from "next/link";
import { get_history_blockscout } from "../api/tables";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const Faucet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const placeholder = "0x....";

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setWalletAddress(address);
    localStorage.setItem("walletAddress", address);
  };

  const isValidEthereumAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const { data, error, isLoading } = useSWR(
    isValidEthereumAddress(walletAddress) ? "/api/history" : null,
    () => get_history_blockscout(8, walletAddress)
  );

  console.log("API Response:", data);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        height="100vh"
        margin="auto"
        position="relative"
      >
        <Image alt={"logo"} src="/logo.png" height={150} width={150} />
        <Text fontSize="2xl" marginTop="15px" fontWeight="800" color="#FFFFF">
          Quickly send a $BTC to your wallet.
        </Text>
        <Text fontSize="1xl" color="#FFFFF" fontWeight="500">
          This tool does not send&nbsp;
          <Text as="span" fontWeight="bold">
            real $BTC.
          </Text>
          &nbsp; It is a testnet faucet for the exSat EVM blockchain.
        </Text>
        <Stack marginTop="20px" maxWidth="2xl" width="100%">
          <Input
            bg="#2a2a2a"
            color="white"
            borderColor="#4a4a4a"
            _placeholder={{ color: "#8a8a8a" }}
            _hover={{ borderColor: "#5a5a5a" }}
            _focus={{
              borderColor: "#ff8c00",
              boxShadow: "0 0 0 1px #ff8c00",
            }}
            placeholder={placeholder}
            value={walletAddress}
            onChange={handleOnChange}
          />
          <Stack direction="row">
            <SendButton walletAddress={walletAddress}>Send</SendButton>
          </Stack>
          <SimpleGrid columns={2} spacingX="40px">
            <Balance address={walletAddress} />
            <Box w="100%">
              <Center height={"40px"}>
                <Telegram />
                <GitHub />
                <Twitter />
              </Center>
            </Box>
          </SimpleGrid>
        </Stack>
      </Box>
      <Box padding="20px" maxHeight="100vh" overflow="auto">
        <Heading size="lg" marginBottom="20px">
          Transfer History
        </Heading>
        <Divider orientation="horizontal" />
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
      </Box>
    </>
  );
};

const TransferRow = (props: {
  hash: string;
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
