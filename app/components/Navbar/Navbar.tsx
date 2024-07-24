import Link from "next/link";
import React from "react";
import "./Navbar.scss";
import Image from "next/image";
type Props = {};

function Navbar({}: Props) {
  return (
    <nav className="nav">
      <div className="nav-background"></div>
      <div className="nav-content contained">
        <div className="flex">
          <Link href="https://scan.exactsat.io" target="_blank" rel="noreferrer" className="v-align-center">
            <Image width={100} height={100} src="/eos-evm.svg" alt="exSat EVM" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;