import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { User } from "@prisma/client";

const DynamicWalletButton = ({ amount, user }: { amount: number; user: User }) => {
  const { connection } = useConnection();
  const { publicKey ,sendTransaction} = useWallet();
  const [txSignature, setTxSignature] = useState("");

  const handlePayment = async() => {
    console.log(
      `Processing payment of ${amount} for ${user.firstName} ${user.lastName} in wallet ${user.walletAddress}`
    );
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: new PublicKey(user.walletAddress as string),
        lamports:amount*1000000000,
      })
    );
    
    
    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();
    


    const signature = await sendTransaction(transaction, connection, {
      minContextSlot,
    });

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });
    setTxSignature(signature);


  };

  return (
    <Button 
      disabled={!amount || !publicKey} 
      onClick={handlePayment} 
      className="w-full"
    >
      {publicKey ? `Pay ${amount} SOL` : "Please connect wallet"}
    </Button>
  );
};

export default DynamicWalletButton;