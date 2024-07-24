"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export const Telegram = () => (
  <Box padding={2} minWidth={30}>
    <Link
      href="https://t.me/EOSNetworkFoundation"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image alt="Telegram" src="/telegram-dark.svg" width={30} height={30} />
    </Link>
  </Box>
)