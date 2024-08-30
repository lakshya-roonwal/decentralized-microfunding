import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { User } from "@prisma/client";
import { useToast } from '@/components/ui/use-toast';
import { title } from 'process';

const DynamicWalletButton = ({ amount, user }: { amount: number; user: User }) => {
  const {toast}=useToast();
  const { connection } = useConnection();
  const { publicKey ,sendTransaction} = useWallet();
  const [txSignature, setTxSignature] = useState("");

  const handlePayment = async() => {
    try {
      console.log(
        `Processing payment of ${amount} for ${user.firstName} ${user.lastName} in wallet ${user.walletAddress}`
      );
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: new PublicKey(user.walletAddress as string),
          lamports: amount * 1000000000,
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
      toast({
        title:"Transection Successful"
      })
      setTxSignature(signature);
    } catch (error) {

      console.error("Payment processing error:", error); // Log the error
      toast({
        title:"Transection Canceled",
        variant:"destructive"
      })
      // Optionally, you can set an error state or show a notification to the user
    }
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