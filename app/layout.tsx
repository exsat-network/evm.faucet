import './globals.css'
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "exSat Faucet",
  description:
    "exSat faucet is an application that dispenses free tokens on exSat Testnet, a blockchain network used for development and testing. These tokens enable you to experiment with transactions, deploy smart contracts, and explore network behavior without risking real assets.",
  keywords: "exSat, EVM, faucet, testnet, balance, free, exSat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="IiJqa5EsAcb2Go6AzN_FrKNPxlousZXI0YKPKCQ8CAw"
        />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
      </head>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-61TV4797K2" />
    </html>
  );
}