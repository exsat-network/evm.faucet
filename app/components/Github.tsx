"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export const GitHub = () => (
  <Box padding={2} minWidth={30}>
    <Link
      href="https://github.com/exsat-network/evm.faucet"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image alt="GitHub" src="/github-dark.svg" width={30} height={30} />
    </Link>
  </Box>
);