import './globals.css'

export const metadata = {
    title: 'exSat EVM: Get Free Balance on the exSat EVM Network Testnet',
    description: 'exSat EVM provides free balance on the exSat network in testnet. We offer balance to allow our users to test and develop on the exSat network more.',
    keywords: 'exSat, EVM, faucet, testnet, balance, free, exSat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="IiJqa5EsAcb2Go6AzN_FrKNPxlousZXI0YKPKCQ8CAw" />
        <link rel="icon" href="/icon.png" />
    </head>
    <body>
      {children}
    </body>
    </html>
  )
}