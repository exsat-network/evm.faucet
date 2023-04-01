import {
  Box,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { GithubIcon } from "./GithubIcon";
import { SendButton } from "./SendButton";

export const Faucet = () => {
  const [walletAddress, setWalletAddress] = useState("");

  return (
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
      <Image src="/logo.png" height="150px" />
      <Text fontSize="2xl" marginTop="15px" fontWeight="800" color="#FFFFF">
        Quickly send a $EOS to your wallet.
      </Text>
      <Text fontSize="1xl" color="#FFFFF" fontWeight="500">
        This tool does not send&nbsp;
        <Text as="span" fontWeight="bold">
          real $EOS.
        </Text>
        &nbsp; It is a testnet faucet for the EOS EVM blockchain.
      </Text>
      <Stack marginTop="20px" maxWidth="2xl" width="100%">
        <Input
          variant="filled"
          placeholder="0xaa2F34E41B397aD905e2f48059338522D05CA534 or myaccount"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <Stack direction="row">
          <SendButton type="testnet" walletAddress={walletAddress}>
            Send
          </SendButton>
        </Stack>
        <a
          href="https://github.com/eosnetworkfoundation/evm.faucet"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "auto",
          }}
        >
          <span style={{margin:"2px"}}><GithubIcon /></span>
        </a>
      </Stack>
    </Box>
  );
};
