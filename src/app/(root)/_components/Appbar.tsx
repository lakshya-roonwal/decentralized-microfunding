import { buttonVariants } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";

const Appbar = () => {
  const { publicKey } = useWallet();

  return (
    <nav className="fixed z-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          <div>
            {publicKey ? <WalletDisconnectButton className={"text-blue-700"}  /> : <WalletMultiButton className={buttonVariants({ variant: "outline" })} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
