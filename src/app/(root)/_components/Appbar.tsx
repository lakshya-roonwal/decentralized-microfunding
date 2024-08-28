import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";

const Appbar = () => {
  const { publicKey } = useWallet();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-xl font-bold text-gray-900">
              Logo
            </a>
          </div>
          <div>
            {publicKey ? <WalletDisconnectButton  /> : <WalletMultiButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
