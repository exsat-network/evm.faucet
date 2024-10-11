"use client";
import { Button, useToast } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import { sanitizeAddress } from "../api/utils";
import { useSWRConfig } from "swr"
import { timeout } from "../api/utils";
// import { useRecoilValue } from "recoil";
// import { chainState } from "../atoms";

type SendButtonProps = {
  walletAddress: string;
  hcaptchaToken: string;
  onSendComplete: () => void;
  children: React.ReactNode;
};

export const SendButton = ({
  walletAddress,
  hcaptchaToken,
  onSendComplete,
  children,
}: SendButtonProps) => {
  const chain = "testnet3";
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const onSubmit = async () => {
    if (isLoading) return;

    if (!hcaptchaToken) {
      toast({
        title: "Error",
        description: "Please complete the hCaptcha verification",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/send", {
        body: JSON.stringify({
          to: walletAddress,
          chain,
          hcaptchaToken: hcaptchaToken,
        }),
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      toast({
        title: "Success",
        description: `BTC sent to ${sanitizeAddress(walletAddress)}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
       onSendComplete();
      await timeout(1000);
      mutate("/api/history");
      mutate("/api/stats");
      mutate(`/api/balance/${chain}/${walletAddress}`);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 4000,
      });
    }
    setLoading(false);
  };

  return (
    <Button
      backgroundColor="#FF9900"
      color="#F5F5F5"
      _hover={{ bg: "#e67e00" }}
      onClick={onSubmit}
      flex="1"
      textTransform="uppercase"
      fontWeight="bold"
      isLoading={isLoading}
      disabled={!walletAddress || isLoading || !hcaptchaToken}
    >
      {children}
    </Button>
  );
};
