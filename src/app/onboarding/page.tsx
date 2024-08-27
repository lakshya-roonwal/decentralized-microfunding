import { OnBoardingForm } from '@/components/OnBoardingForm';
import prisma from '@/utils/db'
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { redirect } from 'next/navigation';
import React from 'react'

const OnBoarding =async () => {
  const { userId } = auth();

  let user: User | null = null;
  if (userId) {
    user = await prisma.user.findUnique({ where: { id: userId } });
  }

  const defaultValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    bio: user?.bio || "",
    socialLink: user?.websiteOrSocial || "",
    walletAddress: user?.walletAddress || ""
  };

  return (
    <OnBoardingForm defaultData={defaultValues}/>
  )
}

export default OnBoarding